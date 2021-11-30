import { UserRole } from '../user-login.entity';

export class UserLoginDto {
  id: string;
  loginName: string;
  lastLogin: Date;
  locked: boolean;
  failedLogins: number;
  role: UserRole;
  user?: {
    id?: string;
    password?: string;
  };
}
