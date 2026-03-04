# playwright-ui-e2e-bdd

Automação E2E com **Playwright + TypeScript** para o site [Automation Exercise](https://automationexercise.com), seguindo Page Object Pattern, custom fixtures e nomenclatura BDD (Given / When / Then).

## Estrutura do projeto

```
playwright/
├── playwright.config.ts          # Configuração central (browsers, timeouts, reporters)
├── e2e/
│   ├── smoke/
│   │   ├── contact-us.spec.ts              # Envio do formulário Contact Us
│   │   ├── contact-us.logged-in.spec.ts    # Contact Us autenticado
│   │   ├── home-subscription.spec.ts       # Subscription no footer (happy + negativos)
│   │   ├── products.spec.ts                # Listagem e detalhes de produtos
│   │   ├── products.logged-in.spec.ts      # Produtos autenticado
│   │   ├── register.spec.ts                # Cadastro completo (happy path)
│   │   ├── test-cases.spec.ts              # Navegação à página Test Cases
│   │   └── test-cases.logged-in.spec.ts    # Test Cases autenticado
│   └── regression/
│       ├── register-validation.spec.ts           # E-mail duplicado + campos obrigatórios
│       ├── search-products.spec.ts               # Busca: positivo, vazio, inexistente, etc.
│       └── search-products.logged-in.spec.ts     # Busca autenticada
├── fixtures/
│   └── pages.fixture.ts          # Custom fixture que injeta Page Objects nos testes
├── pages/
│   ├── BasePage.ts               # Classe base (screenshot, clickWithAdFallback, assertLoggedIn)
│   ├── ContactUsPage.ts          # Page Object – Contact Us
│   ├── HomePage.ts               # Page Object – Home (subscription no footer)
│   ├── ProductsPage.ts           # Page Object – Products & Search
│   ├── RegisterPage.ts           # Page Object – Registro / Signup
│   └── TestCasesPage.ts          # Page Object – Test Cases
├── support/
│   └── auth.setup.ts             # Setup project: cria sessão autenticada (storageState)
└── utils/
    ├── auth-state.ts             # Caminho do arquivo de storageState
    ├── test-case-ids.ts          # IDs centralizados (TC-001 … TC-032)
    └── test-data.ts              # Geração de dados aleatórios com Faker
```

## Catálogo de Test Cases

| ID     | Spec                      | Descrição                                          |
| ------ | ------------------------- | -------------------------------------------------- |
| TC-001 | register-validation       | E-mail duplicado exibe erro                        |
| TC-002 | register-validation       | Nome obrigatório                                   |
| TC-003 | register-validation       | E-mail obrigatório                                 |
| TC-004 | register-validation       | Senha obrigatória                                  |
| TC-005 | register-validation       | Primeiro nome obrigatório                          |
| TC-006 | register-validation       | Sobrenome obrigatório                              |
| TC-007 | register-validation       | Endereço obrigatório                               |
| TC-008 | register-validation       | Estado obrigatório                                 |
| TC-009 | register-validation       | Cidade obrigatória                                 |
| TC-010 | register-validation       | CEP obrigatório                                    |
| TC-011 | register-validation       | Celular obrigatório                                |
| TC-012 | search-products           | Busca produto existente (positivo)                 |
| TC-013 | search-products           | Busca vazia mantém lista completa                  |
| TC-014 | search-products           | Produto inexistente sem resultados                 |
| TC-015 | search-products           | Caracteres especiais sem resultados                |
| TC-016 | search-products           | Input excessivo sem resultados                     |
| TC-017 | search-products           | Busca com caractere único                          |
| TC-018 | contact-us                | Envio do formulário Contact Us                     |
| TC-019 | products                  | Listagem e detalhes de produto                     |
| TC-020 | register                  | Cadastro válido cria conta                         |
| TC-021 | test-cases                | Navegar à página Test Cases                        |
| TC-022 | search-products.logged-in | Busca autenticada                                  |
| TC-023 | contact-us.logged-in      | Contact Us autenticado                             |
| TC-024 | products.logged-in        | Produtos autenticado                               |
| TC-025 | test-cases.logged-in      | Test Cases autenticado                             |
| TC-026 | home-subscription         | E-mail válido (faker) se inscreve com sucesso      |
| TC-027 | home-subscription         | Campo vazio é bloqueado (required)                 |
| TC-028 | home-subscription         | E-mail sem `@` rejeitado pela validação do browser |
| TC-029 | home-subscription         | E-mail com `@` sem domínio rejeitado               |
| TC-030 | home-subscription         | Preencher → limpar → enviar impede inscrição       |
| TC-031 | home-subscription         | E-mail com 250+ caracteres não quebra a página     |
| TC-032 | home-subscription         | Tentativa de XSS no campo é bloqueada              |

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
Testes com sufixo `.logged-in.spec.ts` dependem do setup project que cria uma sessão autenticada via `storageState`.

## Relatório

Após a execução, o relatório HTML é gerado em `playwright-report/`. Use `npm run report` para abri-lo no navegador. Cada step inclui screenshots de evidência anexados automaticamente.
