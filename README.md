# playwright-ui-e2e-bdd

Automação E2E com **Playwright + TypeScript** para o site [Automation Exercise](https://automationexercise.com), seguindo Page Object Pattern, custom fixtures e nomenclatura BDD (Given / When / Then).

## Estrutura do projeto

```
playwright/
├── playwright.config.ts        # Configuração central (browsers, timeouts, reporters)
├── e2e/
│   ├── smoke/
│   │   └── register.spec.ts    # Cadastro completo (happy path)
│   └── regression/
│       └── register-validation.spec.ts  # E-mail duplicado + campos obrigatórios
├── fixtures/
│   └── pages.fixture.ts        # Custom fixture que injeta Page Objects nos testes
├── pages/
│   └── RegisterPage.ts         # Page Object do fluxo de registro
└── utils/
    └── test-data.ts            # Geração de dados aleatórios com Faker
```

## Pré-requisitos

- Node.js >= 18
- npm

## Instalação

```bash
npm install
npx playwright install --with-deps
```

## Scripts disponíveis

| Comando                   | Descrição                                |
| ------------------------- | ---------------------------------------- |
| `npm test`                | Roda todos os testes                     |
| `npm run test:smoke`      | Apenas testes `@smoke`                   |
| `npm run test:regression` | Apenas testes `@regression`              |
| `npm run report`          | Abre o relatório HTML da última execução |
| `npm run codegen`         | Abre o Playwright codegen no site        |

## Tecnologias

- [Playwright](https://playwright.dev/) — framework de automação E2E
- [TypeScript](https://www.typescriptlang.org/) — tipagem estática
- [@faker-js/faker](https://fakerjs.dev/) — geração de dados de teste dinâmicos

## Browsers

Os testes rodam em **Chromium** e **Firefox** (configuráveis em `playwright.config.ts`).

## Relatório

Após a execução, o relatório HTML é gerado em `playwright-report/`. Use `npm run report` para abri-lo no navegador. Cada step inclui screenshots de evidência anexados automaticamente.
