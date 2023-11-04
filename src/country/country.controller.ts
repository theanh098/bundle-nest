import { Controller, Get, Param } from "@nestjs/common";

import { genericPromise } from "@root/shared/helpers/generic-promise";
import type { Country } from "@root/shared/IO/Country";
import type { PaginateResponse } from "@root/shared/IO/Paginate";

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
