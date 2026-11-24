# Pregão: leitor de edital para pequenos negócios

> Venda para o governo sem medo de edital.

Protótipo em HTML/JS do **Pregão**, um radar de oportunidades em compras públicas para MEIs e pequenas empresas que nunca venderam ao governo. Você cola o texto de um edital e a página mostra o que ele pede, quais prazos importam e se vale a pena disputar.

Projeto Integrador (Mini-Produto) da disciplina **Ferramentas de IA e Chatbots**, Bacharelado em Inteligência Artificial.

## Equipe

- Pedro Henrique Rocha Silva: Product Owner / CEO
- Erik França Nunes: Tech Lead / CTO

## Funcionalidades

- **Resumo em uma tela:** órgão, objeto, modalidade, número do edital, valor e próximo prazo.
- **Pontuação de viabilidade (0 a 100)** com medidor colorido e carimbo de veredito: *Vale a pena disputar*, *Avalie com cuidado*, *Alto risco* ou *Prazo encerrado*.
- **Cofre de documentos:** você marca as certidões que já tem e a página mostra o que falta. A pontuação se recalcula na hora.
- **Pontos de atenção:** visita técnica, amostra, garantia financeira, prazo curto, pagamento longo, multa alta e registro de preços, cada um com o trecho do edital de onde saiu.
- **Prévia do alerta no WhatsApp** (simulada), com as respostas *Quero participar*, *Ver pontos de atenção* e *Agora não*.
- **Modo primeira licitação:** caminho em 6 etapas, do cadastro no portal até o recebimento do pagamento.
- **Histórico das análises** em tabela, com opção de copiar para planilha.
- **Registro dos testes com usuários** (nota, compreensão e comentário), com contador de 3 testes.
- Três **editais fictícios de exemplo** para testar.

## Como usar

1. Abra o `index.html` no navegador ou acesse o link do GitHub Pages.
2. Escolha um edital de exemplo ou cole o texto de um edital real (no PDF: Ctrl+A, Ctrl+C e cole).
3. Marque no cofre os documentos que sua empresa já tem.
4. Clique em **Analisar e salvar**.

Não precisa instalar nada: é um único arquivo HTML, com CSS e JavaScript embutidos.

## Como funciona

A análise roda inteira no navegador, por **regras de leitura de texto** (palavras-chave e expressões regulares): datas, valores em R$, modalidades, certidões exigidas e cláusulas de risco. Cada achado aponta o trecho do edital de onde saiu, para que o usuário confira.

Referências usadas nas regras:

- Lei 14.133/2021 (Nova Lei de Licitações), com os valores de 2026 do Decreto 12.807/2025. O limite de dispensa para compras e serviços é R$ 65.492,11, e abaixo de 1/4 desse valor a habilitação pode ser dispensada (art. 70, III).
- LC 123/2006, art. 48, I: em regra, itens de até R$ 80 mil são exclusivos para ME/EPP.

## Limitações do protótipo

- A leitura é feita por regras, não por um modelo de linguagem. Na versão completa, a leitura ficará com uma IA, com o mesmo princípio de mostrar a fonte de cada achado.
- A conversa no WhatsApp é uma simulação visual.
- O preço sugerido ainda não está incluído, porque depende do histórico de preços vencedores do PNCP.
- Histórico e testes ficam salvos apenas no navegador de quem usa (localStorage).
- Não substitui a leitura completa do edital. A decisão de participar é sempre do fornecedor.

## Tecnologias

HTML5, CSS3 e JavaScript puro. Fontes Red Hat Display e Red Hat Text (Google Fonts).
