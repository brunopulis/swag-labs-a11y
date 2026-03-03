import { CREDENTIALS } from '../fixtures/data';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should login successfully with valid credentials', () => {
    cy.login(CREDENTIALS.valid.username, CREDENTIALS.valid.password);
    cy.get('.title').should('have.text', 'Products');
  });

  it('should show error with invalid credentials', () => {
    cy.login(CREDENTIALS.invalid.username, CREDENTIALS.invalid.password);
    cy.get('[data-test="error"]').should('be.visible');
    cy.get('[data-test="error"]').should('contain', 'Username and password do not match');
  });

  it('should show error with locked out user', () => {
    cy.login(CREDENTIALS.locked.username, CREDENTIALS.locked.password);
    cy.get('[data-test="error"]').should('be.visible');
    cy.get('[data-test="error"]').should('contain', 'locked out');
  });

  it('should have no accessibility violations on login page', () => {
    cy.checkA11y();
  });
});
