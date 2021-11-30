import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserLogin } from './user-login.entity';

//const SALT_ROUNDS = 10;

@EntityRepository(UserLogin)
export class UserLoginRepository extends Repository<UserLogin> {
  private logger = new Logger('AuthRepository');

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<UserLogin> {
    const { loginName, password } = authCredentialsDto;

    const login = this.create();
    login.loginName = loginName;
    login.lastLogin = new Date();
    login.locked = false;
    login.failedLogins = 0;
    // const salt = await bcrypt.genSalt(SALT_ROUNDS);
    // login.password = await bcrypt.hash(password, salt);
    try {
      const savedUser = await login.save();
      this.logger.log(savedUser);
      return savedUser;
      //return savedUser.loginName;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Name already exists');
      } else {
        this.logger.log(err);
        throw new InternalServerErrorException();
      }
    }
  }

  // async userLoginByLoginName(loginName: string): Promise<UserLoginDto> {
  //   try {
  //     const userLogin = await this.findOne({ loginName });
  //     const userLoginDto: UserLoginDto = {
  //       ...userLogin,
  //     };
  //     return userLoginDto;
  //   } catch (err) {
  //     throw new BadRequestException(`Login name  ${loginName} is invalid`);
  //   }
  // }
  async findById(id: string): Promise<UserLoginDto> {
    try {
      const userLogin = await this.findByIds([id]);
      const userLoginDto: UserLoginDto = {
        ...userLogin[0],
      };
      return userLoginDto;
    } catch (err) {
      throw new BadRequestException(`User id ${id} is invalid`);
    }
  }

  async validatePassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { loginName, password } = authCredentialsDto;
    const userLogin = await this.findOne({ loginName });
    if (userLogin && userLogin.validatePassword(password)) {
      return userLogin.id;
    } else {
      return null;
    }
  }
  async getByLoginName(loginName: string): Promise<UserLogin> {
    const userLogin = await this.findOne({ loginName });
    if (userLogin) {
      return userLogin;
    }
    throw new HttpException(
      'Wrong credentials provided',
      HttpStatus.BAD_REQUEST,
    );
  }
}
