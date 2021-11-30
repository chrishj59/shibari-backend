import { IsString } from 'class-validator';

export class ProfileRelationshipDto {
  @IsString()
  relationshipId: string;

  @IsString()
  profileId: string;
}
