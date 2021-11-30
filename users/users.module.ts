import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceModule } from 'src/place/place.module';

import { UserLoginRepository } from '../auth/user-login.repository';
import { UkTownRepository } from '../place/uk-town.repository';
import { DsRelationshipRepository } from './repositories/ds-relationship.repository';
import { FetishRepository } from './repositories/fetish.repository';
import { UserFetishMapRepository } from './repositories/user-fetish-repository';
import { UserGenderRepository } from './repositories/user-gender.repositoy';
import { UserOrientationRepository } from './repositories/user-orientation.repository';
import { UserPronounRepository } from './repositories/user-pronoun.repository';
import { UserRelationShipRepository } from './repositories/user-relationship.repository';
import { UserRoleRepository } from './repositories/user-role.repository';
import { UserTitleRepository } from './repositories/user-title.repository';
import { UserRepository } from './repositories/user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
        },
      }),
    }),
    TypeOrmModule.forFeature([
      UserTitleRepository,
      UserRepository,
      DsRelationshipRepository,
      UserRelationShipRepository,
      FetishRepository,
      UserGenderRepository,
      UserPronounRepository,
      UserRoleRepository,
      UserOrientationRepository,
      UserLoginRepository,
      UkTownRepository,
      UserFetishMapRepository,
    ]),
    PlaceModule,
  ],

  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
