import { IsOptional } from 'class-validator';

export class UserTitleFilterDto {
  @IsOptional()
  shortName: string;

  @IsOptional()
  name: string;
}
