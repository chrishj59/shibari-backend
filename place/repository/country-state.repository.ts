import { Logger } from '@nestjs/common';
import { ResponseMessageDto } from 'src/dtos/responseMessageDto';
import { EntityRepository, Repository } from 'typeorm';

import { CountryState } from '../entity/CountryState.entity';

const csv = require('async-csv');
const fs = require('fs').promises;
const path = require('path');

@EntityRepository(CountryState)
export class CountryStateRepository extends Repository<CountryState> {
  private logger = new Logger('Country Repository');

  async seedStates(): Promise<ResponseMessageDto> {
    return null;
  }
}
