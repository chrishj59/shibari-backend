import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { FetishFilterDto } from '../dto/fetish-filter.dto';
import { Fetish } from '../entities/fetish.entity';

const csv = require('async-csv');
const fs = require('fs').promises;
const path = require('path');

@EntityRepository(Fetish)
export class FetishRepository extends Repository<Fetish> {
  private logger = new Logger('FetishRepository');
  async seedFetish(): Promise<string> {
    const basePath = __dirname.replace('/dist', '');
    const filePath = path.join(basePath, 'seedData', 'fetish.csv');

    const csvString = await fs.readFile(filePath, 'utf-8');
    let numRecs = 0;
    const rows = await csv.parse(csvString);
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const fetish = this.create();
      fetish.name = row[0];
      fetish.seq = row[1];
      try {
        await fetish.save();
        numRecs++;
      } catch (err) {
        if (err.code === '23505') {
          // duplicate relationship
          throw new ConflictException(`Fetish ${fetish.name} already exists`);
        } else {
          throw new InternalServerErrorException();
        }
      }
    }
    return `Loaded ${numRecs} fetshes`;
  }

  async getFetishes(filterDto: FetishFilterDto): Promise<Fetish[]> {
    const { name } = filterDto;
    const query = this.createQueryBuilder('fetishes');

    if (name) {
      query.andWhere('fetishes.name LIKE :name', {
        name: `%${name}%`,
      });
    }

    try {
      return await query.getMany();
    } catch (err) {
      this.logger.error(`could not load fetishes ${err.message}`);
    }
  }
}
