import { assertEffect } from "@test-helper/assert-effect";
import { DbTestingClient } from "@test-helper/database.test.client";
import { eq } from "drizzle-orm";

import { city } from "@root/shared/database/models/city.model";
import { country } from "@root/shared/database/models/country.model";
import { CityRepository } from "@root/shared/database/repositories/city.repository";
import { DatabaseQueryError } from "@root/shared/errors/database-query.error";

describe("CityRepository", () => {
  const client = new DbTestingClient();
  let cityRepository: CityRepository;

  beforeAll(() => {
    cityRepository = new CityRepository(client.database);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    client.disconnect();
  });

  describe("findById", () => {
    describe("happy path", () => {
      beforeEach(async () => {
        await client.database.insert(country).values({
          name: "India",
          id: 1
        });

        await client.database.insert(city).values({
          countryId: 1,
          id: 1,
          name: "Mumbai",
          popularity: "popular"
        });
      });

      afterEach(async () => {
        await client.database.delete(city).where(eq(city.id, 1));
        await client.database.delete(country).where(eq(country.id, 1));
      });

      it("should return correct city", () => {
        assertEffect(cityRepository.findById(1))(
          () => {
            throw Error("unexpected error");
          },
          city =>
            expect(city).toEqual({
              countryId: 1,
              id: 1,
              name: "Mumbai",
              popularity: "popular"
            })
        );
      });
    });

    describe("negative path", () => {
      it("should return DatabaseQueryError", () => {
        jest
          .spyOn(client.database.query.city, "findFirst")
          .mockRejectedValue(Error("query err"));

        assertEffect(cityRepository.findById(1))(
          error => expect(DatabaseQueryError.isInfer(error)).toBeTruthy(),
          () => {
            throw Error("unexpected success");
          }
        );
      });
    });
  });
});
