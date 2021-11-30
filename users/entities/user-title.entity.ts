import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity({ name: 'user_title' })
@Unique('UQ_USER-TITLE_SHORT-NAME', ['shortName'])
export class UserTitle extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'short_name', length: 10, unique: true })
  shortName: string;

  @Column()
  name: string;

  @Column({ type: 'integer', default: 0 })
  seq: number;

  @OneToMany((_type) => User, (user) => user.title, { eager: false })
  users: User[];

  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @VersionColumn()
  version: number;
}
