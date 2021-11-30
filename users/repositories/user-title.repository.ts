import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { UserTitleFilterDto } from '../dto/user-title-filter.dto';
import { UserTitle } from '../entities/user-title.entity';

const csv = require('async-csv');
const fs = require('fs').promises;
const path = require('path');
@EntityRepository(UserTitle)
export class UserTitleRepository extends Repository<UserTitle> {
  private logger = new Logger('User-Title-repository');

  async getUserTitles(filterDto: UserTitleFilterDto): Promise<UserTitle[]> {
    const { shortName, name } = filterDto;
    const query = this.createQueryBuilder('userTitle');
    if (shortName) {
      query.andWhere('userTitle.shortName LIKE :shortName', {
        shortName: `%${shortName}%`,
      });
    }
    if (name) {
      query.andWhere('userTitle.name LIKE :name', { name: `%{name}%` });
    }
    try {
      const userTiles = await query.getMany();
      return userTiles;
    } catch (err) {
      this.logger.error(
        `Failed to get user titles Data: ${JSON.stringify(filterDto)} `,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }
  async seedUserTitle(): Promise<string> {
    // load titles
    let basePath = __dirname.replace('/dist', '');
    basePath = basePath.replace('/repositories', '');
    const filePath = path.join(basePath, 'seedData', 'titles.csv');

    const csvString = await fs.readFile(filePath, 'utf-8');
    let numRecs = 0;
    const rows = await csv.parse(csvString);
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const seedTitle = new UserTitle();
      seedTitle.shortName = row[0];
      seedTitle.name = row[1];
      seedTitle.seq = row[2];
      try {
        await seedTitle.save();
        numRecs++;
      } catch (error) {
        if (error.code === '23505') {
          // duplicate username
          throw new ConflictException(
            `User Title ${seedTitle.shortName} already exists`,
          );
        } else {
          this.logger.error(error.message);
          throw new InternalServerErrorException();
        }
      }
    }
    return `Created ${numRecs} titles`;
  }
}
