import { CREDENTIALS, PRODUCTS } from '../fixtures/data';

describe('Inventory', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login(CREDENTIALS.valid.username, CREDENTIALS.valid.password);
  });

  it('should display product list', () => {
    cy.get('.inventory_item').should('have.length.greaterThan', 0);
    cy.get('.inventory_item_name').first().should('be.visible');
  });

  it('should add product to cart', () => {
    cy.contains('.inventory_item', PRODUCTS[0]).find('.btn_inventory').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });

  it('should add multiple products to cart', () => {
    PRODUCTS.forEach((product) => {
      cy.contains('.inventory_item', product).find('.btn_inventory').click();
    });
    cy.get('.shopping_cart_badge').should('have.text', '3');
  });

  it('should open cart when clicking cart icon', () => {
    cy.contains('.inventory_item', PRODUCTS[0]).find('.btn_inventory').click();
    cy.get('.shopping_cart_link').click();
    cy.get('.title').should('have.text', 'Your Cart');
  });

  it('should have no accessibility violations on inventory page', () => {
    cy.checkA11y();
  });
});
