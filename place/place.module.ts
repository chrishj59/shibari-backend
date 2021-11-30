import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LangIso639Repository } from '../common/repositories/iso_339_lang.repository';
import { PlaceController } from './place.controller';
import { PlacesService } from './place.service';
import { CountryCityRepository } from './repository/country-city.repository';
import { CountryStateRepository } from './repository/country-state.repository';
import { CountryRepository } from './repository/country.repository';
import { UkTownRepository } from './uk-town.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CountryRepository,
      UkTownRepository,
      LangIso639Repository,
      CountryStateRepository,
      CountryCityRepository,
    ]),
  ],
  controllers: [PlaceController],
  providers: [PlacesService],
})
export class PlaceModule {}
