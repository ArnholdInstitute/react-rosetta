module.exports = {
  verbose: true,
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  setupTestFrameworkScriptFile: '<rootDir>/setupTests.js',
};