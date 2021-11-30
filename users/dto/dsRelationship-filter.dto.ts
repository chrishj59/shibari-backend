import { IsOptional } from 'class-validator';

export class GetDsRelationshipFilterDto {
  @IsOptional()
  search: string;
}
