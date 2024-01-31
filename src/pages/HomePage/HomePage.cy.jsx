// cypress/integration/HomePage.spec.js

import React from "react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";

describe("HomePage Tests", () => {
  it("Renders HomePage correctly", () => {
    const searchValue = "Bentley";
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage searchValue={searchValue} />
        </BrowserRouter>
      </Provider>
    );
    // Sayfanın doğru bir şekilde render edildiğini kontrol et
    cy.contains("Sort By").should("exist");
    cy.contains("Brands").should("exist");
    cy.contains("Model").should("exist");
    cy.get(".ant-pagination-item").should("exist"); // Sayfa numaralandırma kontrolü
  });

  it("Product List Data is fetched correctly", () => {
    const searchValue = "Bentley";
    
    // Mount the component
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage searchValue={searchValue} />
        </BrowserRouter>
      </Provider>
    );

    if (window.Cypress) {
      window.store = store
    }

    cy.window().its('store').invoke('getState').its("getAllProducts.data").should("not.be.null")
  });

  it("Applies Search filters and updates product list", () => {
    const searchValue = "Bentley";
    
    // Mount the component
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage searchValue={searchValue} />
        </BrowserRouter>
      </Provider>
    );
    if (window.Cypress) {
      window.store = store
    }

    cy.window().its('store').invoke('getState').its("getProductsByFilter.data").should("not.be.null")
  
   
  });

  it("Applies filters and updates product list for Brands", () => {
    const searchValue = "Bentley";

    // Mount the component
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage searchValue={searchValue} />
        </BrowserRouter>
      </Provider>
    );

    // Select some brands in CheckBoxGroup
    cy.contains("Brands").click();
    cy.get(".ant-checkbox-input").check("Lamborghini"); // Replace with the actual label of the brand

    // Check if getProductsByFilterData changes
    cy.window()
      .its("store")
      .invoke("getState")
      .its("getProductsByFilter.data")
      .should("not.be.null");
  });

  it("Applies filters and updates product list for Models", () => {
    const searchValue = "Bentley";

    // Mount the component
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage searchValue={searchValue} />
        </BrowserRouter>
      </Provider>
    );

    // Select some models in CheckBoxGroup
    cy.contains("Model").click();
    cy.get(".ant-checkbox-input").check("CTS"); // Replace with the actual label of the model

    // Check if getProductsByFilterData changes
    cy.window()
      .its("store")
      .invoke("getState")
      .its("getProductsByFilter.data")
      .should("not.be.null");
  });
  
});
