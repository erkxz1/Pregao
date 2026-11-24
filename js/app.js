/* Pregão — interface: resultado, WhatsApp, primeira licitação, histórico e testes */
'use strict';

// Rótulos das tabelas no celular
new MutationObserver(()=>{for(const c of document.querySelectorAll('.stack td:not([data-l])')){let i=0,p=c;while(p=p.previousElementSibling)i+=p.colSpan;c.dataset.l=c.closest('table').rows[0].cells[i]?.textContent||''}}).observe(document,{childList:true,subtree:true})

const gauge=(s,cls)=>{const a=v=>{const t=Math.PI*(1-v/100);return[(110+90*Math.cos(t)).toFixed(1),(112-90*Math.sin(t)).toFixed(1)]};const[x1,y1]=a(45),[x2,y2]=a(70);
  return `<svg class="gauge ${cls}" viewBox="0 0 220 136" role="img" aria-label="Pontuação ${s} de 100"><path class="trk" d="M20 112A90 90 0 0 1 200 112" fill="none" stroke-width="20" stroke-linecap="round"/><path class="arc" d="M20 112A90 90 0 0 1 200 112" fill="none" stroke-width="20" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="${100-s}"/><circle cx="${x1}" cy="${y1}" r="3" fill="var(--panel)"/><circle cx="${x2}" cy="${y2}" r="3" fill="var(--panel)"/><text x="110" y="104" text-anchor="middle" font-size="54" font-weight="900">${s}</text><text class="sub" x="110" y="130" text-anchor="middle">de 100 pontos</text></svg>`};
const item=(c,t,d,q,pill)=>`<li class="it ${c}"><details><summary><b>${esc(t)}</b><span>${esc(d)}</span>${pill?`<i class="pill" style="font-style:normal">${esc(pill)}</i>`:''}${q?'<em>Ver trecho do edital</em>':''}</summary>${q?`<blockquote>“${esc(q)}”</blockquote>`:''}</details></li>`;
let last=null;
function render(r,animate){
  const el=$('#resultado');
  if(!r){el.innerHTML='<p class="err">Cole o texto de um edital para analisar.</p>';return}
  const k=r.key;
  el.innerHTML=`<div class="strip"><span>${esc(r.mod||'Modalidade não identificada')}${r.num?' nº '+esc(r.num):''}</span><span>Analisado pelo Pregão em ${fmtD(new Date())}</span></div>
  <div class="paper">
  <p class="org">${esc(r.orgao)}</p><h2 class="obj">${esc(r.objeto)}</h2>
  <div class="meter">${gauge(r.s,r.cls)}<div><div class="stamp ${r.cls}${animate?' pop':''}">${r.verdict}</div><p class="why">${r.why}</p></div></div>
  <dl class="facts"><div><dt>Valor</dt><dd class="nw">${brl(r.val)}</dd></div><div><dt>${k?esc(k.tipo):'Próximo prazo'}</dt><dd>${k?`<span class="nw">${fmtD(k.d)}</span>`:'Não achado'}</dd></div><div><dt>Tempo</dt><dd class="nw">${k?emDias(k.dias):'—'}</dd></div><div><dt>Documentos</dt><dd class="nw">${r.req.length-r.missing.length} de ${r.req.length}</dd></div></dl>
  <h3 class="sec">Falta no seu cofre <span class="cnt">${r.missing.length}</span></h3>${r.missing.length?`<ul class="items">${r.missing.map(d=>item('bad',d.label,'Providencie antes do prazo ou marque no cofre se já tiver.',excerpt(r.T,d.i))).join('')}</ul>`:'<p class="empty">Nada faltando entre os documentos identificados.</p>'}
  <h3 class="sec">Pontos de atenção <span class="cnt">${r.risks.length}</span></h3>${r.risks.length?`<ul class="items">${r.risks.map(x=>item(SEVC[x.sev],x.title,x.tip,excerpt(r.T,x.i),SEVL[x.sev])).join('')}</ul>`:'<p class="empty">Nenhuma armadilha comum encontrada.</p>'}
  ${r.pros.length?`<h3 class="sec">A favor <span class="cnt">${r.pros.length}</span></h3><ul class="items">${r.pros.map(p=>item('plain',p.t,p.d,excerpt(r.T,p.i))).join('')}</ul>`:''}
  ${r.dates.length?`<details class="dates" style="margin-top:14px"><summary>Ver as ${r.dates.length} datas encontradas no edital</summary><div class="scroll"><table><thead><tr><th>Data</th><th>Tipo</th><th class="r">Situação</th></tr></thead><tbody>${r.dates.map(x=>`<tr><td class="nw">${fmtD(x.d)}</td><td>${esc(x.tipo)}</td><td class="r nw">${emDias(x.dias)}</td></tr>`).join('')}</tbody></table></div></details>`:''}
  </div>`;
  renderRoute(r);resetChat(r);
}

