import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateSeedPlaceDto } from './create-seed-place.dto';
import { SeedPlacesService } from './seed-places.service';

@Controller('seed/placesOld')
export class SeedPlacesController {
  constructor(private seedPlacesService: SeedPlacesService) {}

  @Get()
  getAllSeedPlaces() {
    return this.seedPlacesService.getAllSeedPlaces();
  }

  @Get('/:id')
  getSeedPlaceById(@Param('id') id: string) {
    return this.seedPlacesService.getSeedPlaceById(id);
  }

  @Post()
  createPLace(@Body() place: CreateSeedPlaceDto) {
    return this.seedPlacesService.createSeedPlace(place);
  }
}
