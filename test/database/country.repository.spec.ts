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

import { country } from "@root/shared/database/models/country.model";
import { CountryRepository } from "@root/shared/database/repositories/country.repository";
import { DatabaseQueryError } from "@root/shared/errors/database-query.error";
import { city } from "@root/shared/database/models/city.model";

describe("CountryRepository", () => {
  let countryRepository: CountryRepository;

  beforeAll(() => {
    countryRepository = new CountryRepository(testDatabase);
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
          name: "Mumbai"
        });
      });

      afterEach(async () => {
        await testDatabase.delete(city).where(eq(city.countryId, 1));
        await testDatabase.delete(country).where(eq(country.id, 1));
      });

      it("should return correct country", () => {
        pipe(
          countryRepository.findById(1),
          Effect.either,
          Effect.runPromise
        ).then(
          Either.match({
            onLeft: () => {
              throw new Error("unexpected error");
            },
            onRight: country => {
              expect(country).toEqual({
                name: "India",
                id: 1,
                cities: [{ name: "Mumbai" }]
              });
            }
          })
        );
      });
    });

    describe("negative path", () => {
      it("should return database query error", () => {
        vi.spyOn(testDatabase.query.country, "findFirst").mockRejectedValue(
          new Error("query err")
        );

        pipe(
          countryRepository.findById(1),
          Effect.either,
          Effect.runPromise
        ).then(
          Either.match({
            onRight: () => {
              throw Error("unexpected succeed");
            },
            onLeft: e => {
              expect(DatabaseQueryError.isInfer(e)).toBeTruthy();
            }
          })
        );
      });
    });
  });
});
