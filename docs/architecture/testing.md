# Testes, prevenção de regressões e aceite de PRs

A política obrigatória está em [AGENTS.md](../../AGENTS.md). Testes demonstram comportamento relevante, não apenas execução de linhas. Não há meta artificial de cobertura.

## Estratégia mínima

- **API:** runner nativo `node:test`, assertions do Node e TypeScript compilado pelo mesmo compilador da aplicação. Evita transpilers de teste que possam divergir da emissão de decorators do NestJS. Testes unitários verificam a resposta do controller; testes E2E HTTP inicializam a aplicação real, escutam em porta efêmera e usam `fetch` para conferir contrato e prefixo.
- **Web:** Vitest, jsdom e React Testing Library verificam conteúdo e landmarks percebidos pelo usuário. O teste inicial renderiza a página síncrona e verifica a identidade do projeto. Não há mocks de router ou infraestrutura de navegador para uma página sem interação.
- **Banco:** testes com PostgreSQL real entram quando houver consultas ou regras que exijam integridade transacional. Na fundação, o smoke check de conexão é separado e depende de infraestrutura local. Não simular sucesso de integração sem banco.
- **Navegador:** introduzir Playwright quando existirem fluxos críticos completos. Testes de componentes não comprovam navegação, layout, contraste ou comportamento de Server Components assíncronos.

## Convenções e comandos

| Local | Convenção | Comando |
|---|---|---|
| API unitário | `apps/api/test/*.spec.ts` | `pnpm --filter @cdc/api test` |
| API HTTP | `apps/api/test/*.e2e-spec.ts` | `pnpm test:e2e` |
| Web componente | `apps/web/src/**/*.test.tsx` | `pnpm --filter @cdc/web test` |
| Todos os testes | Execução sem watch, com falha propagada | `pnpm test` |
| Qualidade | ESLint e TypeScript nas duas aplicações | `pnpm lint`, `pnpm typecheck` |
| Build | Artefatos de produção das duas aplicações | `pnpm build` |

Ao adicionar arquivos de teste da API, atualizar a lista explícita nos scripts; ela evita expansão de globs dependente do shell. Os testes HTTP fecham a aplicação e restauram ambiente no teardown. Não usam portas fixas nem banco externo. O healthcheck deve permanecer independente de PostgreSQL ausente ou inacessível. Não usar `.only`, `.skip`, flags equivalentes ou enfraquecer assertions para ocultar falhas.

## Responsabilidade dos agentes e aceite de PR

1. Identificar comportamentos alterados e riscos, escolher o nível adequado e acrescentar testes relevantes. Para bugs, reproduzir a regressão antes da correção quando viável.
2. Preservar testes em refatorações; não remover testes para passar validações.
3. Executar testes existentes e novos, lint, typecheck e build. Revisar o diff completo para credenciais, spoilers e dados privados antes de cada commit.
4. Informar comandos, resultados, comportamentos cobertos e limitações. Falhas são bloqueadores; indisponibilidade de infraestrutura exige registro explícito e decisão do responsável.
5. Submeter à revisão independente do Antigravity; o responsável aprova integração. Checks obrigatórios precisam estar verdes, além da revisão humana.

## Limites e evolução

Os testes do scaffold protegem a resposta de liveness, inicialização HTTP, prefixo e renderização inicial. Não cobrem queries, migrations, autorização futura, catálogo, desempenho, segurança completa ou acessibilidade visual. Acrescentar integração com PostgreSQL quando houver modelos/consultas; testar contratos e erros do catálogo quando implementados; adicionar navegador aos percursos críticos e monitorar flakiness sem ocultar falhas.
