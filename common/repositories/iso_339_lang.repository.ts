import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { ResponseMessageDto } from 'src/dtos/responseMessageDto';
import { MessageStatus } from 'src/enums/MessageStatus.enum';
import { EntityRepository, Repository } from 'typeorm';

import { LangIso639 } from '../entities/Iso_639_lang.entity';

const csv = require('async-csv');
const fs = require('fs').promises;
const path = require('path');
@EntityRepository(LangIso639)
export class LangIso639Repository extends Repository<LangIso639> {
  private logger = new Logger('LangIso639Repository');

  async seedLanguages(): Promise<ResponseMessageDto> {
    this.logger.log('SeedLanguages called');
    let basePath = __dirname.replace('/dist', '');
    basePath = basePath.replace('/repositories', '');
    const filePath = path.join(basePath, 'seedData', 'language-codes-full.csv');

    const csvString = await fs.readFile(filePath, 'utf-8');
    let numRecs = 0;
    const rows = await csv.parse(csvString);
    console.log(rows[0]);
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (i === 0) {
        continue;
      }
      const lang = new LangIso639();
      lang.alpha3B = row[0];
      lang.alpha3T = row[1];
      lang.alpha2 = row[2];
      lang.english = row[3];
      lang.french = row[4];

      try {
        await lang.save();
        numRecs++;
      } catch (err) {
        if (err.code === '23505') {
          // duplicate language
          throw new ConflictException(
            `Language ${lang.alpha3B} already exists`,
          );
        } else {
          this.logger.error(err.message);
          throw new InternalServerErrorException();
        }
      }
    }
    return {
      status: MessageStatus.SUCCESS,
      message: `Created ${numRecs} languages`,
    };
  }
}
