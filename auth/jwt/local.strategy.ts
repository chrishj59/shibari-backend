import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import AuthService from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthService) {
    super({
      usernameField: 'loginName',
    });
  }
  private logger = new Logger('LocalStrategy');
  async validate(loginName: string, password: string) {
    this.logger.log('validate method');
    const userLogin = await this.authenticationService.getAuthenticatedUser(
      loginName,
      password,
    );
    this.logger.log('userLogin from getAuthenticated user');
    this.logger.log(JSON.stringify(userLogin));
    return userLogin;
  }
}
