import { IsNotEmpty, IsOptional } from 'class-validator';

export class UkPlaceFilterDto {
  @IsNotEmpty()
  county: string;

  @IsOptional()
  place: string;
}
