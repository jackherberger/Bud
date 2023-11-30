/* eslint-disable no-undef */
import cy from "cypress";
describe("The home page", () => {
  it("successfully loads", () => {
    cy.visit("/");
  });
});
