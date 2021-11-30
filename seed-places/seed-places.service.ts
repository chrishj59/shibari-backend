import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

import { CreateSeedPlaceDto } from './create-seed-place.dto';
import { Place } from './seed-places.model';

@Injectable()
export class SeedPlacesService {
  private seedPlaces: Place[] = [];

  getAllSeedPlaces(): Place[] {
    return this.seedPlaces;
  }

  getSeedPlaceById(id: string): Place {
    return this.seedPlaces.find((place) => place.id === id);
  }

  createSeedPlace(createSeedPlaceDto: CreateSeedPlaceDto): Place {
    const place = {
      id: uuid(),
      lang: createSeedPlaceDto.lang,
      lang_name: createSeedPlaceDto.lang_name,
      alpha2: createSeedPlaceDto.alpha2,
      alpha3: createSeedPlaceDto.alpha3,
      alpha4: createSeedPlaceDto.alpha4,
      numeric: createSeedPlaceDto.numeric,
      name: createSeedPlaceDto.name,
      create_at: new Date(),
      update_at: new Date(),
    };
    this.seedPlaces.push(place);
    return place;
  }
}
