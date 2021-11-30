import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { SexualOrientationFilterDto } from '../dto/sexual-orientation-filter.dto';
import { SexualOrientationDto } from '../dto/sexual-orientation.dto';
import { UserOrientationEntity } from '../entities/user-orientation.entity';

const csv = require('async-csv');
const fs = require('fs').promises;
const path = require('path');

@EntityRepository(UserOrientationEntity)
export class UserOrientationRepository extends Repository<UserOrientationEntity> {
  logger = new Logger('UserPronounRepository');

  async seedOrientation(): Promise<string> {
    let basePath = __dirname.replace('/dist', '');
    basePath = basePath.replace('/repositories', '');
    const filePath = path.join(basePath, 'seedData', 'sexual-orientation.csv');

    const csvString = await fs.readFile(filePath, 'utf-8');
    let numRecs = 0;
    const rows = await csv.parse(csvString);
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      const sexualOrientatiion = this.create();
      sexualOrientatiion.name = row[0];
      sexualOrientatiion.seq = row[1];
      try {
        await sexualOrientatiion.save();
        numRecs++;
      } catch (err) {
        if (err.code === '23505') {
          // duplicate orientation
          throw new ConflictException(
            `User Sexual Orientation ${sexualOrientatiion.name} already exists`,
          );
        } else {
          this.logger.error(err.message);
          throw new InternalServerErrorException();
        }
      }
    }
    return `Create ${numRecs} orientation entries`;
  }

  async getOrientations(
    filterDto: SexualOrientationFilterDto,
  ): Promise<SexualOrientationDto[]> {
    const { name, orderDir } = filterDto;
    const query = this.createQueryBuilder('so');
    if (name) {
      query.andWhere('so.name LIKE :name', {
        name: `%${name}%`,
      });
    }
    query.orderBy('so.seq', orderDir);
    try {
      const res = await query.getMany();
      if (!res || res.length === 0) {
        return null;
      }
      const orientations = res.map((el) => {
        const so = new SexualOrientationDto();
        so.id = el.id;
        so.name = el.name;
        so.seq = el.seq;
        return so;
      });
      return orientations;
    } catch (err) {
      this.logger.error(
        `Failed to get sexual orientations Data: ${JSON.stringify(filterDto)} `,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
