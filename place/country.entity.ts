import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 2 })
  lang: string;

  @Column({ name: 'lang_name' })
  lang_name: string;

  @Column({ length: 2, type: 'varchar', name: 'code_alpha_2', unique: true })
  code_alpha2: string;

  @Column({ type: 'varchar', length: 3, name: 'code_alpha_3', unique: true })
  code_alpha3: string;

  @Column({ unique: true })
  code_numeric: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @VersionColumn()
  version: number;
}
