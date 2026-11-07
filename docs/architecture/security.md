# Proteção de conteúdo e arquivos sensíveis

O repositório e o catálogo do MVP são públicos. Não acessar materiais privados de RPG para produzir código, documentação, fixtures ou seeds. Não incluir spoilers, informações de jogadores, credenciais ou dados corporativos em nenhum artefato.

## Regras de exclusão

O `.gitignore` cobre ambientes locais (`.env` e variantes), chaves, certificados, keystores, dumps e backups conhecidos, além de logs e caches. `.env.example` é uma exceção deliberada: somente nomes de variáveis e placeholders sem valores reais podem ser versionados.

Migrations SQL futuras devem ser versionadas e conter somente mudanças estruturais ou dados públicos aprovados; por isso não existe uma exclusão geral de `*.sql`. Um dump em formato não coberto continua proibido. Configurações compartilháveis de editor também precisam de revisão: não incluir caminhos pessoais ou segredos.

## Revisão antes de cada commit

1. Inspecionar `git status` e `git diff --cached --name-only`.
2. Ler integralmente `git diff --cached` e revisar credenciais, dados privados e spoilers, independentemente das regras de ignore.
3. Executar as validações pertinentes e `git diff --cached --check`.
4. Registrar apenas uma mudança coerente e validada.

O ignore não remove arquivos já rastreados, não impede `git add -f` e não detecta conteúdo sensível em arquivos permitidos. Não é uma garantia de segurança. Se uma credencial for exposta, interromper a publicação e revogá-la; não presumir que removê-la em um commit posterior elimina a exposição.

A base pública deve conter exclusivamente conteúdo aprovado para divulgação. Não armazenar segredos em colunas ocultas, campos extras, logs, respostas de erro ou metadados. A API pública de leitura não elimina a necessidade de proteger as credenciais e os privilégios do banco.
