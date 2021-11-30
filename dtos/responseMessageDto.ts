import { IsEnum, IsString } from 'class-validator';
import { MessageStatus } from 'src/enums/MessageStatus.enum';

export class ResponseMessageDto {
  @IsEnum(MessageStatus)
  status: MessageStatus = MessageStatus.SUCCESS;
  @IsString()
  message: string;
}