function renderRoute(r){
  const k=r.key;const miss=r.missing.length;
  const steps=[
    {t:'Cadastre-se no portal',d:r.portal?`Este edital roda no ${r.portal}. O cadastro é feito uma vez e vale para as próximas.`:'Descubra no edital em qual portal acontece a disputa e faça o cadastro da empresa.',st:'',p:'Uma vez só'},
    {t:'Junte os documentos',d:miss?`Faltam ${miss}: ${r.missing.map(x=>x.label).join(', ')}.`:r.req.length?'Seu cofre já cobre o que o edital pede. Confira as validades.':'Nenhum documento identificado no texto. Leia a seção de habilitação.',st:miss?'warn':'ok',p:miss?`Faltam ${miss}`:'Pronto'},
    {t:'Monte a proposta',d:r.val!=null?`Calcule seu custo e margem. O valor de referência é ${brl(r.val)}: acima dele a proposta é recusada.`:'Calcule seu custo, impostos e margem antes de definir o preço.',st:'',p:'Seu preço'},
    {t:'Envie até o prazo',d:k?`${k.tipo}: ${fmtD(k.d)} (${emDias(k.dias)}).`:'Confira a data de envio das propostas no edital.',st:r.closed?'bad':k&&k.dias<3?'warn':k?'ok':'',p:k?emDias(k.dias):'Ver edital'},
    {t:'Dispute e entregue',d:r.entrega?`Depois de vencer, o prazo é de ${r.entrega}.`:'Depois de vencer, siga o prazo de entrega ou execução do edital.',st:'',p:r.entrega||'Ver edital'},
    {t:'Emita a nota e receba',d:r.pagto?`O pagamento sai em até ${r.pagto} dias após o atesto.`:'Emita a nota fiscal e acompanhe o atesto e o pagamento.',st:r.pagto>30?'warn':'',p:r.pagto?`${r.pagto} dias`:'Após atesto'}
  ];
  $('#route').innerHTML=steps.map((x,i)=>`<li><span class="dot ${x.st}">${x.st==='ok'?'✓':i+1}</span><div><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p></div><i class="pill ${x.st||'off'}" style="font-style:normal">${esc(x.p)}</i></li>`).join('');
}

let chatR=null;
const clock=()=>{const d=new Date();return d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})};
const bubble=(who,html)=>{const m=$('#msgs');m.insertAdjacentHTML('beforeend',`<div class="bub ${who}">${html}<time>${clock()}</time></div>`);m.scrollTop=m.scrollHeight};
function resetChat(r){
  chatR=r;$('#msgs').innerHTML='<div class="day">Hoje</div>';
  const k=r.key;
  bubble('b',`<strong>Novo edital para o seu ramo</strong>\n${esc(r.orgao)}\n${esc(r.objeto)}\n\nValor: ${esc(brl(r.val))}\nPrazo: ${k?esc(fmtD(k.d))+' ('+esc(emDias(k.dias))+')':'confira no edital'}\nPontuação: <strong>${r.s}/100, ${esc(r.verdict.toLowerCase())}</strong>\n${r.missing.length?`Faltam ${r.missing.length} documento${r.missing.length>1?'s':''} no seu cofre.`:'Seu cofre tem tudo o que o edital pede.'}`);
  $('#qr').hidden=false;
}
$('#qr').addEventListener('click',e=>{const b=e.target.closest('[data-q]');if(!b||!chatR)return;const r=chatR,q=b.dataset.q;bubble('u',esc(b.textContent));
  setTimeout(()=>{
    if(q==='sim'){const k=r.key;bubble('b',`<strong>Combinado!</strong> Próximos passos:\n${r.missing.length?r.missing.map((d,i)=>`${i+1}. Providenciar ${esc(d.label)}`).join('\n')+'\n':''}${r.missing.length+1}. Montar a proposta${r.val!=null?' abaixo de '+esc(brl(r.val)):''}\n${r.missing.length+2}. Enviar ${k&&k.dias>=0?'até '+esc(fmtD(k.d)):'no prazo do edital'}\n\nVou te lembrar 2 dias antes do prazo.`)}
    else if(q==='resumo'){bubble('b',r.risks.length?`<strong>Pontos de atenção</strong>\n${r.risks.map(x=>'• '+esc(x.title)).join('\n')}`:'Nenhuma armadilha comum encontrada neste edital.')}
    else{bubble('b','Tudo bem. Vou continuar procurando editais do seu ramo e te aviso quando aparecer outro.')}
  },450)});

