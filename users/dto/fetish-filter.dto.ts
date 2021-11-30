import { IsOptional } from 'class-validator';

export class FetishFilterDto {
  @IsOptional()
  name: string;
}
