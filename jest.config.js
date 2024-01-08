const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const config = {
  coverageProvider: 'v8',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/.*/**',
    '!**/*.config.*',
    '!**/coverage/**',
    '!next-env.d.ts',
    '!<rootDir>/e2e/**',
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['json'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/e2e'],
}

module.exports = createJestConfig(config)
