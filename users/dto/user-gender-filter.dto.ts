import { IsOptional } from 'class-validator';

export class UserGenderFilterDto {
  @IsOptional()
  name: string;
}
