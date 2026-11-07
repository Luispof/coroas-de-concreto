# Coroas de Concreto

> Cinematic RPG universe and Full Stack web application built with TypeScript, Next.js, NestJS and AI-assisted software engineering.

---

## Visão Geral

**Coroas de Concreto** é uma plataforma web Full Stack e ecossistema digital projetado para sustentar uma experiência de RPG com estética cinematográfica, narrativa urbana sombria e ferramentas interativas para condução de crônicas, gestão de domínio e imersão de jogadores.

O projeto combina engenharia de software moderna, arquitetura modular escalável e fluxos de desenvolvimento assistidos por Inteligência Artificial.

## Stack inicial

- **Linguagem:** TypeScript (Strict Mode)
- **Frontend:** Next.js (App Router, React, UI Cinematográfica)
- **Backend:** NestJS (API REST de leitura sob `/api/v1`)
- **Persistência:** PostgreSQL + Prisma, sob responsabilidade da API
- **Monorepo:** pnpm workspaces, com aplicações em `apps/web` e `apps/api`
- **Engenharia Assistida por IA:** Fluxo integrado com **Codex** e **Antigravity** (documentado em [`AGENTS.md`](./AGENTS.md))
- **Governança Arquitetural:** Documentação viva e Architecture Decision Records ([`docs/adr/`](./docs/adr/))

## Estrutura do Repositório

```text
coroas-de-concreto/
├── apps/
│   ├── web/             # Next.js: página inicial
│   └── api/             # NestJS: healthcheck e configuração Prisma
├── .github/workflows/ci.yml # Qualidade em PRs e pushes para main
├── compose.yaml         # PostgreSQL para desenvolvimento local
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── docs/
│   ├── adr/             # Architecture Decision Records (ADRs)
│   └── architecture/    # Diagramas, visão de sistema e especificações técnicas
├── AGENTS.md            # Diretrizes e contexto compartilhado para agentes de IA (Codex & Antigravity)
├── .editorconfig        # UTF-8, LF e convenções de edição
├── .gitattributes       # Normalização de texto e preservação de binários
├── .gitignore           # Regras de exclusão do Git e proteção de segredos
└── README.md            # Documentação principal do projeto
```

## Segurança e Privacidade

Este repositório é **público**. Todo o código e documentação seguem políticas estritas de segurança:
- **Zero Credenciais:** Chaves de API, tokens e configurações sensíveis nunca são versionados.
- **Proteção Narrativa (Spoiler-Free):** Materiais confidenciais de crônica, segredos de campanha e documentos privados do narrador permanecem fora deste repositório.
- **Base pública:** Armazena somente conteúdo aprovado para divulgação. O `.gitignore` não substitui a revisão integral do conteúdo preparado antes de cada commit. Consulte a [política de proteção](./docs/architecture/security.md).

## Contrato do MVP

O primeiro fluxo é um catálogo público de personagens em `/personagens`, com página individual em `/personagens/{slug}`. O acesso não exige autenticação. A API oferece somente leitura, sem endpoints administrativos, escrita ou real-time.

- [Arquitetura e responsabilidades](./docs/architecture/README.md)
- [Contrato HTTP e critérios de aceite](./docs/architecture/mvp.md)
- [Modelo conceitual de personagens e clãs](./docs/architecture/domain-model.md)
- [ADRs aceitas](./docs/adr/README.md)
- [Decisões pendentes: hospedagem, estratégia editorial e operação](./docs/architecture/pending-decisions.md)

## Desenvolvimento e integração

Node `24.19.0` e pnpm `12.18.0` estão fixados. Com pnpm disponível no PATH:

```text
pnpm install --frozen-lockfile
pnpm dev:web
pnpm dev:api
```

Rodar web e API em terminais separados. Web em `http://127.0.0.1:3000`; healthcheck em `http://127.0.0.1:3001/api/v1/health`. A página inicial e a API funcionam sem banco. Não é necessário criar `.env` para esse fluxo.

Consulte [ambiente local, variáveis por aplicação e Docker](./docs/architecture/local-development.md), [testes e comandos](./docs/architecture/testing.md) e [CI/CD e required checks](./docs/architecture/ci-cd.md). Windows foi validado localmente; Linux/macOS aguardam execução do CI. SVG é tratado como texto LF.

Qualidade obrigatória: `pnpm lint`, `pnpm typecheck`, `pnpm test` e `pnpm build`. Toda alteração de comportamento exige testes adequados. O workflow usa privilégios mínimos e Actions fixadas, sem deploy automático nesta etapa.

Trabalhar em branches curtas por tarefa, com commits pequenos, frequentes e atômicos e integração por PR. Preservar os commits por merge commit, evitando squash e reescrita da `main`. Push requer autorização explícita. As regras completas estão em [AGENTS.md](./AGENTS.md).

## Status do Projeto

**CDC-004: implementação local concluída com adiamento da validação de banco expressamente aceito pelo responsável.** Docker Compose, conexão real com PostgreSQL e persistência do volume ainda não foram validados nem aprovados.

Há duas aplicações mínimas, testes de inicialização/healthcheck e renderização inicial, schema Prisma sem entidades e CI configurado. Não há catálogo, seeds, migrations de negócio, autenticação ou administração.

Próxima etapa: auditoria independente do Antigravity antes de autorizar publicação da branch e CI remoto. A validação real do PostgreSQL é obrigatória antes de implementar qualquer funcionalidade dependente de persistência, incluindo entidades, migrations e consultas. Não instalar Docker ou alterar infraestrutura automaticamente. Depois dessas condições, propor **CDC-005 — Primeiro fluxo público**, seguindo os critérios documentados. Hospedagem e estratégia editorial permanecem pendentes; produção exigirá aprovação explícita e CD com staging separado e recuperação planejada.
