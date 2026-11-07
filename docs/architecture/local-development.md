# Desenvolvimento local — CDC-004

## Versões fixadas

| Ferramenta | Versão |
|---|---|
| Node.js | 24.19.0 (`.node-version`, linha 24 em engines) |
| pnpm | 12.18.0 (`packageManager`) |
| Next.js / eslint-config-next | 16.4.5 |
| React / React DOM | 19.3.1 |
| NestJS common/core/platform-express | 12.4.0 |
| Nest CLI / Config | 12.0.12 / 12.1.1 |
| TypeScript | 6.0.3 |
| Prisma CLI / client / adapter PostgreSQL | 7.10.1 |
| PostgreSQL local | Imagem `postgres:18.6-bookworm` |
| ESLint / @eslint/js | 9.39.5 |
| typescript-eslint | 8.72.1 |
| Vitest / Vite / plugin React | 5.1.0 / 8.3.6 / 6.2.1 |
| Testing Library React / DOM / jsdom | 16.3.3 / 10.4.2 / 31.0.0 |

Versões e peers foram consultados no registro npm oficial antes da instalação. O lockfile único fixa resoluções transitivas e integridades. O registro aponta `prisma@latest` para uma prerelease, portanto a linha 7 foi selecionada explicitamente. ESLint 10 conflitou com peers transitivos do Next.js; o responsável aprovou expressamente 9.39.5 nas duas aplicações. Essa versão apresenta aviso de depreciação: reavaliar a atualização quando os plugins declararem suporte à linha 10, sem ignorar peers. Não houve downgrade silencioso.

