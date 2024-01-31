import React from "react";
import Header from "./Header";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { BrowserRouter } from "react-router-dom";
describe("<Header />", () => {
  it("renders correctly Header", () => {
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Header searchValue="Bentley" />
        </BrowserRouter>
      </Provider>
    );
    

    it("navigates to home page when logo is clicked", () => {
      cy.mount(
        <Provider store={store}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </Provider>
      );
      cy.get(
        ".lg\\:col-span-1.col-span-2.text-white.xl\\:text-3xl.md\\:text-2xl.text-lg.hover\\:text-blue-900.duration-200.font-bold"
      ).click();
      cy.location("pathname").should("eq", "/");
    });
  });

  
});
