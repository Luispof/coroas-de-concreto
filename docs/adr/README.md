# Architecture Decision Records (ADR)

Este diretório contém os registros de decisões arquiteturais (**ADRs**) do projeto **Coroas de Concreto**.

## O que é um ADR?

Um **Architecture Decision Record** é um documento curto que captura uma decisão arquitetural importante feita ao longo do projeto, juntamente com seu contexto e suas consequências.

## Convenção de Nomenclatura

Os arquivos devem seguir o formato sequencial:

`NNNN-titulo-da-decisao.md` (ex.: `0001-estrutura-inicial-do-repositorio.md`)

## Decisões registradas

Decisões aceitas na CDC-003:

- [0001 — Monorepo pnpm](./0001-monorepo-pnpm.md)
- [0002 — Fronteiras Next.js e NestJS](./0002-fronteiras-web-api.md)
- [0003 — Catálogo público e API REST de leitura](./0003-catalogo-publico-rest.md)
- [0004 — PostgreSQL e Prisma](./0004-postgresql-prisma.md)
- [0005 — Git e compatibilidade multiplataforma](./0005-git-multiplataforma.md)

As decisões refletem a aprovação explícita da CDC-003, não uma implementação concluída. Novas decisões devem registrar alternativas e critérios de revisão; uma substituição deve vincular o ADR anterior e explicar a mudança.

## Template Base

```markdown
# ADR NNNN: [Título Curto da Decisão]

- **Data:** YYYY-MM-DD
- **Status:** Proposto | Aceito | Substituído | Depreciado
- **Task Relacionada:** CDC-XXX

## Contexto
Qual é o problema ou necessidade técnica/arquitetural que motiva esta decisão?

## Decisão
Qual foi a abordagem escolhida e por quê?

## Alternativas consideradas
Quais opções foram avaliadas e por que não foram adotadas?

## Consequências
- **Positivas:** Benefícios diretos e ganhos de qualidade/produtividade.
- **Negativas / Trade-offs:** Custos, limitações ou cuidados necessários.

## Critérios de revisão
Que mudança de contexto ou evidência exige reavaliar esta decisão?
```
