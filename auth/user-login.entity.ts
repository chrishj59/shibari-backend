import * as bcrypt from 'bcrypt';
import { Expose } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { User } from '../users/entities/user.entity';

export enum UserRole {
  ADMIN = 'admin',
  PAID = 'paid',
  FREE = 'free',
}
@Entity('user_logins')
export class UserLogin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ name: 'login_name', unique: true })
  @Expose()
  loginName: string;

  @Column()
  password: string;

  @Column({ name: 'last_login' })
  @Expose()
  lastLogin: Date;

  @Column()
  @Expose()
  locked: boolean;

  @Column({ name: 'failed_logins', type: 'integer', default: 0 })
  @Expose()
  failedLogins: number;

  @Column({ nullable: true })
  public currentHashedRefreshToken: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.FREE,
  })
  @Expose()
  role: UserRole;
  @OneToOne(() => User, (user: User) => user.userLogin)
  public user: User;
  // @OneToOne((_type) => User, (user) => user.userLogin)
  // user?: User;

  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @VersionColumn()
  version: number;

  async validatePassword(pass: string): Promise<boolean> {
    return bcrypt.compare(pass, this.password);
  }
}
