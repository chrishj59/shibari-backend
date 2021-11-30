import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { CountryName } from '../dto/country-name.dto';
import { Country } from '../entity/Country.entity';

const csv = require('async-csv');
const fs = require('fs').promises;
const path = require('path');

@EntityRepository(Country)
export class CountryRepository extends Repository<Country> {
  private logger = new Logger('Country Repository');

  async seedCountries(): Promise<string> {
    let basePath = __dirname.replace('/dist', '');
    basePath = basePath.replace('/repository', '');
    const filePath = path.join(basePath, 'seedData', 'countries.csv');

    const csvString = await fs.readFile(filePath, 'utf-8');
    let numRecs = 0;
    const rows = await csv.parse(csvString);
    for (let i = 0; i < rows.length; i++) {
      if (i == 0) {
        continue;
      }
      const row = rows[i];
      const country = this.create();

      country.id = row[0];
      country.name = row[1];
      country.iso3 = row[2];
      country.iso2 = row[3];
      country.numericCode = row[4];
      country.phoneCode = row[5];
      country.capital = row[6];
      country.currency = row[7];
      country.currencySymbol = row[8];
      country.tld = row[9];
      country.region = row[11];
      country.subRegion = row[12];
      country.timezones = row[13];
      country.lat = row[14];
      country.lng = row[15];
      country.setLocation(country.lat, country.lng);
      country.emoji = row[16];
      country.emojiu = row[17];

      try {
        await country.save();
        numRecs++;
      } catch (err) {
        if (err.code === '23505') {
          // duplicate country
          throw new ConflictException(
            `User Title ${country.iso2} already exists`,
          );
        } else {
          this.logger.error(err.message);
          throw new InternalServerErrorException();
        }
      }
    }
    return `Created ${numRecs} countries`;
  }

  async addCountry(country: Country): Promise<Country> {
    try {
      const savedCountry = country.save({ reload: true });
      return savedCountry;
    } catch (err) {
      if (err.code === '23505') {
        // duplicate country
        throw new ConflictException(
          `User Title ${country.iso2} already exists`,
        );
      } else {
        this.logger.error(err.message);
        throw new InternalServerErrorException();
      }
    }
  }
  async getCountryNames(): Promise<CountryName[]> {
    return await this.find({
      select: ['id', 'iso2', 'numericCode', 'name'],
    });
  }
}
