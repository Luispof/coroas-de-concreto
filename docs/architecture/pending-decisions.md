# Decisões pendentes

Estas decisões não foram aprovadas pela escolha da stack. Registrar a resolução em ADR antes de implementar o trecho dependente.

| Decisão | Questões a resolver | Momento limite |
|---|---|---|
| Hospedagem e topologia | Provedores, orçamento, origem de web/API, proxy ou CORS, TLS, conexão PostgreSQL, cache e observabilidade | Antes do deploy; origem/proxy antes da integração web/API |
| Estratégia editorial | Quem aprova conteúdo público, fonte autorizada, como carregar/atualizar dados sem API administrativa e como corrigir/remover conteúdo | Antes de carregar conteúdo real |
| Ambiente executável | Versões compatíveis de Node/pnpm/frameworks/Prisma/PostgreSQL, execução local do banco e comandos portáveis | Na tarefa de scaffold |
| Operação de dados | Aplicação de migrations, credenciais com privilégios mínimos, backups e recuperação | Antes de ambiente persistente público |

O responsável pelo projeto aprova hospedagem e estratégia editorial. Nenhum provedor, serviço pago, processo de seed em produção ou mecanismo de publicação foi escolhido nesta tarefa.

Enquanto a estratégia editorial não estiver resolvida, validações de desenvolvimento devem usar exclusivamente dados sintéticos produzidos para testes, sem consultar materiais privados. Reavaliar paginação se o catálogo crescer; autenticação, administração e real-time exigem novo escopo e ADR antes de implementação.
