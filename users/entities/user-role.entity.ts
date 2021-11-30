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

@Entity('user-roles')
@Unique('UQ_USER-ROLE-ENTITY_ROLE-CODE', ['roleCode'])
export class UserRoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  roleCode: string;

  @Column()
  roleName: String;

  @Column()
  seq: number;

  @OneToMany((_type) => User, (user) => user.role, { eager: false })
  users: User[];

  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @VersionColumn()
  version: number;
}
