# Coroas de Concreto

> Cinematic RPG universe and Full Stack web application built with TypeScript, Next.js, NestJS and AI-assisted software engineering.

---

## Visão Geral

**Coroas de Concreto** é uma plataforma web Full Stack e ecossistema digital projetado para sustentar uma experiência de RPG com estética cinematográfica, narrativa urbana sombria e ferramentas interativas para condução de crônicas, gestão de domínio e imersão de jogadores.

O projeto combina engenharia de software moderna, arquitetura modular escalável e fluxos de desenvolvimento assistidos por Inteligência Artificial.

## Stack Tecnológica Planejada

- **Linguagem:** TypeScript (Strict Mode)
- **Frontend:** Next.js (App Router, React, UI Cinematográfica)
- **Backend:** NestJS (API REST de leitura sob `/api/v1`)
- **Persistência:** PostgreSQL + Prisma, sob responsabilidade da API
- **Monorepo:** pnpm workspaces, com futuras aplicações em `apps/web` e `apps/api`
- **Engenharia Assistida por IA:** Fluxo integrado com **Codex** e **Antigravity** (documentado em [`AGENTS.md`](./AGENTS.md))
- **Governança Arquitetural:** Documentação viva e Architecture Decision Records ([`docs/adr/`](./docs/adr/))

## Estrutura do Repositório

```text
coroas-de-concreto/
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

- [Arquitetura, responsabilidades e estrutura futura](./docs/architecture/README.md)
- [Contrato HTTP e critérios de aceite](./docs/architecture/mvp.md)
- [Modelo conceitual de personagens e clãs](./docs/architecture/domain-model.md)
- [ADRs aceitas](./docs/adr/README.md)
- [Decisões pendentes: hospedagem, estratégia editorial e operação](./docs/architecture/pending-decisions.md)

## Desenvolvimento e integração

Windows e macOS são os ambientes de desenvolvimento previstos. Os arquivos de padronização estabelecem UTF-8 e LF; scripts futuros devem ser portáveis. A instalação e execução nos dois sistemas ainda serão validadas quando houver aplicações.

Trabalhar em branches curtas por tarefa, com commits pequenos, frequentes e atômicos e integração por PR. Preservar os commits por merge commit, evitando squash e reescrita da `main`. Push requer autorização explícita. As regras completas estão em [AGENTS.md](./AGENTS.md).

## Status do Projeto

**CDC-003: contrato arquitetural e fundação documental registrados.**

Ainda não há aplicações, dependências instaladas, schema Prisma ou ambiente executável. A estrutura `apps/` é planejada. Não existem comandos de instalação ou execução definidos nesta etapa.

Próxima tarefa recomendada: **CDC-004 — Scaffold mínimo do monorepo**, com definição de versões compatíveis, configuração de pnpm workspaces e criação controlada das duas aplicações. Não incluir funcionalidades extras nem publicação; a implementação do primeiro fluxo deve seguir os critérios documentados. Hospedagem e estratégia editorial exigem decisões específicas antes dos trechos dependentes.
