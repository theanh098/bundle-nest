import type { Config } from "jest";

const config: Config = {
  projects: [
    {
      displayName: "Serial",
      testMatch: ["**/test/**/*.serial.spec.ts"],
      runner: "jest-serial-runner",
      moduleFileExtensions: ["js", "json", "ts"],
      transform: {
        "^.+\\.(t|j)s?$": "ts-jest"
      },
      testEnvironment: "node",
      moduleNameMapper: {
        "@root/(.*)": "<rootDir>/src/$1",
        "@test/(.*)": "<rootDir>/test/$1",
        "@test-helper/(.*)": "<rootDir>/test-helper/$1"
      }
      // modulePaths: ["."]
      // collectCoverageFrom: ["src/server/**/*.(t|j)s"],
      // coveragePathIgnorePatterns: [
      //   "src/server/console",
      //   "src/server/migration"
      // ],
      // coverageDirectory: "coverage",
    },
    {
      displayName: "Parallel",
      testMatch: ["**/test/**/!(*.serial).spec.ts"],
      moduleFileExtensions: ["js", "json", "ts"],
      transform: {
        "^.+\\.(t|j)s?$": "ts-jest"
      },
      testEnvironment: "node",
      moduleNameMapper: {
        "@root/(.*)": "<rootDir>/src/$1",
        "@test/(.*)": "<rootDir>/test/$1",
        "@test-helper/(.*)": "<rootDir>/test-helper/$1"
      }
      // modulePaths: ["."],
      // collectCoverageFrom: ["src/server/**/*.(t|j)s"],
      //   coveragePathIgnorePatterns: [
      //     "src/server/console",
      //     "src/server/migration"
      //   ],
      //   coverageDirectory: "coverage",
    }
  ]
};

export default config;
