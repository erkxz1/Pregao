/* Pregão — documentos, modalidades, portais e editais de exemplo (fictícios) */
'use strict';
const DOCS=[
{id:'cnpj',label:'Comprovante de inscrição no CNPJ',re:/cnpj|cadastro nacional da pessoa juridica/,w:8,def:1},
{id:'ato',label:'Ato constitutivo ou CCMEI',re:/ato constitutivo|contrato social|estatuto social|ccmei|condicao de microempreendedor/,w:8,def:1},
{id:'fed',label:'Certidão federal (Receita e PGFN)',re:/receita federal|divida ativa da uniao|pgfn|tributos federais|fiscal federal|fazendas? federal/,w:10,def:1},
{id:'fgts',label:'Regularidade do FGTS (CRF)',re:/fgts|\bcrf\b/,w:10,def:1},
{id:'cndt',label:'Certidão trabalhista (CNDT)',re:/cndt|debitos trabalhistas|justica do trabalho/,w:10,def:1},
{id:'est',label:'Certidão estadual',re:/fazenda estadual|tributos estaduais|certidao estadual|regularidade estadual|federal, estadual/,w:10,def:0},
{id:'mun',label:'Certidão municipal',re:/fazenda municipal|tributos municipais|certidao municipal|regularidade municipal|estadual e municipal/,w:10,def:1},
{id:'fal',label:'Certidão negativa de falência',re:/falencia|recuperacao judicial/,w:8,def:0},
{id:'atest',label:'Atestado de capacidade técnica',re:/atestados? de capacidade|capacidade tecnica/,w:12,def:0},
{id:'bal',label:'Balanço patrimonial',re:/balanco patrimonial|demonstracoes contabeis/,w:12,def:0},
{id:'cons',label:'Registro em conselho (CREA, CAU etc.)',re:/\bcrea\b|\bcau\b|conselho regional|registro profissional/,w:12,def:0},
{id:'alv',label:'Alvará ou licença sanitária',re:/alvara|licenca sanitaria|vigilancia sanitaria|licenca de funcionamento/,w:8,def:0}
];
const MODS=[['pregao eletronico','Pregão eletrônico'],['pregao presencial','Pregão presencial'],['dispensa eletronica','Dispensa eletrônica'],['dispensa de licitacao','Dispensa de licitação'],['concorrencia','Concorrência'],['credenciamento','Credenciamento'],['inexigibilidade','Inexigibilidade'],['leilao','Leilão'],['dialogo competitivo','Diálogo competitivo']];
const PORTAIS=[[/compras\.gov\.br|comprasnet|comprasgov/,'Compras.gov.br'],[/portal de compras publicas/,'Portal de Compras Públicas'],[/licitanet/,'Licitanet'],[/\bbll\b/,'BLL Compras'],[/licitacoes-e/,'Licitações-e'],[/\bbnc\b/,'BNC']];

const SAMPLES=[
{nome:'Pregão: material de limpeza',txt:()=>`PREFEITURA MUNICIPAL DE SÃO JOSÉ DAS PALMEIRAS (fictícia)
PREGÃO ELETRÔNICO Nº 041/2026 - SISTEMA DE REGISTRO DE PREÇOS

OBJETO: Registro de preços para aquisição de material de limpeza e higiene para as escolas da rede municipal de ensino.
Valor estimado da contratação: R$ 58.430,00.
Licitação exclusiva para participação de microempresas e empresas de pequeno porte, nos termos do art. 48, I, da Lei Complementar nº 123/2006.
Pedidos de esclarecimento e impugnação até ${plus(6)}.
Recebimento das propostas até ${plus(9)} às 08h00. Abertura da sessão pública: ${plus(9)} às 09h00, no Portal de Compras Públicas.
HABILITAÇÃO: ato constitutivo ou CCMEI; prova de inscrição no CNPJ; certidão conjunta de débitos relativos a tributos federais e à dívida ativa da União; certificado de regularidade do FGTS (CRF); certidão negativa de débitos trabalhistas (CNDT); certidão de regularidade com a Fazenda Municipal.
Prazo de entrega: até 10 (dez) dias após o recebimento da ordem de fornecimento.
Pagamento em até 30 (trinta) dias após o atesto da nota fiscal.
Multa de 0,5% por dia de atraso, limitada a 10 dias.`},
{nome:'Dispensa: ar-condicionado',txt:()=>`MUNICÍPIO DE BOA VISTA DO SERTÃO (fictício) - SECRETARIA MUNICIPAL DE SAÚDE
DISPENSA ELETRÔNICA Nº 017/2026

Objeto: contratação de serviço de manutenção preventiva e corretiva de 24 aparelhos de ar-condicionado das unidades de saúde.
Valor máximo aceitável: R$ 21.900,00.
Período para envio de propostas: até ${plus(4)} às 10h00, pelo Compras.gov.br.
Exigências: prova de inscrição no CNPJ; certidão de regularidade fiscal federal (Receita Federal e PGFN); regularidade do FGTS; certidão negativa de débitos trabalhistas; certidão de regularidade com a Fazenda Estadual; atestado de capacidade técnica comprovando serviço similar.
Visita técnica facultativa, que poderá ser agendada até ${plus(2)}.
Pagamento em até 45 (quarenta e cinco) dias após a execução do serviço.`},
{nome:'Concorrência: reforma de UBS',txt:()=>`PREFEITURA MUNICIPAL DE LAGOA DOS IPÊS (fictícia)
CONCORRÊNCIA ELETRÔNICA Nº 003/2026

OBJETO: Reforma e ampliação da Unidade Básica de Saúde do distrito de Lagoa Seca, com fornecimento de material e mão de obra.
Valor estimado da contratação: R$ 1.284.600,00.
Abertura da sessão pública: ${plus(21)} às 09h00.
Habilitação: contrato social; CNPJ; certidões de regularidade com as Fazendas federal, estadual e municipal; FGTS; CNDT; certidão negativa de falência; balanço patrimonial do último exercício; registro da empresa no CREA ou CAU; atestados de capacidade técnico-profissional e técnico-operacional.
Visita técnica obrigatória, sob pena de inabilitação.
Será exigida garantia contratual de 5% do valor do contrato.
Prazo de execução: 180 (cento e oitenta) dias.
Multa de 10% sobre o valor do contrato em caso de inexecução.`}
];

