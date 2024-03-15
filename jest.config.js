
const { defaults } = require('jest-config');

module.exports = {
  clearMocks: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: [
    '**/tests/*Test.js',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    "^.+\\.(css|scss|svg|png|jpg|woff2)$": "jest-transform-stub",
  },
  transformIgnorePatterns: [`/node_modules/(?!(ckeditor5|@ckeditor|lodash-es|vanilla-colorful)/)`],
};