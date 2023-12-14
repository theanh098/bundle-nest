import { DbTestingClient } from "@test-helper/database.test.client";
import { eq } from "drizzle-orm";

import { city } from "@root/shared/database/models/city.model";
import { country } from "@root/shared/database/models/country.model";
import { CountryRepository } from "@root/shared/database/repositories/country.repository";
import { DatabaseQueryError } from "@root/shared/errors/database-query.error";
import { assertEffect } from "@test-helper/assert-effect";

describe("CountryRepository", () => {
  const client = new DbTestingClient();
  let countryRepository: CountryRepository;

  beforeAll(() => {
    countryRepository = new CountryRepository(client.database);
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
          name: "Mumbai"
        });
      });

      afterEach(async () => {
        await client.database.delete(city).where(eq(city.countryId, 1));
        await client.database.delete(country).where(eq(country.id, 1));
      });

      it("should return correct country", () => {
        assertEffect(countryRepository.findById(1))(
          () => {
            throw new Error("unexpected error");
          },
          country =>
            expect(country).toEqual({
              name: "India",
              id: 1,
              cities: [{ name: "Mumbai" }]
            })
        );
      });
    });

    describe("negative path", () => {
      it("should return database query error", () => {
        jest
          .spyOn(client.database.query.country, "findFirst")
          .mockRejectedValue(new Error("query err"));

        assertEffect(countryRepository.findById(1))(
          e => {
            expect(DatabaseQueryError.isInfer(e)).toBeTruthy();
          },
          () => {
            throw Error("unexpected succeed");
          }
        );
      });
    });
  });
});
