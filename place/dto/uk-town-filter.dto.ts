import { IsOptional } from 'class-validator';

export class UkTownFilterDto {
  @IsOptional()
  place: string;

  @IsOptional()
  county: string;

  @IsOptional()
  country: string;

  @IsOptional()
  postCode: string;

  @IsOptional()
  region: string;

  @IsOptional()
  category: string;
}