Fontes: [Next.js](https://registry.npmjs.org/next/latest), [NestJS](https://docs.nestjs.com/migration-guide), [Prisma 7](https://docs.prisma.io/docs/orm/v7), [status Prisma](https://www.prisma.io/docs/orm/release-status), [pnpm](https://pnpm.io/installation), [PostgreSQL](https://www.postgresql.org/support/versioning/).

## Instalação e execução

Usar Node e pnpm fixados. Se os shims do pnpm já estiverem habilitados, executar da raiz:

```text
pnpm install --frozen-lockfile
pnpm dev:web
pnpm dev:api
```

Os dois últimos comandos rodam em terminais separados. Web: `http://127.0.0.1:3000`; API: `http://127.0.0.1:3001/api/v1/health`. O dev da API compila TypeScript em watch pelo Nest CLI e reinicia o processo; não requer PostgreSQL.

Se `pnpm` não estiver disponível, preparar Corepack/shims conscientemente, sem instalar ferramentas globais automaticamente. Nesta máquina foi usado Corepack 0.35.0 com cache e shims ignorados dentro de `.cache/`. Exemplo de bootstrap local (após criar `.cache/bin`):

```text
corepack enable pnpm --install-directory .cache/bin
```

Adicionar o caminho absoluto de `.cache/bin` ao PATH da sessão com o mecanismo do shell usado. Em PowerShell com execução de `.ps1` restrita, invocar `pnpm.cmd` em vez de alterar a política da máquina. Os scripts internos usam pnpm, portanto seu shim também precisa estar no PATH. Não executar instalação global ou mudanças no sistema sem autorização.

Scripts de projeto usam ferramentas Node/pnpm, caminhos relativos e não dependem de Bash ou PowerShell. Instalação mantém peers estritos e bloqueia builds de dependências desconhecidas; somente scripts Prisma 7.10.1 necessários foram explicitamente permitidos em `allowBuilds`. Não aprovar scripts adicionais em massa para resolver falhas.

## Ambientes separados

- **API:** criar manualmente `apps/api/.env` a partir dos nomes em `.env.example`, com valores locais próprios. `ConfigModule` carrega `.env` no diretório da aplicação durante a criação da aplicação; comandos pnpm filtrados usam esse diretório. Variáveis do processo têm precedência. A ausência de `.env` e de `DATABASE_URL` não impede o healthcheck. Testes E2E desativam explicitamente o carregamento de arquivo sem alterar o padrão da aplicação normal.
- **Prisma CLI:** `apps/api/prisma.config.ts` resolve explicitamente o `.env` e o schema relativos ao próprio arquivo, usando dotenv sem sobrescrever o ambiente. Validação e geração não exigem conexão. A URL é necessária para operações de banco.
- **Web:** Next.js carrega seus arquivos de ambiente dentro de `apps/web` pela precedência nativa. A página inicial não requer variáveis. Não copiar variáveis da API nem expor credenciais com `NEXT_PUBLIC_`. `.env.example` não é carregado automaticamente.
- **Compose:** usa explicitamente `--env-file apps/api/.env`. Variáveis exportadas no shell podem prevalecer; evitar valores de outros projetos. `POSTGRES_*` e `DATABASE_URL` precisam apontar para a mesma instância, porta e credenciais, com encoding de URL quando necessário.

Não há `.env` compartilhado na raiz. Nunca versionar valores reais; arquivos de exemplo contêm somente placeholders.

`PORT` ausente assume 3001. Quando definida, deve conter somente dígitos e representar um inteiro de 1 a 65535. Valor vazio, espaços, frações, texto e valores fora do intervalo causam erro de inicialização; não há fallback para configuração inválida. A porta validada pelo ConfigModule é usada pelo bootstrap. Testes HTTP usam porta efêmera diretamente no servidor de teste, sem permitir `PORT=0` na configuração da aplicação.

## PostgreSQL opcional para desenvolvimento do scaffold

Docker Compose foi escolhido apenas para reproduzir PostgreSQL localmente, com volume nomeado e porta vinculada a loopback. Não containerizar web/API nesta etapa. Docker não foi instalado automaticamente.

Com Docker/Compose disponíveis e o ambiente da API preenchido:

```text
docker compose --env-file apps/api/.env config --quiet
pnpm db:up
pnpm db:validate
pnpm db:generate
pnpm db:check
pnpm db:down
```

`db:check` compila a API e executa `SELECT 1` pelo Prisma/adapter PostgreSQL, sem alterar schema ou dados. O Node 24 usa `--env-file-if-exists=.env`: arquivo ausente é permitido e `DATABASE_URL` pode vir exclusivamente do processo; valores do processo prevalecem sobre o arquivo. URL ausente ou conexão inválida resulta em saída de erro sem imprimir credenciais. `db:down` preserva o volume; não usar `down -v` para rotina de parada. O volume usa `/var/lib/postgresql`, adequado à imagem PostgreSQL 18. A imagem está fixada por tag de versão; sua execução e atualização devem ser verificadas quando Docker estiver disponível.

O schema não contém entidades, migrations vazias ou seeds. O client gerado é ignorado. O healthcheck é liveness HTTP, não readiness do banco; não conecta nem importa o client Prisma.

## Geração Prisma reproduzível

`dev`, `typecheck`, `test`, `test:e2e` e `build` da API executam `db:ensure` antes de usar TypeScript. Esse comando gera o client se a saída estiver ausente, incompleta, alterada ou desatualizada; não exige ordem manual em checkout limpo. Um hash local em `.cache` considera schema, configuração, manifesto, versões instaladas Prisma/client, script de geração e conteúdo da saída. A geração limpa somente a pasta descartável `src/generated/prisma`, nunca schema, migrations ou dados.

Com entrada e saída inalteradas, comandos seguintes reutilizam o client sem repetir geração. `pnpm db:generate` é a operação explícita de regeneração forçada e atualiza o mesmo hash, portanto a etapa explícita do CI não é repetida por typecheck/test/build. A validação `db:validate` permanece independente, sem conexão ao banco. Nenhuma dependência foi adicionada para cache, descoberta de testes ou carregamento opcional de ambiente.

## Qualidade e estado das validações

```text
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Na implementação inicial Windows da CDC-004: instalação congelada sem alterar lockfile, lint, typecheck, quatro testes, builds das duas aplicações, validação/geração Prisma, API dev HTTP e web produção HTTP passaram. Após a auditoria, a suíte foi ampliada para cobrir isolamento de ambiente, PORT, diagnóstico de banco e geração Prisma reproduzível. YAML de CI/Compose foi parseado e revisado estaticamente. Isso não equivale a executar Docker Compose.

Após as correções, passaram `pnpm install --frozen-lockfile`, `pnpm db:validate`, `pnpm db:generate`, `pnpm lint`, `pnpm typecheck`, `pnpm test` (9 API + 1 web) e `pnpm build`. A suíte passou sem `apps/api/.env` e com arquivo físico sintético contendo PORT inválida e DATABASE_URL sintética. O arquivo foi criado com exclusividade, sem substituir arquivo existente, e removido somente após conferir seu conteúdo conhecido. Também passou typecheck iniciado sem client gerado nem saídas compiladas; o build seguinte reutilizou o client sem regenerar. Testes novos em subdiretórios foram descobertos automaticamente. Limpeza assíncrona e tentativas limitadas de remoção de fixtures tratam bloqueios Windows sem ignorar erros persistentes.

**Adiamento aceito pelo responsável:** a etapa de implementação local da CDC-004 está concluída com esta limitação documentada. Docker não foi encontrado no PATH. Docker Compose, conexão real com PostgreSQL e persistência do volume ainda não foram validados nem aprovados: não foram executados `docker compose config`, inicialização/health do container, persistência do volume ou `db:check` com PostgreSQL real.

A validação real do PostgreSQL é obrigatória antes de implementar funcionalidades dependentes de persistência, incluindo entidades, migrations e consultas. O adiamento não dispensa essa condição. Docker e alterações de infraestrutura local não devem ser instalados ou executados automaticamente; disponibilizar a infraestrutura depende de autorização específica do responsável.

**Pendências remotas:** workflow preparado, sem push/PR autorizado; não houve execução no GitHub nem configuração de required checks. Linux e macOS não foram executados localmente: a matriz CI está preparada para isso. Nenhum check executado permanece falhando; validações não executadas não são declaradas aprovadas.

Para revisão independente, Antigravity deve conferir instalação limpa, resolução de peers, scripts de ambiente, independência do healthcheck, isolamento dos testes, permissões e SHAs do workflow, ausência de conteúdo sensível e pendências de infraestrutura. Não presumir que os demais comentários P2/P3 da revisão anterior foram atendidos: o parecer integral ainda não foi fornecido.
