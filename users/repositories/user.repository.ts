import { BadRequestException, Logger } from '@nestjs/common';
import { ResponseMessageDto } from 'src/dtos/responseMessageDto';
import { MessageStatus } from 'src/enums/MessageStatus.enum';
import { EntityRepository, Repository } from 'typeorm';

import { UserFetishDto } from '../dto/user-fetish.dto';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  async getUserFromLogin(id: string): Promise<User> {
    console.log(`User id ${id}`);
    const query = this.createQueryBuilder('user');
    //try {
    const user = await query
      .andWhere('user.userLogin = :id', {
        id: `${id}`,
      })
      .loadRelationCountAndMap('user.friendsCount', 'user.friends')
      .getOne();

    return user;
  }

  async getUserWithOwnActivities(id: string): Promise<User> {
    this.logger.log(`User Repository called  with ${id}`);
    const query = this.createQueryBuilder('user');
    try {
      const user = await query
        .andWhere('user.userLogin = :id', { id: `${id}` })
        .leftJoinAndSelect('user.activitiesOrganising', 'activitiesOrganising')
        .getOne();
      return user;
    } catch (err) {
      this.logger.error('Error with user query');
      console.log(err.message);
    }
  }

  async getUserWithRelationships(id: string): Promise<User> {
    this.logger.log(`repository got called  with ${id}`);
    const query = this.createQueryBuilder('user');
    try {
      const user = await query
        .andWhere('user.userLogin = :id', {
          id: `${id}`,
        })
        .leftJoinAndSelect('user.relationships', 'relationships')
        .leftJoinAndSelect('user.dsrelationships', 'dsrelationships')
        //.innerJoinAndSelect('user.relationships', 'relationships')
        .loadRelationCountAndMap('user.friendsCount', 'user.friends')
        .getOne();

      return user;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Could not find user');
    }
  }

  async getUserRelationships(userId: string) {
    const user = await this.findOne(userId, {
      relations: ['relationships'],
    });
    console.log('user Relationsships');
    console.log(user);
    return user;
  }
  async getUserDsRelationships(userId: string) {
    try {
      const num = await this.findOne(userId, {
        relations: ['dsrelationships'],
      });

      console.log('user dsrelationships');
      console.log(num);
      return num;
    } catch (err) {
      this.logger.log('Called relationship error');
      throw new BadRequestException('Invalid dsrelationship.');
    }
  }

  async getUserRelations(userId: string): Promise<User> {
    try {
      this.logger.log(`getUserRelations userId: ${userId}`);
      const users = await User.findOne({
        relations: [
          'relationships',
          'dsrelationships',
          'friends',
          'fetishMaps',
          'fetishMaps.fetish',
        ],
      });
      return users;
    } catch (err) {
      this.logger.warn(`Invalid find user with relations`);
      throw new BadRequestException('Invalid find user with relations');
    }
  }

  async addAddRelationship(
    userId: string,
    relationshipId: string,
  ): Promise<ResponseMessageDto> {
    const query = this.createQueryBuilder('user');
    try {
      const res = await query
        .relation('relationships')
        .of(userId)
        .add(relationshipId);
      const newCount = this.getUserRelationships.length;
      const user = await this.findOne({ id: userId });
      user.numRelationships = newCount;
      await user.save();

      return {
        status: MessageStatus.SUCCESS,
        message: `Added relationship - number of relationshiops: ${user.numRelationships}`,
      };
    } catch (err) {
      this.logger.warn(err.message);
      return { status: MessageStatus.ERROR, message: err.message };
    }
  }

  async addAddDsRelationship(
    userId: string,
    relationshipId: string,
  ): Promise<ResponseMessageDto> {
    this.logger.log('called addAddDsRelationship');
    const query = this.createQueryBuilder('user');
    try {
      const res = await query
        .relation('dsrelationships')
        .of(userId)
        .add(relationshipId);
      const updatedUser = await this.getUserDsRelationships(userId);

      const user = await this.findOne({ id: userId });

      user.numDsRelationships = updatedUser.dsrelationships.length;
      await user.save();

      return {
        status: MessageStatus.SUCCESS,
        message: `Added DS relationship - number of ds relationshiops: ${user.numDsRelationships}`,
      };
    } catch (err) {
      this.logger.warn(err.message);
      return { status: MessageStatus.ERROR, message: err.message };
    }
  }

  async deleteProfileRelationship(
    userId: string,
    relationshipId: string,
    relationshipType: string,
  ): Promise<ResponseMessageDto> {
    this.logger.log(
      `deleteProfileRelationship called with relationshipType: ${relationshipType}`,
    );
    const query = this.createQueryBuilder('user');
    try {
      const result = await query
        .relation(relationshipType)
        .of(userId)
        .remove(relationshipId);

      this.logger.log(`after remove query:  ${result}`);

      let newCount =
        relationshipType === 'relationships'
          ? (await this.getUserRelationships(userId)).relationships.length
          : (await this.getUserDsRelationships(userId)).dsrelationships.length;

      this.logger.log(`new Count: ${newCount}`);
      const user = await this.findOne({ id: userId });
      if (relationshipId === 'relationships') {
        user.numRelationships = newCount;
      } else {
        user.numDsRelationships = newCount;
      }
      await user.save();

      return {
        status: MessageStatus.SUCCESS,

        message: `Removed ${relationshipType} relationship - number of relationshiops: ${
          relationshipType === 'relationships'
            ? user.numRelationships
            : user.numDsRelationships
        }`,
      };
    } catch (err) {
      this.logger.warn(err.message);
      return { status: MessageStatus.ERROR, message: err.message };
    }
  }

  async addFetishToProfile(userDFetishDto: UserFetishDto) {
    return {
      message: `userRepository addFetishToProfile called with ${JSON.stringify(
        userDFetishDto,
      )}`,
    };
  }
}
