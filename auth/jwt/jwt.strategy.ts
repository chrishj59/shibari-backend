import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import AuthService from 'src/auth/auth.service';

import { TokenPayload } from '../interfaces/tokenPayload.interface';

//import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger('JwtStrategy');
  constructor(
    private authenticationService: AuthService,
    private configService: ConfigService, // private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          console.log('JWT strategy auth cookie');
          console.log(request?.cookies?.Authentication);
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }
  async validate(payload: TokenPayload) {
    console.log('validate');
    console.log(payload);
    const { id } = payload;
    const userLogin = this.authenticationService.getById(id);
    if (!userLogin) {
      console.error('');
      throw new UnauthorizedException('Invalid Credentials');
    }
    return userLogin;
  }
}
