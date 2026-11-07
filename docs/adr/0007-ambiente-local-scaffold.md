# ADR 0007: Ambiente local e versões do scaffold

- **Data:** 2026-11-07
- **Status:** Aceito
- **Task Relacionada:** CDC-004

## Contexto

O monorepo precisa de uma primeira execução reproduzível em Windows e macOS, sem catálogo, entidades ou infraestrutura de produção. Versões estáveis e compatíveis devem ser confirmadas no registro antes de instalar, com aprovação explícita em caso de incompatibilidade.

## Decisão

Fixar Node 24.19.0, pnpm 12.18.0, Next.js 16.4.5/React 19.3.1, NestJS 12.4.0, TypeScript 6.0.3 e Prisma 7.10.1, conforme [inventário instalado](../architecture/local-development.md). Usar ESM na API e o compilador TypeScript com decorators. Preservar um lockfile congelado e peers estritos.

ESLint 10 foi rejeitado por peers dos plugins transitivos do Next.js. Após apresentar o conflito, o responsável aprovou ESLint/@eslint/js 9.39.5 nas duas aplicações. A depreciação informada pelo registro fica documentada para revisão futura; não ignorar peers nem realizar novas trocas silenciosas.

Compose contém somente PostgreSQL `18.6-bookworm`, com porta em loopback e volume nomeado. Web/API rodam no host. Ambientes são separados por aplicação; Prisma CLI resolve explicitamente o arquivo da API. Healthcheck é liveness HTTP independente de banco, sem inicialização de client Prisma. Schema começa sem modelos, migrations ou seeds. Não instalar Docker automaticamente.

## Alternativas consideradas

- Usar `latest` em tudo: Prisma latest aponta para prerelease e TypeScript latest não corresponde à linha escolhida para a toolchain Nest.
- Ignorar conflitos ESLint com peers relaxados: ocultaria incompatibilidade declarada; preferida a alternativa estável expressamente aprovada.
- Containerizar todas as aplicações: adiciona custo de hot reload e configuração sem necessidade do scaffold.
- Exigir instalação nativa PostgreSQL: aumenta divergência entre máquinas; continua possível como alternativa autorizada para validação quando Docker não estiver disponível.
- Healthcheck conectado ao banco: confundiria liveness com readiness e impediria testar o processo HTTP sem infraestrutura.

## Consequências

A fundação tem versões rastreáveis e serviços locais mínimos, mas precisa de manutenção de patches e downloads de binários. Geração Prisma e validação de schema não provam conectividade. Docker indisponível impede validar Compose, health do banco e persistência do volume; execução remota/multiplataforma aguarda publicação autorizada.

O responsável aceitou expressamente o adiamento documentado para concluir a etapa de implementação local da CDC-004. Docker Compose, conexão real com PostgreSQL e persistência do volume permanecem não validados e não aprovados. A validação real do PostgreSQL será obrigatória antes de implementar funcionalidades dependentes de persistência, incluindo entidades, migrations e consultas. Esta atualização registra a decisão posterior do responsável; não altera as escolhas de stack nem dispensa a validação futura. Não instalar Docker ou alterar infraestrutura automaticamente. A auditoria independente do Antigravity precede a autorização de publicação; não há autorização para push, PR ou merge.

## Critérios de revisão

Reavaliar versões em vulnerabilidades, fim de suporte, incompatibilidades medidas ou suporte dos plugins a ESLint 10. Validar PostgreSQL assim que houver infraestrutura autorizada. Antes de consultas reais, definir modelos, migrations e lifecycle de conexão sem acoplar a rota de liveness ao banco. Hospedagem e publicação editorial continuam exigindo decisões próprias.
