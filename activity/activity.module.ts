import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UkTownRepository } from '../place/uk-town.repository';
import { UserRepository } from '../users/repositories/user.repository';
import { ActivityController } from './activity.controller';
import { ActivityRepository } from './activity.repository';
import { ActivityService } from './activity.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActivityRepository,
      UserRepository,
      UkTownRepository,
    ]),
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
