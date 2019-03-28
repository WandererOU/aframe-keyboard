module.exports = function(config) {
  config.set({
    basePath: '',
    browserify: {
      debug: true,
      paths: ['src'],
      transform: ['browserify-istanbul'],
    },
    client: {
      captureConsole: true,
      mocha: {ui: 'tdd', timeout: 3000},
    },
    envPreprocessor: [
      'TEST_ENV',
    ],
    browserNoActivityTimeout: 1000000,
    frameworks: ['mocha', 'sinon-chai', 'chai-shallow-deep-equal', 'browserify'],
    files: [
      {pattern: './tests/i18n.test.js'},
      {pattern: './tests/keyboardTemplate.test.js'},
      {pattern: './tests/**/*.test.js', included: false},
    ],
    // list of files / patterns to exclude
    exclude: [
    ],
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'tests/**/*.js': ['browserify', 'env'],
      'tests/*.js': ['browserify', 'env'],
      'src/**/*.js': 'coverage',
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Firefox', 'Chrome'],
    singleRun: false,
    concurrency: Infinity,
  });
};
