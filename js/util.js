/* Pregão — utilitários, datas, moeda e constantes legais */
'use strict';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const store={get(k,d){try{const v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const DAY=864e5;
const today=new Date();today.setHours(0,0,0,0);
const fmtD=d=>d.toLocaleDateString('pt-BR');
const plus=n=>fmtD(new Date(today.getTime()+n*DAY));
const brl=v=>v==null?'Não informado':v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const emDias=n=>n<0?'encerrado':n===0?'hoje':`em ${n} dia${n>1?'s':''}`;
const LIM_DISP=65492.11,LIM_HAB=LIM_DISP/4,LIM_EXCL=80000;
const W={alto:12,medio:7,baixo:3};
const SEVC={alto:'bad',medio:'warn',baixo:'off'};
const SEVL={alto:'Alto',medio:'Médio',baixo:'Baixo'};

