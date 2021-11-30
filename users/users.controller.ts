import { Body, Controller, Delete, Get, Logger, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import JwtAuthenticationGuard from 'src/auth/jwt/jwt-authentication.guard';
import { ResponseMessageDto } from 'src/dtos/responseMessageDto';

import { GetUserLogin } from '../auth/decorators/get-user-login.decorator';
import { UserLogin } from '../auth/user-login.entity';
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
import { UserRelationshipDto } from './dto/user-relationship.dto';
import { UserTitleFilterDto } from './dto/user-title-filter.dto';
import { DsRelationship } from './entities/ds-relationship.entity';
import { Fetish } from './entities/fetish.entity';
import { Relationship } from './entities/relationship.entity';
import { UserFetishMap } from './entities/user-fetish-map.entity';
import { UserGenderEntity } from './entities/user-gender.entity';
import { UserTitle } from './entities/user-title.entity';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
  logger = new Logger('UsersSer');
  constructor(private usersService: UsersService) {}
  @Post('/seedTitle')
  async seedTitle() {
    const result = await this.usersService.seedTitle();
    return { message: result };
  }
  @Get('/title')
  async getUserTitles(
    @Query(ValidationPipe) filterDto: UserTitleFilterDto,
  ): Promise<UserTitle[]> {
    return await this.usersService.getUserTitles(filterDto);
  }

  @Post('/seedDsRelationship')
  async seedDsRepository(): Promise<string> {
    return await this.usersService.seedDsRelationship();
  }

  @Post('/seedRelationships')
  async seedRelationships(): Promise<string> {
    return await this.usersService.seedRelationship();
  }

  @Post('/seedFetishes')
  async seedFetishes(): Promise<string> {
    return await this.usersService.seedFetishes();
  }

  @Post('/seedGender')
  async seedGener(): Promise<String> {
    return await this.usersService.seedGender();
  }

  @Get('/fetish')
  async getFetishes(
    @Query(ValidationPipe) filterDto: FetishFilterDto,
  ): Promise<Fetish[]> {
    return await this.usersService.getFetishes(filterDto);
  }

  @Get('/gender')
  async getGenders(
    @Query(ValidationPipe) filterDto: UserGenderFilterDto,
  ): Promise<UserGenderEntity[]> {
    const genders = await this.usersService.getGenders(filterDto);
    return genders;
  }
  @Post('/seedPronoun')
  async seedPronoun(): Promise<string> {
    return await this.usersService.seedPronoun();
  }
  @Get('/pronoun')
  async getPronouns(
    @Query(ValidationPipe) filterDto: UserPronounFilterDto,
  ): Promise<UserProNounDto[]> {
    return await this.usersService.getPronouns(filterDto);
  }

  @Post('/seedOrientation')
  async seedOrientayion(): Promise<string> {
    return await this.usersService.seedOrientation();
  }

  @Get('/orientation')
  async getOrientations(
    @Query(ValidationPipe) filterDto: SexualOrientationFilterDto,
  ): Promise<SexualOrientationDto[]> {
    return await this.usersService.getOrientations(filterDto);
  }

  @Post('/profile')
  @UseGuards(JwtAuthenticationGuard)
  async saveProfile(
    @Body(ValidationPipe) userProfileDto: UserProfileDto,
    @GetUserLogin() userLogin: UserLogin,
  ): Promise<User> {
    this.logger.log('saveProfile called');
    console.log(userProfileDto);

    return await this.usersService.saveProfile(userProfileDto, userLogin);
  }

  @Get('/profile')
  @UseGuards(JwtAuthenticationGuard)
  async getProfile(@GetUserLogin() userLogin: UserLogin): Promise<User> {
    return await this.usersService.getProfile(userLogin.id);
  }

  @Get('/profileWithRelationship')
  @UseGuards(JwtAuthenticationGuard)
  async getProfileRelationships(
    @GetUserLogin() userLogin: UserLogin,
  ): Promise<User> {
    this.logger.log('called  getProfileRelationships');
    return await this.usersService.getProfileWithRelationships(userLogin.id);
  }

  @Get('/profileRelations')
  @UseGuards(JwtAuthenticationGuard)
  async getProfileRelations(
    @GetUserLogin() userLogin: UserLogin,
  ): Promise<User> {
    return await this.usersService.getProfileWithRelations(userLogin.id);
  }

  @Get('/relationship')
  async getRelationships(
    @Query(ValidationPipe) filterDto: GetRelationshipsFilterDto,
  ): Promise<Relationship[]> {
    return this.usersService.getRelationships(filterDto);
  }

  @Get('/dsRelationship')
  async getDsRelationships(
    @Query(ValidationPipe) filterDto: GetRelationshipsFilterDto,
  ): Promise<DsRelationship[]> {
    return this.usersService.getDsRelationships(filterDto);
  }

  @Post('/profileRelationship')
  @UseGuards(AuthGuard())
  async saveUserRelationship(
    @Body(ValidationPipe) userRelationshipDto: UserRelationshipDto,
    @GetUserLogin() UserLogin: UserLogin,
  ): Promise<string> {
    return 'save profile relationship';
  }

  @Patch('/profileRelationship')
  @UseGuards(JwtAuthenticationGuard)
  async addProfileRelationship(
    @Query(ValidationPipe) profileRelationshipDto: ProfileRelationshipDto,
  ) {
    return this.usersService.addProfileRelationship(profileRelationshipDto);
  }
  @Patch('/profileDsRelationship')
  @UseGuards(JwtAuthenticationGuard)
  async addProfileDsRelationship(
    @Query(ValidationPipe) profileRelationshipDto: ProfileRelationshipDto,
  ) {
    return this.usersService.addProfileDsRelationship(profileRelationshipDto);
  }

  @Delete('/profileDsRelationship')
  @UseGuards(JwtAuthenticationGuard)
  async deleteProfileDsRelationship(
    @Query(ValidationPipe) profileRelationshipDto: ProfileRelationshipDto,
  ) {
    return await this.usersService.deleteProfileDsRelationship(
      profileRelationshipDto,
    );
  }

  @Delete('/profileRelationship')
  @UseGuards(JwtAuthenticationGuard)
  async deleteProfileRelationship(
    @Query(ValidationPipe) profileRelationshipDto: ProfileRelationshipDto,
  ) {
    return await this.usersService.deleteProfileRelationship(
      profileRelationshipDto,
    );
  }

  @Post('/userfetish')
  @UseGuards(JwtAuthenticationGuard)
  async addUserFetish(
    @Body(ValidationPipe) userFetishDto: UserFetishDto,
  ): Promise<UserFetishMap> {
    return this.usersService.addFetishToProfile(userFetishDto);
  }

  @Delete('/userfetish')
  @UseGuards(JwtAuthenticationGuard)
  async deleteUserFetish(
    @Query(ValidationPipe) userFetishDto: UserFetishDto,
  ): Promise<ResponseMessageDto> {
    return await this.usersService.deleteProfileFetish(userFetishDto);
  }
}
