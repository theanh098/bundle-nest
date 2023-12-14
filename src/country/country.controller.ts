import { Controller, Get, Param } from "@nestjs/common";

import { genericPromise } from "@root/shared/helpers/generic-promise.helper";
import type { Country } from "@root/shared/IO/Country.io";
import type { PaginateResponse } from "@root/shared/IO/Paginate.io";

import { CountryService } from "./country.service";

@Controller("country")
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  getCountryList(): Promise<PaginateResponse<Country>> {
    return genericPromise(this.countryService.getCountryList());
  }

  @Get(":id")
  getCountry(@Param("id") id: number) {
    return genericPromise(this.countryService.getCountry(+id));
  }
}
