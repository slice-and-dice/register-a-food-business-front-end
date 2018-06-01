module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/__mocks__/styleMock.js",
    "path.json": "<rootDir>/__mocks__/pathMock.json"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js}",
    "!**/node_modules/**",
    "!**/jest.config.js",
    "!**/jest.setup.js",
    "!**/next.config.js",
    "!**/coverage/**/*.{js}",
    "!**/.next/**/*.{js}",
    "!**/vars.js"
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: -10
    }
  }
};
