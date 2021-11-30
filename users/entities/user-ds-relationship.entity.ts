import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity({ name: 'user-ds-realtionships' })
@Unique('UQ_DS-RELATIONSHIP_RELATIONSHIP', ['relationship'])
export class UserDsRelationship extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  relationship: string;

  @Column()
  seq: number;

  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @VersionColumn()
  version: number;
}