let hist=store.get('pregao.hist.v1',null);
const toRow=(r,ex)=>({id:Date.now()+Math.random(),data:new Date().toISOString(),orgao:r.orgao,objeto:r.objeto,mod:r.mod||'Não identificada',val:r.val,s:r.s,cls:r.cls,verdict:r.verdict,ex:!!ex});
if(hist===null){hist=[SAMPLES[2],SAMPLES[1]].map(x=>toRow(analyze(x.txt()),true));store.set('pregao.hist.v1',hist)}
function renderHist(){
  $('#hist tbody').innerHTML=hist.length?hist.map(h=>`<tr><td class="nw">${esc(new Date(h.data).toLocaleDateString('pt-BR'))}</td><td><b>${esc(h.objeto)}</b><br><span class="muted">${esc(h.orgao)}</span>${h.ex?'<span class="badge">exemplo</span>':''}</td><td>${esc(h.mod)}</td><td class="r nw">${esc(brl(h.val))}</td><td><span class="mini ${esc(h.cls)}"><span><i style="width:${+h.s||0}%"></i></span>${+h.s||0}</span></td><td><span class="vpill ${esc(h.cls)}">${esc(h.verdict)}</span></td><td><button type="button" class="x" data-del="${h.id}" aria-label="Remover análise">Remover</button></td></tr>`).join(''):'<tr><td colspan="7" class="empty">Nenhuma análise salva. Clique em “Analisar e salvar”.</td></tr>';
}
$('#hist').addEventListener('click',e=>{const b=e.target.closest('[data-del]');if(!b)return;hist=hist.filter(h=>String(h.id)!==b.dataset.del);store.set('pregao.hist.v1',hist);renderHist()});
let armed=false;
$('#limparHist').addEventListener('click',e=>{const b=e.currentTarget;if(!armed){armed=true;b.textContent='Confirmar limpeza';setTimeout(()=>{armed=false;b.textContent='Limpar histórico'},4000);return}armed=false;b.textContent='Limpar histórico';hist=[];store.set('pregao.hist.v1',hist);renderHist();$('#histStatus').textContent='Histórico apagado.'});
const copy=(txt,st,ok)=>{try{navigator.clipboard.writeText(txt).then(()=>st.textContent=ok,()=>st.textContent='Não foi possível copiar neste navegador.')}catch(e){st.textContent='Não foi possível copiar neste navegador.'}};
$('#copiarHist').addEventListener('click',()=>{const lines=[['Data','Órgão','Objeto','Modalidade','Valor','Pontuação','Veredito'].join('\t'),...hist.map(h=>[new Date(h.data).toLocaleDateString('pt-BR'),h.orgao,h.objeto,h.mod,h.val==null?'':h.val.toFixed(2).replace('.',','),h.s,h.verdict].join('\t'))];copy(lines.join('\n'),$('#histStatus'),'Copiado. Cole numa planilha ou no relatório.')});

$('#cofre').innerHTML=DOCS.map(d=>`<label><input type="checkbox" id="c-${d.id}" value="${d.id}"${cofre.includes(d.id)?' checked':''}>${esc(d.label)}</label>`).join('');
$('#cofre').addEventListener('change',()=>{cofre=[...document.querySelectorAll('#cofre input:checked')].map(i=>i.value);store.set('pregao.cofre.v1',cofre);if(last){last=analyze(last.T);render(last,false)}});

