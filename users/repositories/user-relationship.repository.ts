import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { GetRelationshipsFilterDto } from '../dto/relationships-filter.dto';
import { Relationship } from '../entities/relationship.entity';

const csv = require('async-csv');
const fs = require('fs').promises;
const path = require('path');

@EntityRepository(Relationship)
export class UserRelationShipRepository extends Repository<Relationship> {
  private logger = new Logger('UserRelationShipRepository');
  async seedRelationships(): Promise<string> {
    let basePath = __dirname.replace('/dist', '');
    basePath = basePath.replace('/repositories', '');
    const filePath = path.join(basePath, 'seedData', 'relationships.csv');

    const csvString = await fs.readFile(filePath, 'utf-8');
    let numRecs = 0;
    const rows = await csv.parse(csvString);
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      row[1] = row[1] === 'TRUE' ? true : false;
      const relationship = new Relationship();
      relationship.relationship = row[0];
      relationship.hasOtherPerson = row[1];
      relationship.seq = row[2];
      console.log(relationship);
      console.log(row);
      try {
        await relationship.save();
        numRecs++;
      } catch (err) {
        if (err.code === '23505') {
          // duplicate relationship
          throw new ConflictException(
            `User Title ${relationship.relationship} already exists`,
          );
        } else {
          throw new InternalServerErrorException();
        }
      }
    }
    return `Created ${numRecs} relationships`;
  }
  async getRelationships(
    filterDto: GetRelationshipsFilterDto,
  ): Promise<Relationship[]> {
    const { relationship, hasOtherPerson } = filterDto;

    const query = this.createQueryBuilder('relationships');
    if (relationship) {
      query.andWhere('relationships.relationship LIKE :relationship', {
        relationship: `%${relationship}%`,
      });
    }
    if (hasOtherPerson) {
      query.andWhere('relationships.hasOtherPerson = :hasOtherPerson', {
        hasOtherPerson: `${hasOtherPerson}`,
      });
    }
    query.orderBy('relationships.seq', 'ASC');

    try {
      return await query.getMany();
    } catch (err) {
      this.logger.error(
        `Failed to get user titles Data: ${JSON.stringify(filterDto)} `,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
