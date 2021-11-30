import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity({ name: 'ds-relationships' })
@Unique('UQ_DSRELATIONSHIP_RELATIONSHIP', ['relationship'])
export class DsRelationship extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  relationship: string;

  @Column({ default: false })
  hasOtherPerson: boolean;

  @ManyToMany(() => User, (user) => user.relationships)
  users: User[];

  @Column()
  seq: number;

  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @VersionColumn()
  version: number;
}
