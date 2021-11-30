import { IsEnum, IsOptional } from 'class-validator';
import { OrderDir } from 'src/enums/OrderDir.enum';

export class UserPronounFilterDto {
  @IsOptional()
  name: string;
  @IsEnum(OrderDir)
  orderDir: OrderDir = OrderDir.ASC;
}
