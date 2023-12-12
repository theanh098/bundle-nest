import type { Config } from "jest";

const config: Config = {
  moduleFileExtensions: ["js", "json", "ts"],
  modulePaths: ["."],
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s?$": "ts-jest"
  },
  collectCoverageFrom: ["src/server/**/*.(t|j)s"],
  coveragePathIgnorePatterns: ["src/server/console", "src/server/migration"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    "@root/(.*)": "<rootDir>/src/$1"
  }
};

export default config;
