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

@Entity({ name: 'relationships' })
@Unique('UQ_USER-RELATIONSHIP_RELATIONSHIP', ['relationship'])
export class Relationship extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  relationship: string;

  @Column({ default: false })
  hasOtherPerson: boolean;

  @Column()
  seq: number;

  @ManyToMany(() => User, (user) => user.relationships)
  users: User[];

  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @VersionColumn()
  version: number;
}
