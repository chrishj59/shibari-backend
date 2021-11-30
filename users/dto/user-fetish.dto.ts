import { IsOptional, IsString } from 'class-validator';

export class UserFetishDto {
  @IsOptional()
  give: string;

  @IsOptional()
  receive: string;

  @IsString()
  userId: string;

  @IsString()
  fetishId: string;
}
