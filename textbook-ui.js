"use strict";
(function textbookUI(){
  "use strict";
  const $=id=>document.getElementById(id), root=$("textbookExercisePanel");
  if(!root)return;
  const create=(tag,cls,text)=>{
    const x=document.createElement(tag);
    if(cls)x.className=cls;
    if(text!==undefined)x.textContent=text;
    return x;
  };
  const button=(text,action)=>{
    const x=create("button","toolbtn",text);x.type="button";x.addEventListener("click",action);return x;
  };
  const fmt=n=>Number(n).toLocaleString("es-ES",{maximumFractionDigits:6});
  let current=null, tries=0;
  window.LabPublicationCircuitOpen=false;
  const resetMode=()=>{
    window.LabPublicationCircuitOpen=false;
    if($("publications-controls")&&!$("publications-controls").hidden){
      window.LabScope?.setMode("publications");
    }
  };
  function close(){
    root.hidden=true;root.replaceChildren();current=null;tries=0;resetMode();
  }
  function report(){
    if(!current)return;
    const x=current;
    const lines=[
      "LABORATORIO VIRTUAL · ELECTROTECNIA GM 0234",
      "EJERCICIO PROPIO VINCULADO TEMÁTICAMENTE A PARANINFO",
      "Referencia bibliográfica: "+x.reference+" · página impresa "+x.bookPage,
      "Unidad "+x.unit+" · "+x.title,
      "",
      "ADVERTENCIA",
      x.warning,
      "Modelo: "+x.scope,
      "",
      "CÁLCULOS",
      ...x.questions.flatMap((q,i)=>[
        (i+1)+". "+q.label,
        "Respuesta del alumno: "+($("textbookAnswer"+i)?.value||"(sin completar)")+" "+q.unit,
        "Desarrollo: "+q.formula,
        "Resultado matemático: "+fmt(q.value)+" "+q.unit
      ]),
      "Intentos de autocorrección: "+tries,
      "",
      "Observaciones / comparación con Falstad:",
      "________________________________________",
      "________________________________________"
    ];
    const file=new Blob([lines.join("\n")+"\n"],{type:"text/plain;charset=utf-8"});
    const link=URL.createObjectURL(file);
    const a=document.createElement("a");a.href=link;
    a.download=x.id+"-informe.txt";
    document.body.append(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(link),1500);
  }
  function verify(){
    if(!current)return;
    tries++;
    let correct=0;
    current.questions.forEach((q,i)=>{
      const input=$("textbookAnswer"+i),text=input.value.trim().replace(/\s/g,"").replace(",",".");
      const n=/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(text)?Number(text):NaN;
      const valid=Number.isFinite(n);
      const good=valid&&Math.abs(n-q.value)<=q.tolerance;
      if(good)correct++;
      const result=$("textbookResult"+i);
      result.textContent=!valid?"Introduce un número válido.":good?"Correcto":"Revisa el cálculo y las unidades.";
      result.className="practice-feedback "+(good?"practice-correct":"practice-incorrect");
    });
    $("textbookScore").textContent="Autocorrección: "+correct+"/"+current.questions.length+
      " respuestas correctas · "+tries+" intento(s). Solo se evalúan los datos iniciales.";
  }
  function open(ref){
    const lab=window.LabTextbookExercises;
    if(!lab?.build)return false;
    let x;
    try{x=lab.build(ref);}catch(e){
      root.hidden=false;root.textContent="Error al preparar el ejercicio: "+e.message;return false;
    }
    current=x;tries=0;root.hidden=false;root.replaceChildren();
    root.append(create("h3","",x.title));
    root.append(create("p","practice-meta",
      "Grado Medio · Electrotecnia (0234) · Unidad "+x.unit+" · Ref. "+x.reference+
      " · pág. impresa "+x.bookPage));
    root.append(create("p","practice-note",x.warning));
    root.append(create("h4","practice-subtitle","Modelo equivalente de Falstad"));
    root.append(create("p","",x.scope));
    const actions=create("div","practice-actions");
    const status=create("p","hint","Preparando circuito Falstad integrado…");
    function load(){
      const result=window.LabCircuit?.loadExerciseCircuit?.(x.id,x.circuit);
      status.textContent=result?.ok?
        "Modelo "+x.id+" cargado. Modifica sus componentes y mide tensión y corriente.":
        (result?.message||"CircuitJS no está conectado todavía.");
    }
    actions.append(button("Reiniciar circuito Falstad",load));
    actions.append(button("Descargar informe TXT",report));
    actions.append(button("Cerrar ejercicio",close));
    root.append(actions,status);
    root.append(create("h4","practice-subtitle","Procedimiento"));
    const steps=create("ol","practice-steps");
    x.steps.forEach(step=>steps.append(create("li","",step)));
    root.append(steps);
    root.append(create("h4","practice-subtitle","Cálculos del ejercicio propio"));
    const form=create("div","practice-questions");
    x.questions.forEach((q,i)=>{
      const card=create("div","practice-question");
      const label=create("label","",q.label+" ("+q.unit+")");
      const input=create("input","practice-answer");input.type="text";input.inputMode="decimal";
      input.id="textbookAnswer"+i;input.placeholder="Resultado numérico";label.htmlFor=input.id;
      const result=create("span","practice-feedback");result.id="textbookResult"+i;
      card.append(label,input,result);form.append(card);
    });
    root.append(form);
    const controls=create("div","practice-actions");
    const solutions=create("div","practice-solutions");solutions.hidden=true;
    solutions.id="textbookSolutions";
    x.questions.forEach((q,i)=>solutions.append(create("p","",
      (i+1)+". "+q.formula+". Resultado: "+fmt(q.value)+" "+q.unit)));
    const reveal=button("Mostrar desarrollo y soluciones",()=>{
      solutions.hidden=!solutions.hidden;
      reveal.textContent=solutions.hidden?"Mostrar desarrollo y soluciones":"Ocultar soluciones";
    });
    controls.append(button("Comprobar respuestas",verify),reveal);
    const score=create("p","practice-summary");score.id="textbookScore";
    root.append(controls,score,solutions);
    window.LabPublicationCircuitOpen=true;
    window.LabScope?.setMode("publications");
    load();
    root.scrollIntoView?.({behavior:"smooth",block:"start"});
    return true;
  }
  window.LabTextbookUI={open,close,getCurrent:()=>current?.id||null};
})();
