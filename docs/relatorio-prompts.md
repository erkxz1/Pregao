# Relatório de engenharia de prompts: Pregão

Registro dos prompts usados com o Claude no Projeto Integrador (Mini-Produto), na ordem em que foram enviados, com o objetivo de cada um, o que foi gerado e como o prompt poderia ser melhorado.

- **Ferramenta:** Claude (claude.ai)
- **Data da sessão:** 24/11/2026
- **Produto:** Pregão, leitor de edital para pequenos negócios (HTML/CSS/JS)

> Os prompts de ideação que geraram o texto inicial da startup foram feitos antes desta sessão. Acrescente-os na seção 0, para que o histórico fique completo.

---

## 0. Ideação (antes desta sessão)

| Item | Registro |
|---|---|
| Prompt | *(colar aqui os prompts usados para escolher o tema e gerar a ideia do Pregão)* |
| Resultado | Texto da ideia: problema, diferenciais, funcionalidades, modelo de negócio e nome |

---

## 1. Análise crítica da ideia

| Item | Registro |
|---|---|
| Horário | 12:37 |
| Prompt | `a ideia analise` + texto completo da ideia do Pregão colado em seguida |
| Objetivo | Validar se a ideia se sustenta antes de construir |
| Técnica | Contexto completo colado no prompt + pedido aberto |
| O que o Claude fez | Pesquisou na web e mostrou que resumo de edital por IA e alertas no WhatsApp já existem (ConLicitação, Effecti) e que o governo oferece de graça o Contrata+Brasil para MEIs em dispensas. Apontou riscos (qualidade dos dados do PNCP, marca genérica, preço do plano) e sugeriu reposicionamento |
| Aprendizado | Um pedido curto funcionou porque o contexto estava completo, mas o formato da resposta ficou a critério da IA |
| Versão melhorada | `Analise a viabilidade da startup abaixo como um investidor: concorrentes atuais no Brasil, riscos, modelo de receita e o que precisa mudar. Use fontes atuais e cite-as. Responda em tópicos, com um veredito no início.` |

## 2. Revisão do TAP e da SWOT/Canvas

| Item | Registro |
|---|---|
| Horário | 12:38 |
| Prompt | Envio dos arquivos `TAP_Pregao.docx` e `Pregao_SWOT_Canvas.pptx`, sem texto |
| Objetivo | Conferir se os documentos da disciplina estavam coerentes com a análise |
| Técnica | Arquivos anexados como contexto |
| O que o Claude fez | Leu os dois arquivos e apontou: modelo financeiro que não fecha (cerca de 340 assinantes para empatar), escopo grande para 2 pessoas, concorrente gratuito ausente e incoerências entre TAP e Canvas (marketing, success fee, suporte humano) |
| Aprendizado | Sem instrução, a IA precisou deduzir a intenção. Ela revisou e ofereceu alterar os arquivos, o que não era desejado (ver prompt 4) |
| Versão melhorada | `Revise a coerência entre o TAP e a SWOT/Canvas anexados. Liste inconsistências e lacunas em tabela. Não altere os arquivos.` |

## 3. Construção do protótipo

| Item | Registro |
|---|---|
| Horário | 12:40 |
| Prompt | Imagem do slide da atividade "10 Projeto Integrador: Mini-Produto", sem texto |
| Objetivo | Gerar o protótipo HTML/JS pedido na atividade |
| Técnica | Contexto visual: o slide trazia os passos, o prompt de exemplo e as dicas |
| O que o Claude fez | Adaptou a estrutura do prompt de exemplo (campo de texto, botão Analisar, resultado com barra colorida, histórico em tabela) para o Pregão: leitor de edital por regras, pontuação de 0 a 100, cofre de documentos, trechos-fonte, histórico e registro dos 3 testes com usuários |
| Aprendizado | A imagem bastou porque o slide já tinha um prompt-modelo. Faltou dizer a prioridade (visual ou funcionalidade) |
| Versão melhorada | `Com base na atividade da imagem, crie o protótipo HTML/JS do Pregão: 1) campo para colar o edital e botão Analisar; 2) resumo com órgão, objeto, valor, prazos e documentos exigidos; 3) pontuação de 0 a 100 com barra colorida e veredito; 4) checklist cruzado com os documentos que a empresa tem; 5) histórico das análises em tabela na própria página. Um único arquivo, visual caprichado, funcionando no celular.` |

## 4. Restrição de escopo

| Item | Registro |
|---|---|
| Horário | 12:47 |
| Prompt | `nao precisa alterar o tap/swot` |
| Objetivo | Deixar claro que os documentos da disciplina não deviam ser modificados |
| Técnica | Restrição negativa (o que **não** fazer) |
| Resultado | Os arquivos originais foram mantidos sem alteração |
| Aprendizado | Restrições funcionam melhor dentro do pedido original (ver versão melhorada do prompt 2) |

