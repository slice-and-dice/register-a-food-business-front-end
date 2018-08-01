module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/src/__mocks__/styleMock.js",
    "path.json": "<rootDir>/src/__mocks__/pathMock.json",
    "schema.js": "<rootDir>/src/__mocks__/schemaMock.js"
  },
  collectCoverageFrom: [
    "src/**/*.{js}",
    "pages/**/*.{js}",
    "!**/node_modules/**",
    "!**/jest.config.js",
    "!**/jest.setup.js",
    "!**/next.config.js",
    "!**/coverage/**/*.{js}",
    "!**/pages/_document.js",
    "!**/services/schema.js",
    "!**/.next/**/*.{js}",
    "!**/vars.js",
    "!src/server/index.js",
    "!src/server/config.js",
    "!src/components/index.js",
    "!src/**/*.double.js",
    "!tests/**/*.js"
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: -10
    }
  }
};
