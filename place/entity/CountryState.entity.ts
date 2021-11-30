import { Geometry } from 'geojson';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { Country } from '../entity/Country.entity';
import { CountryCity } from './CountryCity.entity';

@Entity({ name: 'country_state' })
export class CountryState extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  //@Column({ name: 'country_id' })
  @ManyToOne((_type) => Country, (country) => country.id)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  // Shoule be 1 to many
  @OneToMany((type) => CountryCity, (city) => city.state)
  cities: CountryCity[];

  @Column({ name: 'country_code' })
  countryCode: string;

  @Column({ name: 'state_code' })
  stateCode: string;

  @Column()
  type: string;

  @Column({
    name: 'latitude',
    type: 'decimal',
    precision: 8,
    scale: 5,
    nullable: true,
  })
  lat: number;

  @Column({
    name: 'longitude',
    type: 'decimal',
    precision: 8,
    scale: 5,
    nullable: true,
  })
  lng: number;

  @Column({
    type: 'geometry',
    nullable: true,
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: Geometry;

  setLocation(lat: number, lng: number): void {
    this.location = {
      type: 'Point',
      coordinates: [lng, lat],
    };
  }

  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @VersionColumn()
  version: number;
}
