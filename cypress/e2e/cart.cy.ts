import { CREDENTIALS, PRODUCTS } from '../fixtures/data';

describe('Cart', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login(CREDENTIALS.valid.username, CREDENTIALS.valid.password);
    PRODUCTS.forEach((product) => {
      cy.contains('.inventory_item', product).find('.btn_inventory').click();
    });
    cy.get('.shopping_cart_link').click();
  });

  it('should display added products in cart', () => {
    cy.get('.cart_item').should('have.length', 3);
  });

  it('should remove product from cart', () => {
    cy.contains('.cart_item', PRODUCTS[0]).find('.btn_secondary').click();
    cy.get('.cart_item').should('have.length', 2);
  });

  it('should proceed to checkout', () => {
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one');
  });

  it('should have no accessibility violations on cart page', () => {
    cy.checkA11y();
  });
});
