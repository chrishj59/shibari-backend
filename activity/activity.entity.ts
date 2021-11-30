import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { Comment } from '../comment/comment.entity';
import { User } from '../users/entities/user.entity';

@Entity('activities')
export class Activity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'tag-line' })
  tagLine: string;

  @Column({ name: 'description' })
  descr: string;

  @Column({
    name: 'cost',
    type: 'decimal',
    precision: 13,
    scale: 2,
    default: 0,
  })
  cost: number;

  @Column({ name: 'dress-code', nullable: true })
  dressCode: string;

  @Column({ name: 'starts-at' })
  startsAt: Date;

  @Column({ name: 'ends-at' })
  endsAt: Date;

  @Column({ name: 'county-name', nullable: true })
  county: string;

  @Column({ name: 'city-name', nullable: true })
  cityName: string;

  @Column({ name: 'city-id', nullable: true })
  cityId: string;

  @Column({
    name: 'latitude',
    nullable: true,
    type: 'numeric',
    precision: 8,
    scale: 4,
  })
  lat: number;

  @Column({
    name: 'longitude',
    nullable: true,
    type: 'numeric',
    precision: 8,
    scale: 4,
  })
  lng: number;

  @OneToMany((_type) => Comment, (comment) => comment.activity)
  comments: Comment[];

  @ManyToOne((_type) => User, (user) => user.activitiesOrganising)
  owner: User;

  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @VersionColumn()
  version: number;
}
