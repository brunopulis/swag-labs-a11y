# AGENTS.md - Development Guidelines for swag-labs

## Project Overview

Automation project for saucedemo.com using Cypress with accessibility testing (axe-core) and Allure reporting. Uses pnpm (v10.28.1) as package manager.

## Commands

### Install Dependencies
```bash
pnpm install
```

### Cypress Commands
```bash
pnpm cypress:open            # Open Cypress Test Runner
pnpm cypress:run            # Run all tests headless
pnpm cypress:run:headed     # Run tests with browser visible
```

### Running a Single Test
```bash
pnpm cypress:run --spec "cypress/e2e/login.cy.ts"
pnpm cypress:run --spec "cypress/e2e/**/*.cy.ts" --grep "should login"
```

### Allure Reporting
```bash
pnpm test:allure            # Run tests with Allure
pnpm allure:generate        # Generate report
pnpm allure:open            # Open report
```

### Linting & Formatting
```bash
pnpm lint              # Run ESLint
pnpm lint:fix         # Fix issues automatically
pnpm format           # Format with Prettier
pnpm format:check     # Check formatting
```

## Project Structure

```
cypress/
├── e2e/                    # Test files (*.cy.ts)
├── fixtures/               # Test data (data.ts)
├── support/
│   └── e2e.ts              # Custom commands
└── cypress.config.ts       # Configuration
```

## Code Style Guidelines

### Cypress Tests

**Naming Conventions**
- Files: `*.cy.ts`
- Describe: PascalCase (e.g., `Login`)
- It: lowercase starting with "should"

**Best Practices**
- Use custom commands in `cypress/support/e2e.ts`
- Use data-test attributes for selectors
- Include accessibility checks with `cy.checkA11y()`
- Use beforeEach for repeated setup

```typescript
describe('Login', () => {
  beforeEach(() => cy.visit('/'));

  it('should login successfully', () => {
    cy.login('standard_user', 'secret_sauce');
    cy.get('.title').should('have.text', 'Products');
  });
});
```

### Custom Commands

Define in `cypress/support/e2e.ts`:

```typescript
declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});
```

### Accessibility Testing

```typescript
it('should have no accessibility violations', () => {
  cy.checkA11y();
});
```

### Allure Reporting

```typescript
cy.allure().label('severity', 'critical');
cy.allure().description('test description');
```

### TypeScript

- Use TypeScript, avoid `any`
- Use interfaces for object shapes
- Variables/functions: camelCase
- Types/Interfaces: PascalCase
- Files: kebab-case

### Formatting

- 2 spaces indentation
- Single quotes for strings
- Semicolons required
- Max line length: 100

## Git Conventions

- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`
- Keep commits small and focused

## Editor Configuration

VS Code - install "EditorConfig" and "Cypress Snippets" extensions:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```