## 5. Iteração de design e checagem com a ideia

| Item | Registro |
|---|---|
| Horário | 12:48 |
| Prompt | `antes consegue melhoorar o site achei muito sem sal o layout o css etc parece muito simples e me fala se ta seguindo com a ideia` |
| Objetivo | Deixar o visual mais forte e verificar se o produto entregava a proposta da startup |
| Técnica | Feedback iterativo + pedido de verificação contra um requisito (a ideia original) |
| O que o Claude fez | Refez o layout: faixa com marca, medidor em arco, carimbo de veredito, cartões e tema escuro. Mapeou ideia vs. protótipo e acrescentou o que faltava: prévia do alerta no WhatsApp com "Quero participar" e o modo primeira licitação em 6 etapas. Explicou por que o preço sugerido ficou de fora (sem dados históricos reais, seria inventado) |
| Aprendizado | Pedir "confira se está seguindo a ideia" fez a IA comparar requisito por requisito e revelou duas funcionalidades esquecidas |
| Versão melhorada | `Refaça o visual com mais personalidade (cores fortes, tipografia marcante, um elemento visual central). Depois, compare o protótipo com as funcionalidades da ideia em uma tabela (feito / falta) e implemente o que for possível sem servidor.` |

## 6. Publicação no GitHub

| Item | Registro |
|---|---|
| Horário | 12:53 |
| Prompt | `quero postar no github` |
| Objetivo | Publicar o código e o site |
| O que o Claude fez | Preparou `index.html` e `README.md`, perguntou o método (navegador, conector ou manual) e a visibilidade, e deu o passo a passo com GitHub Pages |
| Aprendizado | Para ações fora da conversa (publicar, criar conta, enviar), a IA pergunta antes. Informar o método já no prompt economiza uma rodada |

## 7 e 8. Dúvidas de configuração

| Horário | Prompt | Resposta resumida |
|---|---|---|
| 12:56 | `uso gitinore?` | Não é necessário para um site estático. Só vale para arquivos do sistema ao usar Git local, e passa a ser obrigatório quando houver `.env` com chaves |
| 12:56 | `uso qual` | Na criação do repositório: README desmarcado, .gitignore *None*, licença *None* ou *MIT* |

**Aprendizado:** perguntas curtas funcionam quando o contexto da conversa é claro. "Uso qual" só foi entendido porque vinha logo depois da criação do repositório.

## 9. Estrutura completa do repositório

| Item | Registro |
|---|---|
| Horário | 12:59 |
| Prompt | `tem como deixar mais amplo sem so o index?` |
| Objetivo | Repositório com cara de projeto real, não um arquivo solto |
| O que o Claude fez | Separou o código em `css/` e `js/` (utilitários, dados, analisador e interface), criou `assets/` com logo e prints de tela, `docs/` com este relatório, o roteiro de testes e os documentos originais, além de `.gitignore` e README completo |

---

## Prompt consolidado

Se fosse refazer o produto num único pedido, este seria o prompt:

```
Vamos criar o Pregão: leitor de edital para MEIs e pequenas empresas.

1) Interface HTML/CSS/JS (sem servidor): campo para colar o edital, 3 editais
   fictícios de exemplo e botão "Analisar e salvar".
2) Extraia por regras: órgão, objeto, modalidade, número, valor, datas e
   documentos de habilitação. Mostre o trecho do edital de cada achado.
3) Pontuação de 0 a 100 com medidor colorido e veredito (vale a pena / avalie
   com cuidado / alto risco / prazo encerrado), considerando documentos que
   faltam, armadilhas (visita técnica, garantia, amostra, prazo curto, multa) e
   pontos a favor (exclusivo ME/EPP, dispensa).
4) "Cofre de documentos" com caixas de seleção que recalculam a pontuação.
5) Prévia do alerta no WhatsApp com resposta "Quero participar" e o modo
   "primeira licitação" em etapas.
6) Histórico das análises e registro de 3 testes com usuários, em tabelas na
   própria página.
Use as regras da Lei 14.133/2021 (valores de 2026) e da LC 123/2006.
Visual marcante, tema claro e escuro, funcionando no celular.
```

## Lições gerais

1. **Contexto primeiro:** colar a ideia, os documentos e a atividade fez as respostas saírem específicas, sem respostas genéricas.
2. **Dizer o que não fazer** evita retrabalho (prompt 4).
3. **Pedir verificação contra o requisito** ("está seguindo a ideia?") encontra lacunas que passariam despercebidas.
4. **Iterar em ciclos curtos:** analisar, construir, criticar e refazer funcionou melhor do que tentar acertar tudo no primeiro prompt.
5. **Desconfiar de números inventados:** a IA deixou o preço sugerido de fora por falta de dados reais. Esse critério deve valer para todo o projeto.
