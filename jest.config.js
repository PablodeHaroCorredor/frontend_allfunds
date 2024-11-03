module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$",
    },
  },
  transform: {
    "^.+\\.(ts|html)$": "ts-jest",
  },
  moduleNameMapper: {
    "^src/(.*)": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
};
