import { BadRequestException, ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { UkPlaceFilterDto } from './dto/uk-place-filter.dto';
import { UkPlaceDto } from './dto/uk-place.dto';
import { UkTownFilterDto } from './dto/uk-town-filter.dto';
import { UkTown } from './uk-town.entity';

const csv = require('async-csv');
const fs = require('fs').promises;
const path = require('path');

@EntityRepository(UkTown)
export class UkTownRepository extends Repository<UkTown> {
  private logger = new Logger('UkTownRepository');
  async seedUkTowns(): Promise<string> {
    const basePath = __dirname.replace('/dist', '');
    const filePath = path.join(basePath, 'seedData', 'uk-towns.csv');

    const csvString = await fs.readFile(filePath, 'utf-8');
    let numRecs = 0;
    const rows = await csv.parse(csvString);

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (i === 0) {
        continue;
      }
      const town = new UkTown();
      town.place = row[1];
      town.county = row[2];
      town.country = row[3];
      town.postCode = row[4];
      town.gridRef = row[5];
      town.lat = row[6];
      town.lng = row[7];
      town.easting = row[8];
      town.northing = row[9];
      town.region = row[10];
      town.category = row[11];
      town.setLocation(town.lat, town.lng);

      try {
        await town.save();
        numRecs++;
      } catch (err) {
        if (err.code === '23505') {
          // duplicate town
          throw new ConflictException(
            `User Title ${town.place} already exists`,
          );
        } else {
          this.logger.error(err.message);
          throw new InternalServerErrorException();
        }
      }
    }
    return `Created ${numRecs} towns`;
  }

  async getCounties(filterDto: UkTownFilterDto): Promise<string[]> {
    const { county } = filterDto;
    const query = this.createQueryBuilder('county');
    query.select('DISTINCT county');
    if (county) {
      query.where('county LIKE :county', { county: `%${county}%` });
    }
    query.orderBy('county');
    const counties: string[] = await query.getRawMany();
    return counties;
  }

  async getPlaces(filterDto: UkPlaceFilterDto): Promise<UkPlaceDto[]> {
    const { county, place } = filterDto;
    if (!county) {
      throw new BadRequestException('County must be supplied');
    }
    const query = this.createQueryBuilder('place');
    query.select('DISTINCT id, place');
    query.where(`county = :county`, { county: `${county}` });
    if (place) {
      query.andWhere('place LIKE :place', { place: `%${place}%` });
    }
    query.orderBy('place');
    return await query.getRawMany();
  }
}
