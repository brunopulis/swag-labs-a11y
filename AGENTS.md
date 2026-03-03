# AGENTS.md - Development Guidelines for swag-labs

## Project Overview

Automation project for saucedemo.com using Cypress with accessibility testing (axe-core) and Allure reporting. Uses pnpm (v10.28.1) as the package manager.

## Package Manager

Use **pnpm** for all package management commands.

## Commands

### Install Dependencies

```bash
pnpm install
```

### Cypress Commands

```bash
pnpm cypress:open           # Open Cypress Test Runner (interactive mode)
pnpm cypress:run            # Run all tests in headless mode
pnpm cypress:run:headed     # Run tests with browser visible
pnpm cypress:run --spec "cypress/e2e/login.cy.ts"  # Run specific test file
pnpm cypress:run --spec "cypress/e2e/**/*.cy.ts"   # Run tests matching glob pattern
```

### Running a Single Test

```bash
pnpm cypress:run --spec "cypress/e2e/login.cy.ts"
```

Or use grep pattern:

```bash
pnpm cypress:run --spec "cypress/e2e/**/*.cy.ts" --grep "should login"
```

### Allure Reporting

```bash
pnpm test:allure            # Run tests with Allure reporting enabled
pnpm allure:generate        # Generate Allure report from results
pnpm allure:open            # Open Allure report in browser
```

### Accessibility Tests

```bash
# Run accessibility tests (included in each test file)
# Each test includes cy.checkA11y() for accessibility validation
```

### Linting & Formatting

```bash
pnpm lint              # Run ESLint
pnpm lint:fix         # Fix ESLint issues automatically
pnpm format           # Format code with Prettier
pnpm format:check     # Check code formatting
```

### Code Quality Rules

- ESLint rules for Cypress best practices
- Prettier for consistent formatting
- TypeScript strict mode enabled

## Project Structure

```
cypress/
├── e2e/                    # Test files
│   ├── login.cy.ts         # Login tests
│   ├── inventory.cy.ts     # Inventory tests
│   └── cart.cy.ts          # Cart tests
├── fixtures/               # Test data
│   └── data.ts             # Credentials and product data
├── support/
│   └── e2e.ts              # Cypress support config with custom commands
└── cypress.config.ts       # Cypress configuration
```

## Code Style Guidelines

### Cypress Tests

#### Naming Conventions

- Test files: `*.cy.ts` or `*.cy.js`
- Describe blocks: Feature name in PascalCase
- It blocks: Should description in lowercase

```typescript
describe('Login', () => {
  it('should login successfully with valid credentials', () => {
    // test implementation
  });
});
```

#### Best Practices

- Use custom commands for reusable actions (defined in `cypress/support/e2e.ts`)
- Use data-test attributes when available
- Use meaningful assertions
- Include accessibility checks (cy.checkA11y)
- Use beforeEach for repeated setup
- Use selectors directly in tests or create custom commands

```typescript
describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should login successfully', () => {
    cy.login('standard_user', 'secret_sauce');
    cy.get('.title').should('have.text', 'Products');
  });
});
```

#### Custom Commands

Define reusable commands in `cypress/support/e2e.ts`:

```typescript
declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
      loginAsStandardUser(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});
```

#### Accessibility Testing

- Run accessibility check: `cy.checkA11y()`
- Can filter by tags: `cy.checkA11y(null, { includedImpacts: ['critical'] })`

```typescript
it('should have no accessibility violations', () => {
  cy.checkA11y();
});
```

#### Allure Reporting

- Use `cy.allure().label('severity', 'critical')` for labels
- Use `cy.allure().description('test description')` for descriptions
- Use `cy.allure().step('step name')` for steps

### TypeScript/JavaScript

#### Types

- Use TypeScript for new code
- Avoid `any` type; use `unknown` when type is unknown
- Use interfaces for object shapes

#### Naming Conventions

- **Variables/functions**: camelCase
- **Classes/Types/Interfaces**: PascalCase
- **Constants**: SCREAMING_SNAKE_CASE
- **Files**: kebab-case

#### Formatting

- 2 spaces for indentation
- Use semicolons
- Prefer single quotes for strings

## Git Conventions

- Use conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`
- Keep commits small and focused
- Write meaningful commit messages

## Editor Configuration

For VS Code, install "Cypress Snippets" extension and create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```
