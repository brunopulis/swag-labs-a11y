import { defineConfig } from 'cypress';
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',

    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },

    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    video: false,
    screenshotOnRunFailure: true,

    env: {
      allure: true,
      axeIgnoreContrast: true,
    },
  },

  retries: {
    runMode: 2,
    openMode: 0,
  },
});
