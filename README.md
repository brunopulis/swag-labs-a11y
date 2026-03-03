# Swag Labs - Automação de Testes

Projeto de automação de testes end-to-end para o site [saucedemo.com](https://www.saucedemo.com) utilizando Cypress, com suporte a testes de acessibilidade e geração de relatórios com Allure.

## 🚀 Tecnologias

- **Cypress** - Framework de automação de testes
- **axe-core** - Testes de acessibilidade (WCAG)
- **Allure** - Geração de relatórios
- **ESLint** + **Prettier** - Qualidade de código
- **TypeScript** - Tipagem estática

## 📋 Pré-requisitos

- Node.js 18+
- pnpm 10.28.1+

## 🛠️ Instalação

```bash
# Instalar dependências
pnpm install

# Instalar binários do Cypress
pnpm cypress install
```

## ▶️ Executando os Testes

### Modo Interativo
```bash
pnpm cypress:open
```

### Modo Headless
```bash
pnpm cypress:run
```

### Executar Arquivo Específico
```bash
pnpm cypress:run --spec "cypress/e2e/login.cy.ts"
```

### Executar com Grep
```bash
pnpm cypress:run --spec "cypress/e2e/**/*.cy.ts" --grep "should login"
```

## 📊 Relatórios Allure

### Executar com Allure
```bash
pnpm test:allure
```

### Gerar Relatório
```bash
pnpm allure:generate
```

### Abrir Relatório
```bash
pnpm allure:open
```

## 🎯 Testes de Acessibilidade

Os testes de acessibilidade são executados automaticamente em cada página:

```typescript
it('should have no accessibility violations', () => {
  cy.checkA11y();
});
```

Os relatórios Allure incluem:
- Descrição do bug de acessibilidade
- Critério de sucesso WCAG violado
- Nível de impacto (critical, serious, moderate, minor)
- Elementos afetados

## 🔧 Comandos Lint e Formatação

```bash
# Verificar código
pnpm lint

# Corrigir problemas automaticamente
pnpm lint:fix

# Formatar código
pnpm format

# Verificar formatação
pnpm format:check
```

## 📁 Estrutura do Projeto

```
cypress/
├── e2e/                    # Arquivos de teste
│   ├── login.cy.ts         # Testes de login
│   ├── inventory.cy.ts     # Testes de inventário
│   └── cart.cy.ts          # Testes do carrinho
├── fixtures/               # Dados de teste
│   └── data.ts             # Credenciais e dados
├── support/
│   └── e2e.ts              # Comandos customizados
└── cypress.config.ts       # Configuração do Cypress
```

## 📝 Padrões de Código

### Nomeclatura
- Arquivos de teste: `*.cy.ts`
- Describe: PascalCase (ex: `Login`)
- It: começa com "should" em minúsculas

### Custom Commands
Definidos em `cypress/support/e2e.ts`:
- `cy.login(username, password)` - Executa login
- `cy.loginAsStandardUser()` - Login com usuário padrão
- `cy.checkA11y()` - Verifica acessibilidade

### Exemplo de Teste
```typescript
describe('Login', () => {
  beforeEach(() => cy.visit('/'));

  it('should login successfully', () => {
    cy.login('standard_user', 'secret_sauce');
    cy.get('.title').should('have.text', 'Products');
  });
});
```

## 🐛 Solução de Problemas

### Cypress não inicia
```bash
pnpm cypress install
```

### Limpar cache
```bash
pnpm cypress cache clear
```

## 📄 Licença

ISC
