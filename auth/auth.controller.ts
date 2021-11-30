import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  Req,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';

import AuthService from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LocalAuthenticationGuard } from './guards/local-authentications.guard';
import { RequestWithUserLogin } from './interfaces/request-with-user-login.interface';
import JwtAuthenticationGuard from './jwt/jwt-authentication.guard';
import { UserLogin } from './user-login.entity';

@Controller('api/v1/auth')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
  strategy: 'excludeAll',
})
export class AuthController {
  constructor(private authService: AuthService) {}
  private logger = new Logger('AuthController');

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('/signin')
  async signIn(@Req() request: RequestWithUserLogin): Promise<UserLogin> {
    const { user: userLogin } = request;
    //const userLogin = new UserLogin();
    console.log('Login called');
    console.log(userLogin);
    console.log(request.user);

    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      userLogin.id,
    );
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithJwtRefreshToken(userLogin.id);

    await this.authService.setCurrentRefreshToken(refreshToken, userLogin.id);
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);

    //userLogin.password = undefined;
    return userLogin;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async authenticate(@Req() request: RequestWithUserLogin): Promise<UserLogin> {
    console.log('get user details for login user');
    const { user } = request;

    return user;
  }

  //@Patch('/signin')
  // async signIn(
  //   @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  // ): Promise<{ accessToken: string }> {
  //   const accessToken = await this.authService.signIn(authCredentialsDto);
  //   return accessToken;
  // }
  // @Post('/test')
  // @UseGuards(AuthGuard())
  // test(@Req() req) {
  //   console.log(req);
  // }
}