const markPreset=i=>document.querySelectorAll('#presets button').forEach((b,j)=>b.classList.toggle('on',j===i));
$('#presets').innerHTML=SAMPLES.map((x,i)=>`<button type="button" data-s="${i}">${esc(x.nome)}</button>`).join('');
$('#presets').addEventListener('click',e=>{const b=e.target.closest('[data-s]');if(!b)return;const i=+b.dataset.s;$('#edital').value=SAMPLES[i].txt();markPreset(i);last=analyze($('#edital').value);render(last,true);$('#status').textContent='Exemplo fictício carregado. Clique em “Analisar e salvar” para guardar no histórico.'});
$('#edital').addEventListener('input',()=>markPreset(-1));
$('#analisar').addEventListener('click',()=>{const T=$('#edital').value.trim();if(T.length<40){render(null);$('#status').textContent='O texto parece curto demais para ser um edital.';return}last=analyze(T);render(last,true);hist.unshift(toRow(last,false));store.set('pregao.hist.v1',hist);renderHist();$('#status').textContent='Análise salva no histórico.';if(innerWidth<=900)$('#resultado').scrollIntoView({behavior:'smooth'})});
$('#limparTexto').addEventListener('click',()=>{$('#edital').value='';markPreset(-1);$('#edital').focus();$('#status').textContent=''});
$('#arquivo').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{$('#edital').value=String(rd.result);markPreset(-1);$('#status').textContent=`Arquivo “${f.name}” carregado. Clique em “Analisar e salvar”.`};rd.readAsText(f);e.target.value=''});

let fbs=store.get('pregao.fb.v1',[]);
$('#fbNota').innerHTML=[1,2,3,4,5].map(n=>`<label><input type="radio" name="fbNota" value="${n}" required>${n}</label>`).join('');
function renderFb(){
  const n=fbs.length;$('#dots').innerHTML=[0,1,2].map(i=>`<i class="${i<n?'on':''}"></i>`).join('')+`<span>${n} de 3 testes${n?` · nota média ${(fbs.reduce((a,f)=>a+f.nota,0)/n).toFixed(1).replace('.',',')}`:''}</span>`;
  $('#fbTab tbody').innerHTML=n?fbs.map(f=>`<tr><td><b>${esc(f.nome)}</b></td><td>${esc(f.perfil)}</td><td class="r">${+f.nota}</td><td>${esc(f.ent)}</td><td>${esc(f.com||'Sem comentário')}</td><td><button type="button" class="x" data-fd="${f.id}" aria-label="Remover teste">Remover</button></td></tr>`).join(''):'<tr><td colspan="6" class="empty">Nenhum teste registrado ainda. A atividade pede pelo menos 3 usuários reais.</td></tr>';
}
$('#fb').addEventListener('submit',e=>{e.preventDefault();const f=e.target;fbs.push({id:Date.now(),nome:$('#fbNome').value.trim(),perfil:$('#fbPerfil').value,nota:+f.fbNota.value,ent:f.fbEnt.value,com:$('#fbCom').value.trim()});store.set('pregao.fb.v1',fbs);f.reset();renderFb();$('#fbStatus').textContent='Teste registrado.'});
$('#fbTab').addEventListener('click',e=>{const b=e.target.closest('[data-fd]');if(!b)return;fbs=fbs.filter(f=>String(f.id)!==b.dataset.fd);store.set('pregao.fb.v1',fbs);renderFb()});
$('#copiarFb').addEventListener('click',()=>{const t=fbs.map((f,i)=>`Teste ${i+1}: ${f.nome} (${f.perfil}) - nota ${f.nota}/5 - entendeu sem ajuda: ${f.ent}${f.com?' - "'+f.com+'"':''}`).join('\n')||'Nenhum teste registrado.';copy(t,$('#fbStatus'),'Resultados copiados para o relatório.')});

$('#edital').value=SAMPLES[0].txt();markPreset(0);
last=analyze($('#edital').value);render(last,false);renderHist();renderFb();
$('#status').textContent='Exemplo fictício já analisado. Troque o texto ou escolha outro exemplo.';
