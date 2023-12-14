import { Test } from "@nestjs/testing";
import { Effect as E } from "effect";

import { AppModule } from "@root/app.module";
import { CountryController } from "@root/country/country.controller";
import { CountryService } from "@root/country/country.service";
import type { Country } from "@root/shared/IO/Country.io";

describe("CatsController", () => {
  let countryController: CountryController;
  let countryService: CountryService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [CountryController],
      providers: [CountryService]
    }).compile();

    countryService = moduleRef.get<CountryService>(CountryService);
    countryController = moduleRef.get<CountryController>(CountryController);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getCountry", () => {
    it("should return a country correctly", async () => {
      const mockCountry: Country = { id: 1, name: "india" };

      jest
        .spyOn(countryService, "getCountry")
        .mockImplementation(() => E.succeed(mockCountry));

      expect(await countryController.getCountry(1)).toEqual(mockCountry);
    });
  });
});
