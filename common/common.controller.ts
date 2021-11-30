import { Controller, Logger, Post } from '@nestjs/common';

import { ResponseMessageDto } from '../dtos/responseMessageDto';
import { CommonService } from './common.service';

@Controller('api/v1/common')
export class CommonController {
  constructor(private commonService: CommonService) {}
  private logger = new Logger('CommonController');

  @Post('/seedLanguage')
  async seedLaguage(): Promise<ResponseMessageDto> {
    return this.commonService.seedLanuguages();
  }
}
