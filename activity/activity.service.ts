import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ResponseMessageDto } from '../dtos/responseMessageDto';
import { MessageStatus } from '../enums/MessageStatus.enum';
import { UkTown } from '../place/uk-town.entity';
import { UkTownRepository } from '../place/uk-town.repository';
import { UserRepository } from '../users/repositories/user.repository';
import { ActivityDto } from './activity-create.dto';
import { Activity } from './activity.entity';
import { ActivityRepository } from './activity.repository';

function compareActivityStart(act1: Activity, act2: Activity): number {
  const aStart = act1.startsAt;
  const bStart = act2.startsAt;

  return aStart.getMilliseconds() - bStart.getMilliseconds();
}
@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityRepository)
    private activityRepository: ActivityRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(UkTownRepository)
    private placeRepository: UkTownRepository,
  ) {}
  private logger = new Logger('Activity Service');

  async addActivty(
    payLoad: ActivityDto,
    id: string,
  ): Promise<ResponseMessageDto> {
    this.logger.log(`ActivitySErvice::AddActivity called  with id ${id}`);
    const user = await this.userRepository.getUserFromLogin(id);
    if (!user) {
      throw new BadRequestException('Invalid user id');
    }
    let place: UkTown;
    try {
      const places = await this.placeRepository.find({ id: payLoad.cityId });
      place = places[0];
      if (!places || places.length === 0) {
        throw new BadRequestException('Invalid place');
      }
    } catch (err) {
      throw new BadRequestException(
        `Invalid place id received - ${err.message}`,
      );
    }

    let activity = new Activity();
    activity.cityId = payLoad.cityId;
    activity.cityName = place.place;
    activity.cost = payLoad.cost;
    activity.county = place.county;
    activity.descr = payLoad.descr;
    activity.dressCode = payLoad.dressCode;
    activity.endsAt = payLoad.endsAt;
    activity.lat = place.lat;
    activity.lng = place.lng;
    activity.name = payLoad.name;
    activity.owner = user;
    activity.startsAt = payLoad.startsAt;
    activity.tagLine = payLoad.tagLine;
    try {
      const { id } = await activity.save();
      return {
        status: MessageStatus.SUCCESS,
        message: `Created activity id: ${id}`,
      };
    } catch (err) {
      return {
        status: MessageStatus.ERROR,
        message: err.message,
      };
    }
  }

  async getOwnActivities(loginId: string): Promise<Activity[]> {
    this.logger.log(`Called getOwnActivities with login ${loginId}`);
    try {
      let user = await this.userRepository.getUserWithOwnActivities(loginId);
      if (!user) {
        throw new BadRequestException('Invalid user id');
      }
      if (
        !user.activitiesOrganising ||
        user.activitiesOrganising.length === 0
      ) {
        return [];
      }
      user.activitiesOrganising.sort(
        (a: Activity, b: Activity) =>
          a.startsAt.getMilliseconds() - b.startsAt.getMilliseconds(),
      );
      console.log(user.activitiesOrganising);
      return user.activitiesOrganising;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
    return null;
  }
}
