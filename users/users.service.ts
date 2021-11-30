import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessageDto } from 'src/dtos/responseMessageDto';
import { MessageStatus } from 'src/enums/MessageStatus.enum';

import { UserLogin } from '../auth/user-login.entity';
import { UkTown } from '../place/uk-town.entity';
import { UkTownRepository } from '../place/uk-town.repository';
import { FetishFilterDto } from './dto/fetish-filter.dto';
import { ProfileRelationshipDto } from './dto/profileRelationship.dto';
import { GetRelationshipsFilterDto } from './dto/relationships-filter.dto';
import { SexualOrientationFilterDto } from './dto/sexual-orientation-filter.dto';
import { SexualOrientationDto } from './dto/sexual-orientation.dto';
import { UserFetishDto } from './dto/user-fetish.dto';
import { UserGenderFilterDto } from './dto/user-gender-filter.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserPronounFilterDto } from './dto/user-pronoun-filter.dto';
import { UserProNounDto } from './dto/user-pronoun.dto';
import { UserTitleFilterDto } from './dto/user-title-filter.dto';
import { DsRelationship } from './entities/ds-relationship.entity';
import { Fetish } from './entities/fetish.entity';
import { Relationship } from './entities/relationship.entity';
import { UserFetishMap } from './entities/user-fetish-map.entity';
import { UserGenderEntity } from './entities/user-gender.entity';
import { UserTitle } from './entities/user-title.entity';
import { User } from './entities/user.entity';
import { DsRelationshipRepository } from './repositories/ds-relationship.repository';
import { FetishRepository } from './repositories/fetish.repository';
import { UserFetishMapRepository } from './repositories/user-fetish-repository';
import { UserGenderRepository } from './repositories/user-gender.repositoy';
import { UserOrientationRepository } from './repositories/user-orientation.repository';
import { UserPronounRepository } from './repositories/user-pronoun.repository';
import { UserRelationShipRepository } from './repositories/user-relationship.repository';
import { UserTitleRepository } from './repositories/user-title.repository';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserTitleRepository)
    private userTitleRepository: UserTitleRepository,
    @InjectRepository(DsRelationshipRepository)
    private dsRelationshipRepository: DsRelationshipRepository,
    @InjectRepository(UserRelationShipRepository)
    private userRelationshipRepository: UserRelationShipRepository,
    @InjectRepository(FetishRepository)
    private fetishRepository: FetishRepository,
    @InjectRepository(UserGenderRepository)
    private userGenderRepository: UserGenderRepository,
    @InjectRepository(UserPronounRepository)
    private userPronounRepository: UserPronounRepository,
    @InjectRepository(UserOrientationRepository)
    private userOrientationRepository: UserOrientationRepository,
    @InjectRepository(UkTownRepository)
    private ukTownRepository: UkTownRepository,
    @InjectRepository(User)
    private userRepository: UserRepository,
    @InjectRepository(UserFetishMap)
    private userFetishRepository: UserFetishMapRepository,
  ) {}
  private logger = new Logger('Users Service');

  async getUserTitles(filterDto: UserTitleFilterDto): Promise<UserTitle[]> {
    return await this.userTitleRepository.getUserTitles(filterDto);
  }
  async seedTitle(): Promise<string> {
    this.logger.log('SeedTitle');
    const res = await this.userTitleRepository.seedUserTitle();
    return res;
  }

  async seedDsRelationship(): Promise<string> {
    return await this.dsRelationshipRepository.seedDsRelationship();
  }

  async seedRelationship(): Promise<string> {
    return await this.userRelationshipRepository.seedRelationships();
  }

  async seedFetishes(): Promise<string> {
    return await this.fetishRepository.seedFetish();
  }

  async seedGender(): Promise<string> {
    return await this.userGenderRepository.seedGender();
  }

  async seedPronoun(): Promise<string> {
    return await this.userPronounRepository.seedPronoun();
  }
  async seedOrientation(): Promise<string> {
    return await this.userOrientationRepository.seedOrientation();
  }

  async getGenders(
    genderFilter: UserGenderFilterDto,
  ): Promise<UserGenderEntity[]> {
    return await this.userGenderRepository.getGender(genderFilter);
  }

  async getPronouns(
    pronounFilter: UserPronounFilterDto,
  ): Promise<UserProNounDto[]> {
    return await this.userPronounRepository.getPronouns(pronounFilter);
  }

  async getOrientations(
    orientationFilter: SexualOrientationFilterDto,
  ): Promise<SexualOrientationDto[]> {
    return await this.userOrientationRepository.getOrientations(
      orientationFilter,
    );
  }

  async getFetishes(fetishFilter: FetishFilterDto): Promise<Fetish[]> {
    return await this.fetishRepository.getFetishes(fetishFilter);
  }

  async getRelationships(
    relationshipFilter: GetRelationshipsFilterDto,
  ): Promise<Relationship[]> {
    return await this.userRelationshipRepository.getRelationships(
      relationshipFilter,
    );
  }

  async getDsRelationships(
    relationshipFilter: GetRelationshipsFilterDto,
  ): Promise<DsRelationship[]> {
    return await this.dsRelationshipRepository.getDsRelationships(
      relationshipFilter,
    );
  }

  async getProfileFriends() {}
  async saveProfile(
    userProfileDto: UserProfileDto,
    userLogin: UserLogin,
  ): Promise<User> {
    const {
      title,
      city,
      county,
      gender,
      pronoun,
      orientation,
      visibility,
      aboutMe,
      dob,
      firstName,
      familyName,
      email,
      phone_number,
    } = userProfileDto;
    this.logger.log(userLogin);
    this.logger.log(userProfileDto);

    let user = new User();
    let update = false;
    try {
      user = await this.userRepository.findOne({
        where: { userLogin: { id: userLogin.id } },
      });
      this.logger.log('find user');
      this.logger.log(JSON.stringify(user));
      if (user) {
        update = true;
      }
    } finally {
      if (!user) {
        user = new User();
      }
    }

    user.userLogin = userLogin;
    user.firstName = firstName;
    user.familyName = familyName;
    user.dob = dob;
    user.locationDisplay = visibility;
    user.about = aboutMe;
    user.emailAddress = email;
    user.phoneNumber = phone_number;
    if (title) {
      const userTitle = await this.userTitleRepository.findOne({
        id: title,
      });
      user.title = userTitle;
    }
    if (gender) {
      const genderRec = await this.userGenderRepository.findOne({ id: gender });
      user.gender = genderRec;
    }
    if (pronoun) {
      const pronounRec = await this.userPronounRepository.findOne({
        id: pronoun,
      });
      user.pronoun = pronounRec;
    }
    if (orientation) {
      const orientationRec = await this.userOrientationRepository.findOne({
        id: orientation,
      });
      user.orientation = orientationRec;
    }
    if (city) {
      try {
        const ukTowns = await this.ukTownRepository.findByIds([city]);
        const ukTown: UkTown = ukTowns[0];
        user.latitude = ukTown.lat;
        user.logitude = ukTown.lng;
        user.location = ukTown.location;
        user.town = ukTown;
      } catch (err) {
        this.logger.error(JSON.stringify(err));
      }
    }
    try {
      //const ret = await user.save();
      this.logger.log('after save');
      //this.logger.log(JSON.stringify(ret));
      //return ret;
      return null;
    } catch (err) {
      this.logger.error(err.message);
      let message: string = err.message;
      if (message.startsWith('duplicate key value')) {
        message = 'You cannot create a duplicate';
      }
      throw new BadRequestException(err.message);
    }
  }

  async getProfile(loginId: string): Promise<User> {
    return this.userRepository.getUserFromLogin(loginId);
  }

  async getProfileWithRelationships(loginId: string): Promise<User> {
    return await this.userRepository.getUserWithRelationships(loginId);
  }

  async getProfileWithRelations(loginId: string): Promise<User> {
    return await this.userRepository.getUserRelations(loginId);
  }

  async addProfileRelationship(
    profileRelationship: ProfileRelationshipDto,
  ): Promise<ResponseMessageDto> {
    const { relationshipId, profileId } = profileRelationship;

    return await this.userRepository.addAddRelationship(
      profileId,
      relationshipId,
    );
  }

  async addProfileDsRelationship(
    profileRelationship: ProfileRelationshipDto,
  ): Promise<ResponseMessageDto> {
    const { relationshipId, profileId } = profileRelationship;

    return await this.userRepository.addAddDsRelationship(
      profileId,
      relationshipId,
    );
  }

  async deleteProfileDsRelationship(
    profileRelationship: ProfileRelationshipDto,
  ): Promise<ResponseMessageDto> {
    const { relationshipId, profileId } = profileRelationship;
    return await this.userRepository.deleteProfileRelationship(
      profileId,
      relationshipId,
      'dsrelationships',
    );
  }
  async deleteProfileRelationship(
    profileRelationship: ProfileRelationshipDto,
  ): Promise<ResponseMessageDto> {
    const { relationshipId, profileId } = profileRelationship;
    console.log(profileRelationship);
    return await this.userRepository.deleteProfileRelationship(
      profileId,
      relationshipId,
      'relationships',
    );
  }

  async addFetishToProfile(
    userFetishDto: UserFetishDto,
  ): Promise<UserFetishMap> {
    const { userId, fetishId, receive, give } = userFetishDto;
    const fetish = await Fetish.findOne({ id: fetishId });
    const user = await User.findOne({ id: userId });

    return await this.userFetishRepository.addUserFetish(
      fetish,
      user,
      give,
      receive,
    );
  }
  async deleteProfileFetish(
    userFetishDto: UserFetishDto,
  ): Promise<ResponseMessageDto> {
    const { userId, fetishId } = userFetishDto;
    try {
      const { affected } = await this.userFetishRepository.delete(fetishId);
      return {
        status: MessageStatus.SUCCESS,
        message: `Number of Profile fetishes deleted ${affected}`,
      };
    } catch (err) {
      throw new BadRequestException('Could not delete user');
    }
  }
}
