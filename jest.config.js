const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import("jest").Config} */
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/e2e'],
}

module.exports = createJestConfig(config)
