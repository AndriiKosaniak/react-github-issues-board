import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    watchForFileChanges: false,
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:3000",
    viewportWidth: 1920,
    viewportHeight: 1080,
    downloadsFolder: "cypress/downloads",
  },
});
