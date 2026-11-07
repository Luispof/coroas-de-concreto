# Decisões pendentes

Estas decisões não foram aprovadas pela escolha da stack. Registrar a resolução em ADR antes de implementar o trecho dependente.

| Decisão | Questões a resolver | Momento limite |
|---|---|---|
| Hospedagem e topologia | Provedores, orçamento, origem de web/API, proxy ou CORS, TLS, conexão PostgreSQL, cache e observabilidade | Antes do deploy; origem/proxy antes da integração web/API |
| Estratégia editorial | Quem aprova conteúdo público, fonte autorizada, como carregar/atualizar dados sem API administrativa e como corrigir/remover conteúdo | Antes de carregar conteúdo real |
| Validação da infraestrutura local | Adiamento aceito para concluir a implementação local da CDC-004. Docker Compose, conexão PostgreSQL real e persistência do volume não foram validados nem aprovados; não alterar infraestrutura automaticamente | Validação real do PostgreSQL obrigatória antes de implementar entidades, migrations, consultas ou qualquer funcionalidade dependente de persistência |
| Execução CI e proteção da main | Workflow definido; publicação e configuração remota exigem autorização, com confirmação dos checks nas três plataformas | Antes de integrar a CDC-004 |
| Operação de dados | Aplicação de migrations, credenciais com privilégios mínimos, backups e recuperação | Antes de ambiente persistente público |

O responsável pelo projeto aprova hospedagem e estratégia editorial. Nenhum provedor, serviço pago, processo de seed em produção ou mecanismo de publicação editorial foi escolhido. Compose é somente infraestrutura local. CD fica documental até definir staging e produção, com aprovação explícita para produção e recuperação/rollback.

Enquanto a estratégia editorial não estiver resolvida, validações de desenvolvimento devem usar exclusivamente dados sintéticos produzidos para testes, sem consultar materiais privados. Reavaliar paginação se o catálogo crescer; autenticação, administração e real-time exigem novo escopo e ADR antes de implementação.
