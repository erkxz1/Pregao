# 🧪 Testes com usuários: Pregão

> [!NOTE]
> **Testes simulados.** Os três participantes abaixo são **personas fictícias**. Elas foram criadas para ilustrar o roteiro e os resultados esperados do protótipo. Nomes, falas e notas não vêm de pessoas reais.

## 📋 Resumo

| Indicador | Resultado |
|---|---|
| 👥 Participantes | 3 (1 MEI, 1 microempresa, 1 pessoa que nunca participou de licitação) |
| ⭐ Nota média de utilidade | **4,0 / 5** |
| 🧠 Entenderam o resultado sem ajuda | **2 de 3** |
| ✅ Tarefas concluídas sem ajuda | **16 de 18** (89%) |
| 💰 Pagariam pelo serviço | **2 de 3**, entre R$ 29 e R$ 49 por mês |

---

## 👤 Participantes

### 1. Maria das Graças · MEI de produtos de limpeza
*47 anos, vende para mercadinhos do bairro e nunca participou de licitação.*

| Nota | Entendeu sozinha? | Pagaria? |
|:---:|:---:|:---:|
| ⭐⭐⭐⭐☆ **4** | ✅ Sim | R$ 29/mês |

> 💬 *"Gostei do carimbo, a gente bate o olho e já sabe. Só não sei o que é CNDT, tive que adivinhar."*

- **Onde travou:** na tarefa 4. Não viu de primeira o cofre de documentos, que fica abaixo do campo do edital, e precisou rolar a página.
- **Sugestão:** explicar cada certidão com uma frase simples e dizer onde tirar.

### 2. João Batista · Microempresa de refrigeração
*52 anos, dono de uma oficina de ar-condicionado com 3 funcionários. Já perdeu uma dispensa por falta de certidão.*

| Nota | Entendeu sozinho? | Pagaria? |
|:---:|:---:|:---:|
| ⭐⭐⭐⭐⭐ **5** | ✅ Sim | R$ 49/mês |

> 💬 *"Se eu tivesse isso antes, não tinha perdido aquela da prefeitura. O trecho do edital embaixo de cada item é o que me dá confiança."*

- **Onde travou:** em nenhuma tarefa. Achou a pontuação **48** baixa para um serviço que ele faz todo dia e perguntou quanto cada item tirava.
- **Sugestão:** mostrar quantos pontos cada documento ou risco desconta, e receber o alerta no WhatsApp de verdade.

### 3. Ana Clara · Estudante de Administração
*22 anos, ajuda a tia, que tem uma confeitaria, mas nunca leu um edital.*

| Nota | Entendeu sozinha? | Pagaria? |
|:---:|:---:|:---:|
| ⭐⭐⭐☆☆ **3** | ❌ Não | Só a versão gratuita |

> 💬 *"O visual é bonito, mas eu não sabia o que era dispensa nem habilitação. E achei que o WhatsApp ia mandar mensagem pra mim."*

- **Onde travou:** na tarefa 2, porque não entendeu os termos "dispensa" e "habilitação", e na tarefa 5, porque achou que a conversa do WhatsApp era real.
- **Sugestão:** um glossário com os termos de licitação e um aviso mais visível de que o WhatsApp é só uma prévia.

---

## ✅ Desempenho por tarefa

Edital usado: exemplo **Dispensa: ar-condicionado**.

| # | Tarefa | Maria | João | Ana |
|---|---|:---:|:---:|:---:|
| 1 | Escolher o exemplo *Dispensa: ar-condicionado* | ✅ | ✅ | ✅ |
| 2 | Dizer se vale a pena participar e por quê | ✅ | ✅ | ❌ |
| 3 | Encontrar os documentos que faltam | ✅ | ✅ | ✅ |
| 4 | Marcar a certidão estadual no cofre | ⚠️ | ✅ | ✅ |
| 5 | Responder ao alerta do WhatsApp com "Quero participar" | ✅ | ✅ | ❌ |
| 6 | Analisar, salvar e achar o histórico | ✅ | ✅ | ✅ |

✅ concluiu sozinho(a) · ⚠️ concluiu com dificuldade · ❌ precisou de ajuda

**O que o site mostrou nas tarefas 2 a 4:** pontuação **48/100**, carimbo *Avalie com cuidado* e 2 documentos faltando (certidão estadual e atestado de capacidade técnica). Depois de marcar a certidão estadual, a pontuação subiu para **58/100**, e os três participantes perceberam a mudança.

---

## 📤 Registro no site

Texto no formato do botão **Copiar resultados dos testes**:

```
Teste 1: Maria das Graças (MEI) - nota 4/5 - entendeu sem ajuda: Sim - "Explicar o que é cada certidão e onde tirar"
Teste 2: João Batista (Microempresa) - nota 5/5 - entendeu sem ajuda: Sim - "Mostrar quanto cada item desconta da pontuação"
Teste 3: Ana Clara (Estudante ou outro) - nota 3/5 - entendeu sem ajuda: Não - "Glossário dos termos e aviso de que o WhatsApp é simulado"
```

---

## 🎯 Conclusões

### 👍 O que funcionou
- **O carimbo e o medidor** passam o veredito em segundos. Os três entenderam a cor antes de ler o texto.
- **O trecho do edital em cada item** foi o que mais deu confiança ao participante com experiência (João).
- **O cofre que recalcula a pontuação** deixou claro que dá para melhorar a chance juntando documentos.

### 🔧 O que mudar na próxima versão

| Prioridade | Mudança | Por quê |
|:---:|---|---|
| 🔴 Alta | Glossário com termos como *dispensa*, *habilitação* e *CNDT*, com uma linha de explicação ao passar o mouse ou tocar | Foi a maior causa de travamento (Maria e Ana) |
| 🔴 Alta | Aviso fixo no topo da prévia do WhatsApp: "Simulação" | Ana achou que receberia mensagem de verdade |
| 🟡 Média | Mostrar quantos pontos cada item desconta | João quis entender por que a nota foi 48 |
| 🟡 Média | Levar o cofre para perto do resultado, ou pôr um atalho "Ajustar meus documentos" | Maria não encontrou o cofre de primeira |
| 🟢 Baixa | Link para tirar cada certidão (Receita, Caixa, TST, Sefaz) | Pedido de Maria, ajuda quem nunca tirou as certidões |

### 💡 Validação do modelo de negócio
Dois dos três pagariam, entre **R$ 29 e R$ 49 por mês**, perto do piso do plano previsto (R$ 49 a R$ 99). Esse resultado reforça a ideia de manter um plano gratuito para quem ainda não vendeu ao governo e cobrar de quem já participa.
