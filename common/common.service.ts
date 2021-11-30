import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessageDto } from 'src/dtos/responseMessageDto';

import { LangIso639Repository } from './repositories/iso_339_lang.repository';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(LangIso639Repository)
    private langRepository: LangIso639Repository,
  ) {}
  private logger = new Logger('CommonService');

  async seedLanuguages(): Promise<ResponseMessageDto> {
    return this.langRepository.seedLanguages();
  }
}
