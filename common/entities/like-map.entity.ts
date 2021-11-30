import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { Comment } from '../../comment/comment.entity';
import { LikeTypeEnum } from '../../enums/LikeType.enum';
import { User } from '../../users/entities/user.entity';

@Entity('likes-map')
@Unique('UQ_COMMENT', ['likeType', 'commentLikeUser', 'likeComment'])
export class LikeMap extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'emjoi' })
  emjoi: string;

  @Column({
    name: 'like-for',
    type: 'enum',
    enum: LikeTypeEnum,
  })
  likeType: LikeTypeEnum;

  @ManyToOne((_type) => User, (user) => user.commentLikes)
  commentLikeUser: User;

  @ManyToOne((_type) => Comment, (comment) => comment.like)
  likeComment: Comment;

  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @VersionColumn()
  version: number;
}
