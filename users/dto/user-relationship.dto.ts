import { IsBooleanString, IsNumberString, IsOptional, IsString } from 'class-validator';

export class UserRelationshipDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  relationship: string;

  @IsOptional()
  @IsBooleanString()
  hasOtherPerson: boolean;

  @IsOptional()
  @IsNumberString()
  seq: number;
}
