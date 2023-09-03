const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'k9zg4c',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: false,
  },
});
