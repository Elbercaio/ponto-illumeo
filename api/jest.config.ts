/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    'node_modules',
    'index.ts',
    '.model.ts',
    '.dto.ts',
    '.interface.ts',
    '.enum.ts',
    '<rootDir>/src/index.ts',
  ],
  moduleNameMapper: {
    '@shared': ['<rootDir>/src/shared/index.ts'],
  },
};
