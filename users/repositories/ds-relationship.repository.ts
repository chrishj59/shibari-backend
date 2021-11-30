import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { GetRelationshipsFilterDto } from '../dto/relationships-filter.dto';
import { DsRelationship } from '../entities/ds-relationship.entity';

const csv = require('async-csv');
const fs = require('fs').promises;
const path = require('path');

@EntityRepository(DsRelationship)
export class DsRelationshipRepository extends Repository<DsRelationship> {
  private logger = new Logger('DsRelationshipRepository');

  async seedDsRelationship(): Promise<string> {
    const basePath = __dirname.replace('/dist', '');
    const filePath = path.join(basePath, 'seedData', 'Ds_relationships.csv');
    const csvString = await fs.readFile(filePath, 'utf-8');
    let numRecs = 0;
    const rows = await csv.parse(csvString);
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const dsRelationship = new DsRelationship();
      dsRelationship.relationship = row[0];
      dsRelationship.seq = row[1];
      try {
        await dsRelationship.save();
        numRecs++;
      } catch (err) {
        if (err.code === '23505') {
          // duplicate username
          throw new ConflictException(
            `User Title ${dsRelationship.relationship} already exists`,
          );
        } else {
          this.logger.error(err.message);
          throw new InternalServerErrorException();
        }
      }
    }
    return `Created ${numRecs} dsRelationships`;
  }

  async getDsRelationships(
    filterDto: GetRelationshipsFilterDto,
  ): Promise<DsRelationship[]> {
    const { relationship, hasOtherPerson } = filterDto;

    const query = this.createQueryBuilder('ds-relationships');
    if (relationship) {
      query.andWhere('ds-relationships.relationship LIKE :relationship', {
        relationship: `%${relationship}%`,
      });
    }
    if (hasOtherPerson) {
      query.andWhere('ds-relationships.hasOtherPerson = :hasOtherPerson', {
        hasOtherPerson: `${hasOtherPerson}`,
      });
    }
    query.orderBy('ds-relationships.seq', 'ASC');
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
