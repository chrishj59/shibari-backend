import { BadRequestException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { Fetish } from '../entities/fetish.entity';
import { UserFetishMap } from '../entities/user-fetish-map.entity';
import { User } from '../entities/user.entity';

@EntityRepository(UserFetishMap)
export class UserFetishMapRepository extends Repository<UserFetishMap> {
  private logger = new Logger('UserFetishMapRepository');

  async addUserFetish(
    fetish: Fetish,
    user: User,
    give: string,
    receive: string,
  ): Promise<UserFetishMap> {
    const userFetish = new UserFetishMap();
    userFetish.fetish = fetish;
    userFetish.user = user;
    userFetish.giveLevel = give;
    userFetish.receiveLevel = receive;
    try {
      return await userFetish.save({ reload: true });
    } catch (err) {
      this.logger.warn(`Failed to save UserFetishMap: ${err.message}`);
      throw new BadRequestException('Could not save User Fetish assignment');
    }
  }
}
