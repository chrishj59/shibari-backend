import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserByIdFilterDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
