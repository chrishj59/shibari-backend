import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { Fetish } from './fetish.entity';
import { User } from './user.entity';

@Entity({ name: 'user-fetish-map' })
@Index(['giveLevel', 'receiveLevel'], { unique: true })
export class UserFetishMap extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'give_fetish_level', nullable: true })
  giveLevel: string;

  @Column({ name: 'receive_fetish_level', nullable: true })
  receiveLevel: string;

  @ManyToOne((type) => User, (user) => user.fetishMaps)
  user: User;

  @ManyToOne((type) => Fetish, (fetish) => fetish.fetishMaps)
  fetish: Fetish;

  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @VersionColumn()
  version: number;
}
