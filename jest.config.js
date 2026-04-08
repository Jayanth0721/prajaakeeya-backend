module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testRegex: ".*\\.spec\\.ts$",
  watchman: false,
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["src/**/*.ts", "!src/main.ts", "!src/**/*.entity.ts"],
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
};
