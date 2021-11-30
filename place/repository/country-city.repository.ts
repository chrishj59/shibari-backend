import { EntityRepository, Repository } from 'typeorm';

import { CountryCity } from '../entity/CountryCity.entity';

@EntityRepository(CountryCity)
export class CountryCityRepository extends Repository<CountryCity> {}
