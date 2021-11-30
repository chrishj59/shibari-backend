import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { UserPronounFilterDto } from '../dto/user-pronoun-filter.dto';
import { UserProNounDto } from '../dto/user-pronoun.dto';
import { UserPronounEntity } from '../entities/user-pronoun.entity';

const csv = require('async-csv');
const fs = require('fs').promises;
const path = require('path');

@EntityRepository(UserPronounEntity)
export class UserPronounRepository extends Repository<UserPronounEntity> {
  logger = new Logger('UserPronounRepository');
  async seedPronoun(): Promise<string> {
    // load titles
    let basePath = __dirname.replace('/dist', '');
    basePath = basePath.replace('/repositories', '');
    const filePath = path.join(basePath, 'seedData', 'pronoun.csv');

    const csvString = await fs.readFile(filePath, 'utf-8');
    let numRecs = 0;
    const rows = await csv.parse(csvString);
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const pronoun = new UserPronounEntity();
      pronoun.name = row[0];
      pronoun.seq = row[1];
      try {
        await pronoun.save();
        numRecs++;
      } catch (error) {
        if (error.code === '23505') {
          // duplicate pronoun

          throw new ConflictException(`Pronoun ${pronoun.name} already exists`);
        } else {
          this.logger.error(error.message);
          throw new InternalServerErrorException();
        }
      }
    }
    return `Created ${numRecs} titles`;
  }
  async getPronouns(
    filterDto: UserPronounFilterDto,
  ): Promise<UserProNounDto[]> {
    const { name, orderDir } = filterDto;
    const query = this.createQueryBuilder('pronoun');
    if (name) {
      query.andWhere('pronoun.name LIKE :name', {
        name: `%${name}%`,
      });
    }
    query.orderBy('pronoun.seq', orderDir);
    try {
      const res = await query.getMany();
      if (!res) {
        return null;
      }
      const pronouns = res.map((el: UserPronounEntity) => {
        const pronoun = new UserProNounDto();
        pronoun.id = el.id;
        pronoun.name = el.name;
        pronoun.seq = el.seq;

        return pronoun;
      });
      return pronouns;
    } catch (err) {
      this.logger.error(
        `Failed to get user pronouns Data: ${JSON.stringify(filterDto)} `,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
