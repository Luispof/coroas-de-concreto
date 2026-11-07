# Arquitetura do Sistema — Coroas de Concreto

Este diretório armazena a documentação técnica, diagramas (Mermaid/C4), modelos de domínio e especificações de arquitetura do projeto **Coroas de Concreto**.

## Contrato inicial — CDC-003

O MVP é um catálogo público de personagens com página individual. Não possui autenticação, escrita pela API, endpoints administrativos ou real-time. As decisões de stack e acesso foram aprovadas na CDC-003; os detalhes abaixo orientam a futura implementação e podem ser revistos por ADR.

- [MVP, responsabilidades e critérios de aceite](./mvp.md)
- [Modelo conceitual mínimo](./domain-model.md)
- [Decisões pendentes](./pending-decisions.md)
- [Proteção de conteúdo](./security.md)
- [Registro de decisões](../adr/README.md)
- [Desenvolvimento local e versões](./local-development.md)
- [Estratégia de testes](./testing.md)
- [CI/CD e proteção da main](./ci-cd.md)

## Monorepo inicial — CDC-004

```text
apps/
  web/          Next.js + TypeScript
  api/          NestJS + TypeScript
    prisma/     Schema sem entidades; migrations somente quando necessárias
docs/
  architecture/
  adr/
```

As duas aplicações e o workspace pnpm estão implementados, com um lockfile na raiz. A web contém somente a página inicial; a API oferece `GET /api/v1/health`, independente de PostgreSQL. O catálogo descrito no contrato do MVP ainda não foi implementado. Não criar pacotes compartilhados, orquestradores adicionais ou abstrações genéricas sem necessidade concreta.

## Compatibilidade

Windows e macOS são ambientes suportados para desenvolvimento. Usar UTF-8, LF, caminhos relativos e capitalização exata em imports; SVG permanece texto LF. Não exigir symlinks criados manualmente. A CDC-004 foi validada localmente em Windows; a matriz CI inclui Linux e macOS, com execução remota pendente de publicação autorizada. As limitações de Docker estão em [desenvolvimento local](./local-development.md).

> **Nota de Segurança:** Nenhum documento neste diretório deve conter spoilers confidenciais da crônica ou credenciais de infraestrutura.
