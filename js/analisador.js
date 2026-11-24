/* Pregão — motor de análise do edital por regras */
'use strict';
const norm=t=>{let o='';for(let i=0;i<t.length;i++){const n=t[i].normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();o+=n.length===1?n:(n[0]||' ')}return o};
const excerpt=(T,i)=>{if(i<0)return'';const a=Math.max(0,i-140),b=Math.min(T.length,i+200);const s=T.slice(a,i),e=T.slice(i,b);const p=Math.max(s.lastIndexOf('. '),s.lastIndexOf('\n'),s.lastIndexOf('; '));const st=p>=0?a+p+1:a;const q=e.search(/[.;\n]/);const en=q>=0?i+q+1:b;return T.slice(st,en).replace(/\s+/g,' ').trim()};

let cofre=store.get('pregao.cofre.v1',DOCS.filter(d=>d.def).map(d=>d.id));

function analyze(T){
  const N=norm(T);let m;
  let mod=null,mi=1e9;for(const[k,v]of MODS){const i=N.indexOf(k);if(i>=0&&i<mi){mi=i;mod=v}}
  const num=(m=/\bn\s*[º°o.]\s*(\d{1,5}\/\d{4})/.exec(N))?m[1]:'';
  let orgao='Órgão não identificado';
  if(m=/(prefeitura municipal de|munic[ií]pio de|c[aâ]mara municipal de|governo do estado d[eo]|secretaria (?:municipal|estadual) de)\s+([^\n,.;]{2,80})/i.exec(T))orgao=(m[1]+' '+m[2].split(/\s[-–—]\s/)[0]).trim();
  let objeto='Objeto não identificado';
  if(m=/\bobjeto\b[^:\n]{0,30}:\s*/.exec(N)){const st=m.index+m[0].length;const rest=T.slice(st,st+300);const q=rest.search(/\.\s|\n/);objeto=(q>0?rest.slice(0,q):rest).trim();objeto=objeto.charAt(0).toUpperCase()+objeto.slice(1)}
  if(objeto.length>170)objeto=objeto.slice(0,167).trim()+'…';
  const vals=[];const reV=/r\$\s*([\d.]+,\d{2})/g;while(m=reV.exec(N))vals.push({v:parseFloat(m[1].replace(/\./g,'').replace(',','.')),i:m.index});
  const val=vals.find(x=>/valor (estimado|global|total|maximo|de referencia)/.test(N.slice(Math.max(0,x.i-80),x.i)))||vals.slice().sort((a,b)=>b.v-a.v)[0]||null;
  const dates=[];const reD=/(\d{2})\/(\d{2})\/(\d{4})/g;
  while(m=reD.exec(N)){const d=new Date(+m[3],+m[2]-1,+m[1]);if(isNaN(d))continue;const before=N.slice(Math.max(0,m.index-120),m.index).split(/[.;\n]/).pop();let tipo='Data citada';
    if(/abertura|sessao publica|disputa/.test(before))tipo='Abertura da sessão';else if(/proposta/.test(before))tipo='Envio de propostas';else if(/impugna|esclarec/.test(before))tipo='Impugnação e esclarecimentos';else if(/visita/.test(before))tipo='Visita técnica';
    dates.push({d,tipo,dias:Math.round((d-today)/DAY),i:m.index})}
  const main=dates.filter(x=>x.tipo==='Envio de propostas'||x.tipo==='Abertura da sessão');const pool=main.length?main:dates;
  const key=pool.slice().sort((a,b)=>a.d-b.d).find(x=>x.dias>=0)||pool.slice().sort((a,b)=>b.d-a.d)[0]||null;
  const exclM=/exclusiv\w*[^.]{0,80}(microempresa|\bme\b|me\/epp|pequeno porte)|cota reservada/.exec(N);
  const portal=(PORTAIS.find(([r])=>r.test(N))||[])[1]||'';
  const req=DOCS.map(d=>{const r=d.re.exec(N);return r?{...d,i:r.index,tem:cofre.includes(d.id)}:null}).filter(Boolean);
  const missing=req.filter(d=>!d.tem);
  const risks=[];const add=(sev,title,tip,i)=>risks.push({sev,title,tip,i});
  if(m=/visita tecnica/.exec(N)){const opt=/facultativ|opcional/.test(N.slice(m.index,m.index+90));add(opt?'baixo':'medio',opt?'Visita técnica facultativa':'Visita técnica obrigatória',opt?'Não é obrigatória, mas ajuda a orçar sem surpresas.':'Reserve tempo e deslocamento. Sem a visita, a empresa pode ser inabilitada.',m.index)}
  if(m=/amostra/.exec(N))add('medio','Exige amostra do produto','Tenha o item pronto para entregar no prazo que o edital fixar.',m.index);
  if(m=/garantia (contratual|de execucao|da proposta|de proposta)|caucao|seguro.garantia/.exec(N))add('alto','Exige garantia financeira','Caução, seguro-garantia ou fiança prendem dinheiro. Consulte o custo antes de entrar.',m.index);
  let entrega=null;
  if(m=/prazo (maximo )?(de|para) (entrega|inicio|execucao|fornecimento)[^.]{0,60}?(\d{1,3})\s*(\([^)]*\))?\s*(dias|horas)/.exec(N)){const n=+m[4],h=m[6]==='horas';entrega=`${n} ${m[6]}`;if((h&&n<=72)||(!h&&n<=5))add('medio',`Prazo curto: ${n} ${m[6]}`,'Confirme estoque ou equipe disponível antes de dar o lance.',m.index)}
  let pagto=null;
  if(m=/pagamento[^.]{0,80}?(\d{2,3})\s*(\([^)]*\))?\s*dias/.exec(N)){pagto=+m[1];if(pagto>30)add('baixo',`Pagamento em até ${pagto} dias`,'Você entrega antes de receber: planeje o caixa.',m.index)}
  if(m=/multa[^.]{0,50}?(\d{1,2}(?:,\d+)?)\s*%/.exec(N)){const p=parseFloat(m[1].replace(',','.'));if(p>=10)add('medio',`Multa de ${m[1]}%`,'Atraso ou falha pode custar caro. Leia a cláusula de sanções.',m.index)}
  if(m=/registro de precos/.exec(N))add('baixo','Ata de registro de preços','O órgão compra conforme a necessidade: a quantidade estimada não é garantida.',m.index);
  if(val&&val.v>1e6)add('alto','Valor alto para pequeno negócio','Contratos grandes pedem capacidade financeira e equipe maiores.',val.i);
  const closed=!!(key&&key.dias<0);
  if(key&&key.dias>=0&&key.dias<3)add('medio',key.dias===0?'O prazo é hoje':`Faltam ${key.dias} dia${key.dias>1?'s':''}`,'Pouco tempo para juntar documentos e montar a proposta.',key.i);
  const isDisp=!!(mod&&mod.startsWith('Dispensa'));
  const pros=[];
  if(exclM)pros.push({t:'Exclusiva para ME/EPP',d:'Você disputa só com empresas do seu porte.',i:exclM.index});
  if(isDisp)pros.push({t:'Contratação por dispensa',d:'Processo mais curto e com menos etapas que um pregão.',i:mi});
  if(val&&val.v<=LIM_HAB)pros.push({t:`Abaixo de ${brl(LIM_HAB)}`,d:'Até 1/4 do limite de dispensa, a habilitação pode ser dispensada, total ou parcialmente (Lei 14.133, art. 70, III).',i:val.i});
  if(req.length&&!missing.length)pros.push({t:'Cofre completo',d:'Você já tem todos os documentos que o edital pede.',i:-1});
  if(!exclM&&!isDisp&&mod&&val&&val.v<=LIM_EXCL)pros.push({t:'Confira a exclusividade',d:'Em regra, itens de até R$ 80 mil são exclusivos para ME/EPP (LC 123, art. 48, I). Veja se o edital justifica a exceção.',i:val.i});
  let s=70;if(exclM)s+=12;if(isDisp)s+=6;if(mod==='Concorrência')s-=8;
  missing.forEach(d=>s-=d.w);risks.forEach(r=>s-=W[r.sev]);
  s=Math.max(0,Math.min(100,Math.round(s)));if(closed)s=Math.min(s,10);
  const cls=closed?'off':s>=70?'ok':s>=45?'warn':'bad';
  const verdict=closed?'Prazo encerrado':s>=70?'Vale a pena disputar':s>=45?'Avalie com cuidado':'Alto risco';
  const why=closed?'O prazo principal deste edital já passou.':s>=70?'Poucos obstáculos para o seu perfil. Prepare a proposta.':s>=45?'Dá para participar, mas resolva os pontos abaixo antes.':'Muitas exigências para um pequeno negócio hoje.';
  return{T,orgao,objeto,mod,num,val:val?val.v:null,dates,key,req,missing,risks,pros,s,cls,verdict,why,portal,entrega,pagto,closed};
}

