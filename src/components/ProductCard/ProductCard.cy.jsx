// cypress/integration/ProductCard.spec.js

import { BrowserRouter } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

describe("ProductCard Component Tests", () => {
  it("Renders ProductCard component correctly", () => {
    const product = {
      id: 1,
      name: "Sample Product",
      price: 10.99,
      image: "sample-image-url",
    };

    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={product} />
        </BrowserRouter>
      </Provider>
    );

    // Bileşenin render edilen içeriğini kontrol et
    cy.contains(`${product.price} ₺`).should("exist");
    cy.contains(product.name).should("exist");
  });

 

  it('Triggers addToBasket action when "Add to Cart" button is clicked', () => {
  const product = {
    id: 1,
    price: 10.99,
  };

  // ProductCard'ı mount et
  cy.mount(
    <Provider store={store}>
      <BrowserRouter>
        <ProductCard product={product} />
      </BrowserRouter>
    </Provider>
  );

  // Check that localStorage does not contain the item initially
  cy.window().its('localStorage').should('be.empty');

  // "Add to Cart" butonuna tıkla ve Redux store'ı kontrol et
  cy.contains("Add to Cart").click();

  // Wait for a brief moment to allow async operations to complete
  cy.wait(500); // Adjust the duration as needed

  // Check that localStorage now contains the added item
  cy.window().its('localStorage').should((localStorage) => {
    const basketItems = JSON.parse(localStorage.getItem('basket')) || [];
    expect(basketItems).to.deep.include({ ...product, quantity: 1 });
  });
});



  it('Navigates to product details page when clicked ', () => {
    const product = {
      id: 1,
      name: "Sample Product",
      price: 10.99,
      image: "sample-image-url",
    };

    // ProductCard'ı mount et
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={product} />
        </BrowserRouter>
      </Provider>
    );

    // "Add to Cart" butonu dışındaki bileşenin tıklandığında, navigate işlevini kontrol et
    cy.get(".flex.flex-col").click();

    // Navigate işleminin doğru URL'ye yapıldığını kontrol et
    cy.url().should("include", `/${product.id}`);
  });
});
