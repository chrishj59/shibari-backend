export class RefreshTokenDto {
  id: string;
  isRevoked: boolean;
  expires: Date;
  loginId: string;
}
