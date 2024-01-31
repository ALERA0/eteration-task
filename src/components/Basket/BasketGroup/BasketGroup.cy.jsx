// BasketGroup.cy.jsx
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";
import BasketGroup from "./BasketGroup";

describe('BasketGroup', () => {
  it("Renders BasketGroup component correctly", () => {
    const item = {
      id: 1,
      name: "Sample Product",
      price: 10.99,
      image: "sample-image-url",
    };

    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <BasketGroup item={item} />
        </BrowserRouter>
      </Provider>
    );

    // Bileşenin render edilen içeriğini kontrol et
    cy.contains(`${item.price}`).should("exist");
    cy.contains(item.name).should("exist");
  });


    it('Triggers addToBasket action when "+" button is clicked', () => {
        const item = {
            id: 1,
            name: "Sample Product",
            price: 10.99,
            image: "sample-image-url",
          };

          cy.mount(
            <Provider store={store}>
              <BrowserRouter>
                <BasketGroup item={item} />
              </BrowserRouter>
            </Provider>
          );


          cy.contains("+").click();

          cy.contains("+").click();


          cy.wait(500);

          cy.window().its('localStorage').should((localStorage) => {
            const basketItems = JSON.parse(localStorage.getItem('basket')) || [];
            expect(basketItems).to.deep.include({ ...item, quantity: 2 });
          });
    });

    it('Triggers removeFromBasket action when "-" button is clicked', () => {
        const item = {
            id: 1,
            name: "Sample Product",
            price: 10.99,
            image: "sample-image-url",
          };

          cy.mount(
            <Provider store={store}>
              <BrowserRouter>
                <BasketGroup item={item} />
              </BrowserRouter>
            </Provider>
          );


          cy.contains("-").click();

          


          cy.wait(500);

          cy.window().its('localStorage').should((localStorage) => {
            const basketItems = JSON.parse(localStorage.getItem('basket')) || [];
            expect(basketItems).to.deep.include({ ...item, quantity: 1 });
          });
    });

    it('Triggers removeFromBasket action when quantity equal to 1 and  "-" button is clicked', () => {
        const item = {
            id: 1,
            name: "Sample Product",
            price: 10.99,
            image: "sample-image-url",
          };

          cy.mount(
            <Provider store={store}>
              <BrowserRouter>
                <BasketGroup item={item} />
              </BrowserRouter>
            </Provider>
          );


          cy.contains("-").click();

          


          cy.wait(500);

          cy.window().its('localStorage').should((localStorage) => {
            const basketItems = localStorage.getItem('basket') 
            expect(basketItems).to.deep.include([]);
          });
    });
});
