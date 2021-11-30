import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { UserFetishMap } from './user-fetish-map.entity';

@Entity({ name: 'fetishes' })
export class Fetish extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: 0 })
  seq: Number;

  @OneToMany((type) => UserFetishMap, (fetishMap) => fetishMap.fetish)
  fetishMaps: UserFetishMap[];

  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @VersionColumn()
  version: number;
}
