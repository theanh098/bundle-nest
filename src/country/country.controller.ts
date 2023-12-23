import { Controller, Get, Param } from "@nestjs/common";

import { genericApi } from "@root/shared/helpers/generic-api.helper";
import type { Country } from "@root/shared/IO/Country.io";
import type { PaginateResponse } from "@root/shared/IO/Paginate.io";

import { CountryService } from "./country.service";

@Controller("country")
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  getCountryList(): Promise<PaginateResponse<Country>> {
    return genericApi(this.countryService.getCountryList());
  }

  @Get(":id")
  getCountry(@Param("id") id: number) {
    return genericApi(this.countryService.getCountry(+id));
  }
}
