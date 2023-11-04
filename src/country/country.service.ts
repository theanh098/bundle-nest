import { Injectable } from "@nestjs/common";

import { CountryRepository } from "@root/shared/database/repositories/country.repository";

@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  public getCountry(id: number) {
    return this.countryRepository.findById(id);
  }

  public getCountryList() {
    return this.countryRepository.find();
  }
}
