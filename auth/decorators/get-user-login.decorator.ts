import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserLogin } from '../../auth/user-login.entity';

export const GetUserLogin = createParamDecorator(
  (_data, ctx: ExecutionContext): UserLogin => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
