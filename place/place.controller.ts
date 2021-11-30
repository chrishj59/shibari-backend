import { Controller, Get, Logger, Param, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common';

import { ResponseMessageDto } from '../dtos/responseMessageDto';
import { CountryName } from './dto/country-name.dto';
import { UkPlaceFilterDto } from './dto/uk-place-filter.dto';
import { UkPlaceDto } from './dto/uk-place.dto';
import { UkTownFilterDto } from './dto/uk-town-filter.dto';
import { PlacesService } from './place.service';

@Controller('api/v1/place')
export class PlaceController {
  constructor(private placesService: PlacesService) {}
  private logger = new Logger('PlaceController');

  @Post('/seedCountry')
  async seedCountries(): Promise<string> {
    return await this.placesService.seedCountries();
  }

  @Post('/seedTowns')
  async seedTowns(): Promise<string> {
    return await this.placesService.seedTowns();
  }

  @Post('/seedCountryState')
  async seedCountryState(): Promise<ResponseMessageDto> {
    return await this.placesService.seedCountryState();
  }

  @Post('/seedCountryLang')
  async seedCountryLang(): Promise<ResponseMessageDto> {
    return await this.placesService.seedCountryLang();
  }

  @Post('/seedCountryCity')
  async seeCountryCity(): Promise<ResponseMessageDto> {
    return await this.placesService.seedCountryCity();
  }

  @Get('/ukCounty')
  async getUkCounties(
    @Query(ValidationPipe) filterDto: UkTownFilterDto,
  ): Promise<string[]> {
    return this.placesService.getUkCounties(filterDto);
  }

  @Get('/ukPlace')
  async getUkPlaces(
    @Query(ValidationPipe) filterDto: UkPlaceFilterDto,
  ): Promise<UkPlaceDto[]> {
    return await this.placesService.getUkPlaces(filterDto);
  }

  @Get('/countryName')
  async getCountryNames(): Promise<CountryName[]> {
    return await this.placesService.getCountryNames();
  }

  @Get('/StatesForCountry/:id')
  async getStatesByCountryId(@Param('id', ParseIntPipe) id: number) {
    return await this.placesService.getStatesByCountryId(id);
  }

  @Get('/CitiesForCounty/:id')
  async getCitiesByCountyId(@Param('id', ParseIntPipe) id: number) {
    return await this.placesService.getCitiesByCountyId(id);
  }
}
