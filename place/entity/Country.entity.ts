import { Geometry } from 'geojson';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { LangIso639 } from '../../common/entities/Iso_639_lang.entity';
import { CountryLangMap } from './country-lang-map.entity';
import { CountryCity } from './CountryCity.entity';
import { CountryState } from './CountryState.entity';

@Entity({ name: 'country_geo' })
export class Country extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  //
  @ManyToMany(() => LangIso639, (lang) => lang)
  @JoinColumn()
  languages: LangIso639[];

  @Column({ name: 'lang_code', nullable: true })
  langCode: string;

  @Column({ name: 'lang_name', nullable: true })
  langName: string;

  @Column()
  iso3: string;

  @Column()
  iso2: string;

  @Column({ name: 'numeric_code' })
  numericCode: number;

  @Column({ name: 'phone_code' })
  phoneCode: string;

  @Column()
  capital: string;

  @Column()
  currency: string;

  @Column({ name: 'currency_symbol' })
  currencySymbol: string;

  @Column()
  tld: string;

  @Column()
  region: string;

  @Column({ name: 'sub_region' })
  subRegion: string;

  @Column()
  timezones: string;

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

  @Column()
  emoji: string;

  @Column()
  emojiu: string;

  @OneToMany((_type) => CountryLangMap, (country) => country.langCode)
  langCountries: CountryLangMap[];

  @OneToMany((_type) => CountryState, (state) => state.country)
  countryStates: CountryState[];

  @OneToMany((type) => CountryCity, (city) => city.country)
  cities: CountryCity[];

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
