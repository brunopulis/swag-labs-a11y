import '@shelex/cypress-allure-plugin';
import axeCore from 'axe-core';

declare global {
  interface Window {
    axe: typeof axeCore;
  }

  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
      loginAsStandardUser(): Chainable<void>;
      injectAxe(): Chainable<void>;
      checkA11y(): Chainable<void>;
    }
  }
}

interface AxeViolation {
  id: string;
  impact: string;
  description: string;
  help: string;
  helpUrl: string;
  nodes: Array<{
    html: string;
    target: string[];
  }>;
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('loginAsStandardUser', () => {
  cy.login('standard_user', 'secret_sauce');
});

Cypress.Commands.add('injectAxe', () => {
  cy.window().then((win) => {
    win.axe = axeCore;
  });
});

Cypress.Commands.add('checkA11y', () => {
  cy.window()
    .then((win) => {
      if (!win.axe) {
        win.axe = axeCore;
      }
      return win.axe.run(win.document);
    })
    .then((results) => {
      if (results.violations.length > 0) {
        const violations = results.violations as AxeViolation[];

        const detailedViolations = violations.map((v) => {
          return {
            bug: v.description,
            successCriteria: v.help,
            helpUrl: v.helpUrl,
            impact: v.impact,
            elements: v.nodes.map((n) => ({
              selector: n.target.join(' > '),
              html: n.html,
            })),
          };
        });

        const violationsJson = JSON.stringify(detailedViolations, null, 2);

        cy.allure().attachment('Accessibility Violations', violationsJson, 'application/json');

        const summary = violations
          .map((v) => {
            const elements = v.nodes.map((n) => `  - ${n.target.join(' > ')}`).join('\n');
            return `[${v.impact.toUpperCase()}] ${v.id}\n  Bug: ${v.description}\n  Success Criteria: ${v.help}\n  Elements:\n${elements}\n  Help: ${v.helpUrl}`;
          })
          .join('\n\n');

        cy.allure().description(
          `Found ${results.violations.length} accessibility violations:\n\n${summary}`
        );

        throw new Error(`Found ${results.violations.length} accessibility violations`);
      }
    });
});

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('ResizeObserver')) {
    return false;
  }
});
