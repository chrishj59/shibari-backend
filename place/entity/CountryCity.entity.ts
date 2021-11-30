import { Geometry } from 'geojson';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { Country } from './Country.entity';
import { CountryState } from './CountryState.entity';

@Entity({ name: 'country_city' })
export class CountryCity extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  //@Column({ name: 'state_id' })
  @ManyToOne((type) => CountryState, (state) => state.cities)
  @JoinColumn({ name: 'state_id' })
  state: CountryState;

  @Column({ name: 'state_code' })
  stateCode: string;

  @ManyToOne((_type) => Country, (country) => country.cities)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @Column({ name: 'country_code' })
  countryCode: string;

  @Column({ name: 'latitude', type: 'decimal', precision: 8, scale: 5 })
  lat: number;

  @Column({ name: 'longitude', type: 'decimal', precision: 8, scale: 5 })
  lng: number;

  @Column({
    type: 'geometry',
    nullable: true,
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: Geometry;

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
