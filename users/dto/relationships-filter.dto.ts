import { IsOptional } from 'class-validator';

export class GetRelationshipsFilterDto {
  @IsOptional()
  relationship: string;

  @IsOptional()
  hasOtherPerson: boolean;
}
