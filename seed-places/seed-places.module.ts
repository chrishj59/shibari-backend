import { Module } from '@nestjs/common';
import { SeedPlacesController } from './seed-places.controller';
import { SeedPlacesService } from './seed-places.service';

@Module({
  controllers: [SeedPlacesController],
  providers: [SeedPlacesService]
})
export class SeedPlacesModule {}
