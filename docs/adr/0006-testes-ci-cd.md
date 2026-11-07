# ADR 0006: Testes de regressão obrigatórios e CI multiplataforma

- **Data:** 2026-11-07
- **Status:** Aceito
- **Task Relacionada:** CDC-004

## Contexto

A primeira implementação exige evidência automatizada de comportamento e prevenção permanente de regressões. O responsável aprovou testes obrigatórios, CI em PRs para main e documentação de CD futuro, sem autorização de alterações remotas.

## Decisão

Aplicar a política consolidada em [AGENTS.md](../../AGENTS.md). Usar node:test e HTTP real na API, compilando TypeScript com decorators, e Vitest/jsdom/Testing Library para a página síncrona do Next.js. Testar inicialização, contrato do healthcheck, independência do banco e renderização inicial. Não criar testes artificiais nem ocultar falhas com skip/only ou enfraquecimento de testes.

CI em PRs para main e pushes para main executa instalação congelada, lint, typecheck, testes e build em Ubuntu, Windows e macOS. Actions são fixadas por SHA, token somente leitura, sem persistir credenciais ou expor segredos a PRs. Checks obrigatórios serão configurados pelo responsável após autorização remota. Ver [estratégia](../architecture/testing.md) e [CI/CD](../architecture/ci-cd.md).

Integração com banco entra quando houver necessidade real e infraestrutura. Playwright entra quando existirem fluxos completos relevantes. CD permanece documental até definir hospedagem, com staging/produção separados, aprovação explícita em produção, bloqueio de promoção em falha e recuperação/rollback planejados.

## Alternativas consideradas

- Apenas testes manuais ou CI sem testes: não protegem regressões em alterações futuras.
- Jest/ts-jest para a API: viável, mas adiciona transformação e configuração desnecessárias para o contrato inicial; o compilador real e runner nativo atendem ao risco atual.
- Runner único para tudo: reduz ferramentas, mas adiciona adaptação para decorators NestJS ou DOM React sem benefício neste scaffold.
- Playwright e PostgreSQL em todos os testes desde o início: custo sem fluxo de negócio ou consulta implementados.
- CI apenas Linux: deixaria comandos específicos de sistema sem verificação contínua.
- Actions por tags móveis, token de escrita ou deploy automático: ampliam riscos sem necessidade aprovada.

## Consequências

Alterações comportamentais exigem testes relevantes e falhas bloqueiam integração. A matriz aumenta tempo/custo de CI. Componentes em jsdom não comprovam comportamento de navegador e o healthcheck não comprova prontidão do banco. Sem publicação autorizada não é possível atestar execução remota do workflow; sem Docker não é possível atestar integração PostgreSQL. Limitações devem ser explícitas e submetidas ao responsável.

## Critérios de revisão

Reavaliar ao introduzir consultas, catálogo, componentes assíncronos, fluxos críticos ou hospedagem. Acrescentar integração real e E2E de navegador conforme risco; medir custo/flakiness antes de alterar a matriz. Mudanças em checks, permissões ou CD exigem revisão e autorização adequada, sem enfraquecer a prevenção de regressões.
