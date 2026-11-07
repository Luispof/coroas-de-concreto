# ADR 0004: Persistência com PostgreSQL e Prisma

- **Data:** 2026-11-07
- **Status:** Aceito
- **Task Relacionada:** CDC-003

## Contexto

Personagens e clãs têm vínculo relacional e precisam de unicidade e integridade. PostgreSQL e Prisma foram aprovados para a persistência inicial.

## Decisão

Usar PostgreSQL como banco e Prisma na API. Schema e migrations ficam em `apps/api/prisma`; o backend controla o acesso e seleciona explicitamente os campos públicos. O [modelo conceitual](../architecture/domain-model.md) orienta a implementação. Versionar migrations, sem dumps ou credenciais. Tipos Prisma não são contratos do frontend. Não criar repositório genérico ou pacote de banco compartilhado.

## Alternativas consideradas

- Arquivos estáticos: simplificam o catálogo inicial, mas não seguem a persistência aprovada.
- SQLite: reduz infraestrutura local, porém cria uma diferença de banco em relação à opção aprovada.
- SQL direto ou outro ORM: são opções possíveis, mas não foram escolhidas; mudanças futuras precisam de justificativa concreta.

## Consequências

Relações e restrições podem ser mantidas no banco, com schema e evolução versionados. Há custo de operar PostgreSQL, gerar o cliente e administrar migrations. A API de leitura não impede cargas operacionais: privilégios e procedimento editorial devem ser tratados separadamente, sem endpoints administrativos.

## Critérios de revisão

Reavaliar se limitações verificadas de consultas, migrations, desempenho ou operação justificarem outra abordagem. Fixar versões, tipo de IDs e limites de campos na implementação; resolver backup e recuperação antes de produção persistente.
