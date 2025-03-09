module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.js'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
};