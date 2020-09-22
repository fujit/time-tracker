module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['./src'],
  testPathIgnorePatterns: ['.next/', './node_modules/'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
    NODE_ENV: 'test',
  },
}
