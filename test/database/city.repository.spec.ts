import { eq } from "drizzle-orm";
import { Effect, Either, pipe } from "effect";
import { testDatabase } from "test-helper/database.test.client";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  suite,
  vi
} from "vitest";

import { city } from "@root/shared/database/models/city.model";
import { country } from "@root/shared/database/models/country.model";
import { CityRepository } from "@root/shared/database/repositories/city.repository";
import { DatabaseQueryError } from "@root/shared/errors/database-query.error";

describe("CityRepository", () => {
  let cityRepository: CityRepository;

  beforeAll(() => {
    cityRepository = new CityRepository(testDatabase);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  suite("findById", () => {
    describe("happy path", () => {
      beforeEach(async () => {
        await testDatabase.insert(country).values({
          name: "India",
          id: 1
        });

        await testDatabase.insert(city).values({
          countryId: 1,
          id: 1,
          name: "Mumbai",
          popularity: "popular"
        });
      });

      afterEach(async () => {
        await testDatabase.delete(city).where(eq(city.id, 1));
        await testDatabase.delete(country).where(eq(country.id, 1));
      });

      it("should return correct city", () => {
        pipe(cityRepository.findById(1), Effect.either, Effect.runPromise).then(
          Either.match({
            onLeft: () => {
              throw Error("unexpected error");
            },
            onRight: city => {
              expect(city).toEqual({
                countryId: 1,
                id: 1,
                name: "Mumbai",
                popularity: "popular"
              });
            }
          })
        );
      });
    });

    describe("negative path", () => {
      it("should return DatabaseQueryError", () => {
        vi.spyOn(testDatabase.query.city, "findFirst").mockRejectedValue(
          new Error("query err")
        );
        pipe(cityRepository.findById(1), Effect.either, Effect.runPromise).then(
          Either.match({
            onLeft: error => {
              expect(DatabaseQueryError.isInfer(error)).toBeTruthy();
            },
            onRight: () => {
              throw new Error("unexpected success");
            }
          })
        );
      });
    });
  });
});
