"use strict";
// Puente CircuitJS -> instrumentación virtual.
// Solo lee muestras si CircuitJS está alojado en el mismo origen.
// API pública documentada: github.com/pfalstad/circuitjs1/blob/master/war/jsinterface.html
(() => {
  const frame=document.getElementById("circuit-frame");
  const status=document.getElementById("bridge-status");
  const selector=document.getElementById("elementSelect");
  const windowInput=document.getElementById("sampleWindow");
  const quantity=document.getElementById("elementQuantity");
  const scope=window.LabScope;
  if(!frame || !selector || !scope)return;
  const defaultCircuit="https://www.falstad.com/circuit/circuitjs.html";
  let sim=null,eligible=[],record=[],lastSample=-Infinity,lastPaint=0;
  const windowSeconds=()=>Math.max(.001,Math.min(10,Number(windowInput.value)||.1));
  function message(text){status.textContent=text;}
  function clear(){
    record=[];lastSample=-Infinity;lastPaint=0;
    scope.clearCircuit();
  }
  function updateSelection(){
    clear();
    if(!sim)return;
    let elements=[];
    try{elements=Array.from(sim.getElements()||[]);}catch(err){message("Error al consultar los componentes: "+err.message);return;}
    eligible=elements.filter(el=>{
      try{return el.getPostCount()>=2 && typeof el.getVoltageDiff==="function" &&
        typeof el.getCurrent==="function" && el.getType()!=="WireElm";}
      catch(_){return false;}
    });
    const oldIndex=Number(selector.value);
    selector.replaceChildren();
    if(eligible.length===0){
      const option=document.createElement("option");
      option.value="";option.textContent="No hay componentes de dos terminales";
      selector.append(option);selector.disabled=true;
      message("CircuitJS conectado; añade un componente medible al circuito.");
      return;
    }
    eligible.forEach((element,index)=>{
      const option=document.createElement("option");
      option.value=String(index);
      option.textContent=(index+1)+". "+element.getType().replace(/Elm$/,"");
      selector.append(option);
    });
    selector.disabled=false;
    selector.value=String(Number.isInteger(oldIndex)&&oldIndex>=0&&oldIndex<eligible.length?oldIndex:0);
    message("CircuitJS conectado: selecciona un componente y observa su tensión o corriente en el osciloscopio.");
  }
  function capture(){
    if(!sim || selector.disabled)return;
    let t;
    try{t=sim.getTime();}catch(_){return;}
    if(!Number.isFinite(t))return;
    if(t<lastSample)clear();
    const step=Math.max(.000002,windowSeconds()/1200);
    if(t-lastSample<step)return;
    let element=eligible[Number(selector.value)];
    if(!element)return;
    let v,i;
    try{v=element.getVoltageDiff();i=element.getCurrent();}catch(_){return;}
    if(!Number.isFinite(v) || !Number.isFinite(i))return;
    record.push({t,v,i});
    lastSample=t;
    if(record.length>5000)record.splice(0,600);
    const oldest=t-Math.max(windowSeconds()*1.5,.08);
    if(record.length>1800 && record[0].t<oldest){
      let cut=0;while(cut<record.length-1600 && record[cut].t<oldest)cut++;
      if(cut>0)record.splice(0,cut);
    }
  }
  function update(){
    if(!sim || record.length<2)return;
    const stamp=performance.now();
    if(stamp-lastPaint<150)return;
    lastPaint=stamp;
    scope.setCircuitRecords(record);
  }
  function attach(instance){
    if(!instance || sim===instance)return;
    sim=instance;
    sim.ontimestep=capture;
    sim.onupdate=update;
    sim.onanalyze=updateSelection;
    updateSelection();
    message("CircuitJS conectado. Los datos se obtienen del simulador, no del hardware.");
  }
  selector.addEventListener("change",clear);
  quantity.addEventListener("change",()=>scope.refresh());
  windowInput.addEventListener("change",clear);
  function openRemote(){
    message("CircuitJS se carga desde su página oficial. Para leer muestras automáticamente, publica la versión con CircuitJS alojado en esta misma web (GitHub Actions).");
    selector.disabled=true;
    frame.src=defaultCircuit;
  }
  // Para que las API compartan origen, el sitio desplegado mediante Actions
  // tiene que incluir ./circuitjs/circuitjs.html y sus recursos compilados.
  const localUrl=new URL("./circuitjs/circuitjs.html",location.href);
  fetch(localUrl.href,{cache:"no-store"}).then(async res=>{
    if(!res.ok)return false;
    const html=await res.text();
    return html.includes("circuitjs1.nocache.js");
  }).then(localAvailable=>{
    if(!localAvailable){openRemote();return;}
    frame.addEventListener("load",()=>{
      try{
        const w=frame.contentWindow;
        if(w.CircuitJS1)attach(w.CircuitJS1);
        else w.oncircuitjsloaded=()=>attach(w.CircuitJS1);
      }catch(err){message("No se puede establecer comunicación con CircuitJS: "+err.message);}
    });
    frame.src=localUrl.href;
    message("CircuitJS disponible en el mismo origen. Esperando a que inicialice…");
  }).catch(()=>openRemote());
})();
