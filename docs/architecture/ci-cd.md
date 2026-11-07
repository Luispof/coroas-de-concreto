# Integração contínua, proteção da main e CD futuro

## CI implementado

O workflow [CI](../../.github/workflows/ci.yml) executa em `pull_request` destinado à `main` e em `push` para `main`. A matriz Ubuntu, Windows e macOS executa instalação com lockfile congelado, validação/geração Prisma sem conexão ao banco, lint, typecheck, testes e build. A execução após merge verifica o estado integrado. Não há filtros por caminho que deixem checks obrigatórios permanentemente pendentes.

Cada etapa obrigatória falha pelo código de saída. Não há `continue-on-error`. `fail-fast: false` permite obter o diagnóstico das outras plataformas sem converter falhas em sucesso. Cancelamento por concorrência substitui execuções antigas do mesmo ref, sem aprovar execuções canceladas.

O token recebe apenas `contents: read`; checkout usa `persist-credentials: false`. Actions oficiais de checkout/setup-node e a Action mantida pelo pnpm estão fixadas por SHA confirmado nos repositórios de origem. Atualizações de SHA exigem revisão. Não há deploy, segredos, OIDC, permissões de escrita, cache compartilhado ou upload de artefatos. PRs de forks são código não confiável: usar runners hospedados descartáveis e `pull_request`, nunca `pull_request_target` para executar seu código. A aprovação de workflows de contribuidores externos continua sob controle do GitHub/responsável.

## Configuração remota pelo responsável

Nenhuma configuração remota é alterada na CDC-004. Após autorização de publicação e uma execução do workflow:

1. Em Settings → Rules → Rulesets (ou Branch protection), criar regra para `main`.
2. Exigir Pull Request e revisão antes de merge; impedir force push e exclusão. Definir revisores conforme quem tiver acesso, sem presumir conta do Antigravity.
3. Exigir os checks `quality (ubuntu-latest)`, `quality (windows-latest)` e `quality (macos-latest)`, selecionando os nomes exibidos pela primeira execução de CI. Exigir branch atualizada antes do merge; incluir administradores na regra quando aplicável.
4. Não exigir histórico linear, pois conflita com merge commits aprovados. Manter merge commits habilitados e desabilitar squash como padrão de integração, conforme política do projeto.
5. Confirmar que falha em qualquer plataforma bloqueia merge e que PRs externos não recebem segredos. Revalidar nomes dos required checks se jobs forem renomeados.

Configuração de proteção pode depender das funcionalidades disponíveis para a conta/repositório. Até ser aplicada, o workflow informa falhas, mas não impede tecnicamente um merge manual. A política continua proibindo integrar com checks obrigatórios falhando.

## CD somente documentado

Hospedagem ainda é pendente. Introduzir CD em tarefa própria após definir infraestrutura, staging e produção separados, credenciais de privilégio mínimo e processo de promoção. Produção exige aprovação explícita do responsável até uma nova política formal. Não criar ambientes remotos ou credenciais nesta etapa.

Uma falha de deploy deve impedir promoção; planejar recuperação/rollback de aplicação e compatibilidade de migrations antes de habilitar produção. Não assumir que reverter binários desfaz alterações destrutivas de banco. Nunca publicar materiais privados de RPG, logs sensíveis ou arquivos de ambiente.

Codex implementa e valida; Antigravity faz revisão independente; o responsável aprova a integração e as ações externas.
