import { Request } from 'express';

import { UserLogin } from '../user-login.entity';

export interface RequestWithUserLogin extends Request {
  user: UserLogin;
}
