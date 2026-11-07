# ADR 0002: Next.js e NestJS com responsabilidades explícitas

- **Data:** 2026-11-07
- **Status:** Aceito
- **Task Relacionada:** CDC-003

## Contexto

A stack aprovada separa experiência web e API. Sem fronteiras claras, regras e consultas poderiam ser duplicadas nas duas aplicações.

## Decisão

Usar Next.js com TypeScript estrito para apresentação e NestJS com TypeScript estrito para consultas e regras do backend. Somente a API acessa a persistência. Começar com os componentes, controllers e services necessários ao catálogo; não exigir interfaces de repositório, domínio separado ou pacotes vazios. Ver [responsabilidades](../architecture/mvp.md).

## Alternativas consideradas

- Next.js como aplicação única, incluindo banco e regras: reduz processos, mas não atende à separação de backend aprovada.
- Microserviços: aumentam distribuição e operação sem necessidade do catálogo.
- Camadas e contratos genéricos antecipados: criam manutenção sem casos concretos.

## Consequências

As fronteiras ficam claras e a API pode evoluir sem expor o banco ao frontend. Em contrapartida, existem dois processos e integração HTTP a configurar. Hospedagem, origem/proxy e renderização das consultas não estão resolvidas por esta decisão.

## Critérios de revisão

Reavaliar se a duplicação de infraestrutura superar os benefícios observados, se surgirem novos consumidores ou se regras concretas exigirem separação adicional dentro da API.
