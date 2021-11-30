import { Geometry } from 'geojson';
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

import { User } from '../users/entities/user.entity';

const origin = {
  type: 'Point',
  coordinates: [0, 0],
};

@Entity({ name: 'uk-town' })
@Unique('UQ_uk-town', ['place', 'county', 'country', 'postCode', 'gridRef'])
export class UkTown extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  place: string;

  @Column()
  county: string;

  @Column()
  country: string;

  @Column({ name: 'post-code' })
  postCode: string;

  @Column()
  gridRef: string;

  @Column({ type: 'decimal', precision: 8, scale: 5 })
  lat: number;

  @Column({ type: 'decimal', precision: 8, scale: 5 })
  lng: number;

  @Column({
    type: 'geometry',
    nullable: true,
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: Geometry;

  @Column()
  easting: number;

  @Column()
  northing: number;

  @Column()
  region: string;

  @Column()
  category: string;

  @OneToMany(() => User, (user: User) => user.town)
  users: User[];

  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @VersionColumn()
  version: number;

  setLocation(lat: number, lng: number): void {
    this.location = {
      type: 'Point',
      coordinates: [lng, lat],
    };
  }
}
