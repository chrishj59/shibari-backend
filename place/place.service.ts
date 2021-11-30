import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessageDto } from 'src/dtos/responseMessageDto';
import { MessageStatus } from 'src/enums/MessageStatus.enum';

import { CityNameDto } from './dto/city-name.dto';
import { CountryName } from './dto/country-name.dto';
import { CountryStateDto } from './dto/country-state.dto';
import { UkPlaceFilterDto } from './dto/uk-place-filter.dto';
import { UkPlaceDto } from './dto/uk-place.dto';
import { UkTownFilterDto } from './dto/uk-town-filter.dto';
import { CountryLangMap } from './entity/country-lang-map.entity';
import { CountryCity } from './entity/CountryCity.entity';
import { CountryState } from './entity/CountryState.entity';
import { CountryCityRepository } from './repository/country-city.repository';
import { CountryStateRepository } from './repository/country-state.repository';
import { CountryRepository } from './repository/country.repository';
import { UkTown } from './uk-town.entity';
import { UkTownRepository } from './uk-town.repository';

const csv = require('async-csv');
const fs = require('fs').promises;
const path = require('path');

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(CountryRepository)
    private countryRepository: CountryRepository,

    @InjectRepository(CountryStateRepository)
    private countryStateRepository: CountryStateRepository,

    @InjectRepository(CountryCityRepository)
    private countryCityRepository: CountryCityRepository,

    @InjectRepository(UkTownRepository)
    private ukTownRepository: UkTownRepository,
  ) {}
  private logger = new Logger('PlacesService');
  async seedCountries(): Promise<string> {
    return await this.countryRepository.seedCountries();
  }

  async seedCountryLang(): Promise<ResponseMessageDto> {
    let basePath = __dirname.replace('/dist', '');
    basePath = basePath.replace('/repositories', '');
    const filePath = path.join(basePath, 'seedData', 'country_lang_map.csv');

    const csvString = await fs.readFile(filePath, 'utf-8');
    let numRecs = 0;

    const rows = await csv.parse(csvString);
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      if (i == 0) {
        continue;
      }
      const country = await this.countryRepository.findOne({ iso2: row[1] });
      if (!country) {
        this.logger.warn(`Could not find country ${row[1]}`);
        continue;
      }

      const countryLang = new CountryLangMap();
      if (country) {
        countryLang.countryName = country.name;
      }
      countryLang.countryCode = row[1];
      countryLang.langCode = row[2];
      countryLang.sequence = row[3];
      country.langCode = row[2];

      try {
        await countryLang.save();
        numRecs++;
      } catch (err) {
        if (err.code === '23505') {
          // duplicate country
          throw new ConflictException(
            `Country  ${countryLang.countryCode}  lang ${countryLang.langCode} already exists`,
          );
        } else {
          this.logger.error(err.message);
          throw new InternalServerErrorException();
        }
      }
    }
    return {
      status: MessageStatus.SUCCESS,
      message: `created ${numRecs} country languages`,
    };
  }

  async seedCountryCity(): Promise<ResponseMessageDto> {
    let basePath = __dirname.replace('/dist', '');
    basePath = basePath.replace('/repositories', '');
    const filePath = path.join(basePath, 'seedData', 'cities.csv');

    const csvString = await fs.readFile(filePath, 'utf-8');
    let numRecs = 0;

    const rows = await csv.parse(csvString);
    //console.log(rows);
    for (let i = 0; i < rows.length; i++) {
      if (i <= 1) {
        continue;
      }
      const currRow = rows[i];
      const city = new CountryCity();
      city.id = currRow[0];
      city.name = currRow[1];
      if (currRow[2]) {
        const state = await this.countryStateRepository.findOne({
          id: currRow[2],
        });
        city.state = state;
        city.stateCode = state.stateCode;
      }

      if (currRow[4]) {
        const country = await this.countryRepository.findOne({
          id: currRow[4],
        });
        this.logger.log(
          `country id ${currRow[4]} country ${JSON.stringify(country)}`,
        );
        if (country) {
          city.country = country;
          city.countryCode = country.iso2;
        }
      }

      city.lat = currRow[6];
      city.lng = currRow[7];
      city.setLocation(city.lat, city.lng);
      try {
        await city.save();
        numRecs++;
      } catch (err) {
        if (err.code === '23505') {
          // duplicate country
          throw new ConflictException(`City ${city.name} already exists`);
        } else {
          this.logger.error(err.message);
          throw new InternalServerErrorException();
        }
      }
    }
    return {
      status: MessageStatus.SUCCESS,
      message: `Created ${numRecs} cities`,
    };
  }

  async seedCountryState(): Promise<ResponseMessageDto> {
    let basePath = __dirname.replace('/dist', '');
    basePath = basePath.replace('/repositories', '');
    const filePath = path.join(basePath, 'seedData', 'states.csv');

    const csvString = await fs.readFile(filePath, 'utf-8');
    let numRecs = 0;

    const rows = await csv.parse(csvString);
    //console.log(rows);
    for (let i = 0; i < rows.length; i++) {
      if (i <= 1) {
        continue;
      }

      const row = rows[i];
      const countryState = new CountryState();
      countryState.id = row[0];
      countryState.name = row[1];
      const id = row[2];
      const country = await this.countryRepository.findOne({
        id: id,
      });

      countryState.country = country;
      countryState.countryCode = row[3];
      countryState.stateCode = row[4];

      countryState.type = row[5] ? row[5] : '';
      if (row[6] && row[6] !== '') {
        countryState.lat = row[6];
        countryState.lng = row[7];
        countryState.setLocation(countryState.lat, countryState.lng);
      }
      console.log(countryState);

      try {
        await countryState.save();
        numRecs++;
      } catch (err) {
        if (err.code === '23505') {
          // duplicate country
          throw new ConflictException(
            `Country state ${countryState.name} already exists`,
          );
        } else {
          this.logger.error(err.message);
          throw new InternalServerErrorException();
        }
      }
    }
    return {
      status: MessageStatus.SUCCESS,
      message: `Created ${numRecs} states/counties`,
    };
  }

  async seedTowns(): Promise<string> {
    return await this.ukTownRepository.seedUkTowns();
  }

  async getUkCounties(filterDto: UkTownFilterDto): Promise<string[]> {
    return await this.ukTownRepository.getCounties(filterDto);
  }

  async getUkPlaces(filterDto: UkPlaceFilterDto): Promise<UkPlaceDto[]> {
    this.logger.log('getUkPlaces');

    const places = await this.ukTownRepository.getPlaces(filterDto);
    return places;
    //return await this.ukTownRepository.getPlaces(filterDto);
  }

  async getPlaceById(placeId: string): Promise<UkTown> {
    const places = await this.ukTownRepository.find({ id: placeId });
    if (!places || places.length === 0) {
      throw new BadRequestException('Invalid place');
    }
    return places[0];
  }
  async getCountryNames(): Promise<CountryName[]> {
    return await this.countryRepository.getCountryNames();
  }

  async getStatesByCountryId(countryId: number): Promise<CountryStateDto> {
    const states = await this.countryStateRepository
      .createQueryBuilder('country_state')
      .innerJoinAndSelect('country_state.country', 'country')
      .select(
        'country_state.id, country_state.name, country_state.countryCode, country_state.stateCode',
      )
      .where('country.id =:countryId', {
        countryId: `${countryId}`,
      })
      .execute();

    return states;
  }

  async getCitiesByCountyId(countyId: number): Promise<CityNameDto> {
    const cities = await this.countryCityRepository
      .createQueryBuilder('country_city')
      .innerJoinAndSelect('country_city.state', 'county')
      .select('country_city.id, country_city.name, country_city.stateCode')
      .where('county.id = :countyId', {
        countyId: `${countyId}`,
      })
      .execute();

    return cities;
  }

  async getCitiesNear(
    lat: number,
    long: number,
    range: number = 1000,
  ): Promise<any> {
    //https://stackoverflow.com/questions/67435650/storing-geojson-points-and-finding-points-within-a-given-distance-radius-nodej
    let origin = {
      type: 'Point',
      coordinates: [long, lat],
    };

    let cities = await this.countryStateRepository
      .createQueryBuilder('country_city')
      .select([
        'country_city.id AS id, country_city.name AS city, ',
        'ST_Distance(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)))/1000 AS distance',
      ])
      .where(
        'ST_DWithin(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)) ,:range)',
      )
      .setParameters({
        // stringify GeoJSON
        origin: JSON.stringify(origin),
        range: range * 1000, //KM conversion
      })
      .getRawMany();
    return cities;
  }
}
