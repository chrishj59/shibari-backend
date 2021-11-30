import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { UserGenderFilterDto } from '../dto/user-gender-filter.dto';
import { UserGenderEntity } from '../entities/user-gender.entity';

const csv = require('async-csv');
const fs = require('fs').promises;
const path = require('path');

@EntityRepository(UserGenderEntity)
export class UserGenderRepository extends Repository<UserGenderEntity> {
  private logger = new Logger();

  async seedGender(): Promise<string> {
    let basePath = __dirname.replace('/dist', '');
    basePath = basePath.replace('/repositories', '');
    const filePath = path.join(basePath, 'seedData', 'gender.csv');
    const csvString = await fs.readFile(filePath, 'utf-8');
    let numRecs = 0;
    const rows = await csv.parse(csvString);
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const gender = this.create();
      gender.name = row[0];
      gender.seq = row[1];
      try {
        await gender.save();
        numRecs++;
      } catch (err) {
        if (err.code === '23505') {
          // duplicate username
          throw new ConflictException(
            `User Title ${gender.name} already exists`,
          );
        } else {
          this.logger.error(err.message);
          throw new InternalServerErrorException();
        }
      }
    }
    return `Created ${numRecs} gender entries`;
  }

  async getGender(filterDto: UserGenderFilterDto): Promise<UserGenderEntity[]> {
    const { name } = filterDto;
    const query = this.createQueryBuilder('gender');

    if (name) {
      query.andWhere('gender.name LIKE :name', {
        name: `%${name}%`,
      });
    }

    try {
      const userGenders = await query.getMany();
      return userGenders;
    } catch (err) {
      this.logger.error(
        `Failed to get user Genders Data: ${JSON.stringify(filterDto)} `,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
