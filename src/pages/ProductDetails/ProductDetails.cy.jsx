import { Provider } from "react-redux";
import ProductDetails from "./ProductDetails";
import { store } from "../../redux/store";
import { BrowserRouter } from "react-router-dom";

describe("HomePage Tests", () => {
  it("Renders HomePage correctly", () => {

    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <ProductDetails productId={1} />
        </BrowserRouter>
      </Provider>
    );

    cy.contains("Add to Cart").should("exist");
    cy.get("h1").should("exist"); // Örnek olarak başlık elementini kontrol et
    cy.get("p").should("exist");
  });

  it("Product Details Data is fetched correctly", () => {
    cy.mount(
        <Provider store={store}>
          <BrowserRouter>
            <ProductDetails productId={1} />
          </BrowserRouter>
        </Provider>
      );
      if (window.Cypress) {
        window.store = store
      }

      cy.window().its('store').invoke('getState').its("getProductDetails.data").should("not.be.null")
  });


  it("Triggers addToBasket action when Add to Cart button is clicked", () => {

    const productId = 1;

      cy.mount(
        <Provider store={store}>
          <BrowserRouter>
            <ProductDetails productId={productId} />
          </BrowserRouter>
        </Provider>
      );

      cy.window().its('localStorage').should('be.empty');

      cy.contains("Add to Cart").click();

      cy.window().its('localStorage').then(localStorage => {
        expect(localStorage).to.have.property("basket");
      
        const basketData = JSON.parse(localStorage.basket);
        const addedProduct = parseFloat(basketData[0].id)
      
        expect(addedProduct).to.equal(productId);
      });

  });

});
