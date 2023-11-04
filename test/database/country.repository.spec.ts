import { eq } from "drizzle-orm";
import { Effect, Either, flow, pipe } from "effect";
import { testDatabase } from "test-helper/database.test.client";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from "vitest";

import { country } from "@root/shared/database/models/country.model";
import { CountryRepository } from "@root/shared/database/repositories/country.repository";
import { DatabaseQueryError } from "@root/shared/errors/database-query-error";

describe("CountryRepository", () => {
  let countryRepository: CountryRepository;

  beforeAll(() => {
    countryRepository = new CountryRepository(testDatabase);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("findById", () => {
    beforeEach(async () => {
      await testDatabase.insert(country).values({
        name: "India",
        id: 1
      });
    });

    afterEach(async () => {
      await testDatabase.delete(country).where(eq(country.id, 1));
    });

    describe("happy path", () => {
      it("should return correct country", () => {
        pipe(countryRepository.findById(1), Effect.runPromise)
          .then(data =>
            expect(data).toEqual({
              name: "India",
              id: 1
            })
          )
          .catch(() => Error("unexpected error"));
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
          flow(
            Either.match({
              onRight: () => {
                throw Error("unexpected succeed");
              },
              onLeft: e => expect(DatabaseQueryError.isBounded(e)).toBe(true)
            })
          )
        );
      });
    });
  });
});
