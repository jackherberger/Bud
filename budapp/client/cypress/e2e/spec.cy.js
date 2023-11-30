/* eslint-disable no-undef */

describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });
});

describe("The home page", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:3000/");
  });
});

describe("The login page + transaction page", () => {
  it("let's us login and add a transaction", () => {
    const testdata = {
      username: "horse@gamil",
      password: "ppopeede",
    };
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="username"]').type(testdata.username);
    cy.get('input[name="password"]').type(testdata.password);
    cy.get('button[value="Login"]').click();
    cy.url().should("include", "/transactions");

    const transactiondata = {
      name: "toilet paper",
      price: "100",
      date: "2023-05-16",
      category: "Groceries",
    };
    cy.get('input[name="name"]').type(transactiondata.name);
    cy.get('input[name="price"]').type(transactiondata.price);
    cy.get('input[name="date"]').type(transactiondata.date);
    cy.get('select[name="category"]').type(transactiondata.category);
    cy.get('button[value="Add"]').click();
    cy.get("tbody > tr:last-child > td:first-of-type").should(
      "contain",
      transactiondata.name
    );
  });
});

describe("The signup page", () => {
  // this data will need to be changed after each test
  const signupdata = {
    email: "iloo@calpoly.edu",
    firstName: "Ian",
    lastName: "Loo",
    password: "igloo12345",
    confirmPassword: "igloo12345",
  };
  it("let's us signup for an account", () => {
    cy.visit("http://localhost:3000/signup");
    cy.get('input[name="email"]').type(signupdata.email);
    cy.get('input[name="firstName"]').type(signupdata.firstName);
    cy.get('input[name="lastName"]').type(signupdata.lastName);
    cy.get('input[name="password"]').type(signupdata.password);
    cy.get('input[name="confirmPassword"]').type(signupdata.confirmPassword);
    cy.get('button[value="signup"]').click();
  });
});

describe("The account page", () => {
  const accountdata = {};
  cy.visit("http://localhost:3000/account");
});
