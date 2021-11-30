import { IsBoolean, IsEmail, IsEnum, IsNumberString, IsOptional } from 'class-validator';

import { LocationDisplayEnum } from '../entities/user.entity';

export class UserProfileDto {
  @IsOptional()
  title: string;
  @IsOptional()
  firstName: string;
  @IsOptional()
  familyName: string;
  @IsOptional()
  gender: string;
  pronoun: string;
  @IsOptional()
  orientation: string;
  @IsOptional()
  dob: Date;
  @IsOptional()
  @IsNumberString()
  country: number;
  @IsOptional()
  @IsNumberString()
  county: string;
  @IsOptional()
  @IsNumberString()
  city: string;
  @IsOptional()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsNumberString({})
  //@IsNumber({ maxDecimalPlaces: 0 }, { message: 'Telephone number incorrect' })
  phone_number: number;
  @IsOptional()
  @IsEnum(LocationDisplayEnum)
  visibility: LocationDisplayEnum;
  @IsOptional()
  searchLevel: string;
  @IsOptional()
  @IsBoolean()
  cityIsCounty: boolean;
  @IsOptional()
  aboutMe: string;
  @IsOptional()
  loginId: string;
}
