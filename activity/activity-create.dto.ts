import { IsDateString, IsNumberString, IsString } from 'class-validator';

export class ActivityDto {
  @IsString({ message: 'Activity name is required' })
  name: string;

  @IsString({ message: 'TagLine is required' })
  tagLine: string;

  @IsString({ message: 'Description is required' })
  descr: string;

  @IsNumberString({ no_symbols: false }, { message: 'Cost is required' })
  cost: number;

  @IsString({ message: 'Activity name is required' })
  dressCode: string;

  @IsDateString()
  startsAt: Date;

  @IsDateString()
  endsAt: Date;

  @IsString({ message: 'City is required' })
  cityId: string;
}
