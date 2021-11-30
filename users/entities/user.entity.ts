import { Geometry } from 'geojson';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { Activity } from '../../activity/activity.entity';
import { UserLogin } from '../../auth/user-login.entity';
import { Comment } from '../../comment/comment.entity';
import { LikeMap } from '../../common/entities/like-map.entity';
import { UkTown } from '../../place/uk-town.entity';
import { DsRelationship } from './ds-relationship.entity';
import { Relationship } from './relationship.entity';
import { UserFetishMap } from './user-fetish-map.entity';
import { UserGenderEntity } from './user-gender.entity';
import { UserOrientationEntity } from './user-orientation.entity';
import { UserPronounEntity } from './user-pronoun.entity';
import { UserRoleEntity } from './user-role.entity';
import { UserTitle } from './user-title.entity';

const origin = {
  type: 'Point',
  coordinates: [0, 0],
};

export enum LocationDisplayEnum {
  N = 'N', // None
  FR = 'FR', // Friends
  ALL = 'ALL', // Other users
}

export enum LocationSearchLevel {
  COUNTRY = 'COUNTRY',
  STATE = 'STATE',
  CITY = 'CITY',
}

@Entity()
@Unique('UQ_USER_NAMES', ['firstName', 'familyName'])
@Unique('UQ_USER', ['userLogin'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'family_name' })
  familyName: string;

  @Column({ nullable: true })
  category: string;

  @Column({
    type: 'geometry',
    nullable: true,
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: Geometry;

  /* 
  to calulate the distance between 2 point using actual shape of earth
  SELECT ST_Distance_Spheroid(geometry(a.location), geometry(b.location), 'SPHEROID["WGS 84",6378137,298.257223563]')
  FROM pointsTable a, pointsTable b
  WHERE a.id=1 AND b.id=2;
  */

  //UPDATE customers SET location = 'point(37.7, 122.4)' where id = 123;
  //UPDATE customers SET location = ST_MakePoint(lat, lon) where id = 123;

  @Column({ type: 'decimal', precision: 8, scale: 5, nullable: true })
  logitude: number;

  @Column({ type: 'decimal', precision: 8, scale: 5, nullable: true })
  latitude: number;

  @Column({ name: 'avitar_data', nullable: true })
  avitar: string;

  @Column({ name: 'avitar_media_type', nullable: true })
  avitarMedia: string;

  @Column({ name: 'email_address', nullable: true })
  emailAddress: string;
  @Column({ name: 'telephone', nullable: true })
  phoneNumber: number;

  @Column({
    name: 'plan_amount',
    type: 'decimal',
    precision: 13,
    scale: 2,
    nullable: true,
  })
  planAmount: number;

  @Column({ name: 'paid_to', type: 'date', nullable: true })
  paidUtil: Date;

  @Column({ type: 'date', nullable: true })
  dob: Date;

  @Column({ type: 'text', nullable: true })
  about: string;

  @Column({
    name: 'location_display',
    type: 'enum',
    enum: LocationDisplayEnum,
    default: LocationDisplayEnum.N,
  })
  locationDisplay: LocationDisplayEnum;

  @ManyToOne((_type) => UserTitle, (title) => title.users, {
    eager: true,
    nullable: true,
  })
  title: UserTitle;

  @ManyToMany((_type) => Relationship, (relationship) => relationship.users)
  @JoinTable({
    name: 'user_relationship_map',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'relationshipId' },
  })
  relationships: Relationship[];

  @ManyToMany(
    (_type) => DsRelationship,
    (dsrelationship) => dsrelationship.users,
  )
  @JoinTable({
    name: 'user_dsrelationship_map',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'relationshipId' },
  })
  dsrelationships: DsRelationship[];

  @Column({ name: 'num_relationships', default: 0 })
  numRelationships: number;

  @Column({ name: 'num_ds-relationships', default: 0 })
  numDsRelationships: number;

  @ManyToOne((_type) => UserRoleEntity, (role) => role.users, {
    eager: true,
    nullable: true,
  })
  role: UserRoleEntity[];

  @ManyToOne((_type) => UserPronounEntity, (pronoun) => pronoun.users, {
    eager: true,
    nullable: true,
  })
  pronoun: UserPronounEntity;

  @ManyToOne(
    (_type) => UserOrientationEntity,
    (orientation) => orientation.users,
    {
      eager: true,
      nullable: true,
    },
  )
  orientation: UserOrientationEntity;

  @ManyToOne((_type) => UserGenderEntity, (gender) => gender.users, {
    eager: true,
    nullable: true,
  })
  gender: UserGenderEntity;

  @OneToOne(() => UserLogin)
  @JoinColumn()
  userLogin: UserLogin;

  @ManyToOne(() => UkTown, (ukTown) => ukTown.users, {
    eager: true,
    nullable: true,
  })
  town: UkTown;

  @ManyToMany((type) => User, (user) => user.following)
  @JoinTable({ name: 'user_followers_map' })
  followers: User[];

  @ManyToMany((type) => User, (user) => user.followers)
  following: User[];

  @ManyToMany((type) => User, (user) => user.friendsWith)
  @JoinTable({ name: 'user_friends_maps' })
  friends: User[];

  @ManyToMany((type) => User, (user) => user.friends)
  friendsWith: User[];

  @OneToMany((type) => UserFetishMap, (fetishMap) => fetishMap.user)
  fetishMaps: UserFetishMap[];

  @OneToMany((type) => Comment, (comment) => comment.createdBy)
  comments: Comment[];

  @OneToMany((_type) => LikeMap, (like) => like.commentLikeUser)
  commentLikes: LikeMap[];

  @OneToMany((_type) => Activity, (activity) => activity.owner)
  activitiesOrganising: Activity[];

  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @VersionColumn()
  version: number;

  setLocation(lat: number, lng: number): void {
    this.location = {
      type: 'Point',
      coordinates: [lng, lat],
    };
  }
}
