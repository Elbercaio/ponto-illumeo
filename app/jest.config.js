/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  testMatch: ['**/+(*.)+(spec).+(tsx)?(x)'],
  transform: { '^.+\\.(ts|js|html|tsx)$': 'ts-jest' },
  moduleNameMapper: {
    '\\.(css|scss|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['node_modules', 'index.ts', '.interface.ts', '.enum.ts', '.scss', '<rootDir>/src/index.ts'],
};
