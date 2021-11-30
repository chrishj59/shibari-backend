import { Expose } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { Activity } from '../activity/activity.entity';
import { LikeMap } from '../common/entities/like-map.entity';
import { User } from '../users/entities/user.entity';

@Entity('comments')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ name: 'title', length: 50 })
  title: string;

  @Column({ name: 'comment_body' })
  body: string;

  @ManyToOne((_type) => User, (user) => user.comments)
  createdBy: User;

  @ManyToOne((_type) => Activity, (activity) => activity.comments)
  activity: Activity;

  @ManyToOne((_type) => LikeMap, (like) => like.likeComment)
  like: LikeMap;

  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @VersionColumn()
  version: number;
}
