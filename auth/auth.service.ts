import { BadRequestException, HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Connection } from 'typeorm';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { TokenPayload } from './interfaces/tokenPayload.interface';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { UserLogin } from './user-login.entity';
import { UserLoginRepository } from './user-login.repository';

@Injectable()
export default class AuthService {
  constructor(
    @InjectRepository(UserLoginRepository)
    private userLoginRepository: UserLoginRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
    private connection: Connection,
  ) {}
  private logger = new Logger('AuthService');

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const hashedPassword = await bcrypt.hash(
      authCredentialsDto.password,
      this.configService.get('BCRYPT_ROUNDS'),
    );
    const UserLogin = this.userLoginRepository.signUp({
      ...authCredentialsDto,
      password: hashedPassword,
    });

    if (!UserLogin) {
      this.logger.warn('Could not create login');
      throw new BadRequestException('Could not create login. Check your entry');
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const loginName = await this.userLoginRepository.validatePassword(
      authCredentialsDto,
    );
    if (!loginName) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { loginName };
    const accessToken: string = this.jwtService.sign(payload);

    //const userLogin = await this.userLoginRepository.userLoginByLoginName
    return { accessToken };
  }

  public async getById(id: string): Promise<UserLogin> {
    const userLogin = await this.userLoginRepository.findOne({ id });
    if (userLogin) {
      return userLogin;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  public getCookieWithJwtAccessToken(id: string) {
    const payload: TokenPayload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    return `Authentication=${token}; HttpOnly; SameSite=None;  Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  public getCookieWithJwtRefreshToken(id: string) {
    const payload: TokenPayload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;
    return {
      cookie,
      token,
    };
  }

  public getCookieForLogOut() {
    return [
      'Authentication=;  Path=/; Max-Age=0',
      'Refresh=;  Path=/; Max-Age=0',
    ];
  }

  async setCurrentRefreshToken(refreshToken: string, userLoginId: string) {
    const queryRunner = this.connection.createQueryRunner();
    console.log(`refreshToken ${refreshToken} userId ${userLoginId}`);
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    console.log(`currentHashedRefreshToken ${currentHashedRefreshToken}`);
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.userLoginRepository.update(userLoginId, {
        currentHashedRefreshToken,
      });
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(`err`);
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getAuthenticatedUser(
    loginName: string,
    plainTextPassword: string,
  ) {
    this.logger.log(`getAuthenticatedUser called with loginName ${loginName}`);
    try {
      const userLogin = await this.userLoginRepository.getByLoginName(
        loginName,
      );
      this.logger.log('user found');
      this.logger.log(JSON.stringify(userLogin));
      await this.verifyPassword(plainTextPassword, userLogin.password);
      //user.password = undefined;
      return userLogin;
    } catch (err) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
