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
      "ACTIVIDAD ORIGINAL DE PARANINFO · REPRODUCCIÓN AUTORIZADA POR EL DOCENTE",
      "Referencia bibliográfica: "+x.reference+" · página impresa "+x.bookPage,
      "Unidad "+x.unit+" · "+x.title,
      "ENUNCIADO ORIGINAL: "+x.statement,
      "",
      "ADVERTENCIA",
      x.warning,
      "Modelo: "+x.scope,
      "Currículo (vinculación parcial): "+(window.LabTextbookCurriculum?.[x.unit]?.ra||"Sin vinculación verificada")+
        " · CE "+(window.LabTextbookCurriculum?.[x.unit]?.ce.join(", ")||"sin asignación"),
      "BOE: "+(window.LabTextbookCurriculumSource||""),
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
    if(!x){root.hidden=true;root.replaceChildren();return false;}
    current=x;tries=0;root.hidden=false;root.replaceChildren();
    root.append(create("h3","",x.title));
    root.append(create("p","practice-meta",
      "Grado Medio · Electrotecnia (0234) · Unidad "+x.unit+" · Ref. "+x.reference+
      " · pág. impresa "+x.bookPage));
    root.append(create("h4","practice-subtitle","Enunciado original del libro"));
    root.append(create("p","practice-statement",x.statement));
    root.append(create("p","practice-note",x.warning));
    const relation=window.LabTextbookCurriculum?.[x.unit];
    if(relation) {
      const line=create("p","practice-curriculum",
        "Vinculación curricular parcial: "+relation.ra+
        (relation.ce.length?" · CE "+relation.ce.join(", "):" · CE específicos no acreditados con este modelo.")+
        ". Este ejercicio no demuestra el cumplimiento completo de los criterios.");
      root.append(line);
      const link=create("a","practice-source","Consultar el RA/CE completo en el BOE ↗");
      link.href=window.LabTextbookCurriculumSource;
      link.target="_blank";link.rel="noopener noreferrer";root.append(link);
    }
    root.append(create("h4","practice-subtitle","Circuito para verificar el enunciado en Falstad"));
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
    const meterResult=create("p","practice-summary","Sin comparación instrumental de Falstad.");
    const meterDetails=create("div","practice-meter-details");
    function compareMeters(){
      const reading=window.LabCircuit?.getInstrumentReadings?.();
      if(!reading || reading.id!==x.id){
        meterResult.textContent="Falstad aún no ha adquirido las lecturas de este ejercicio.";return;
      }
      meterDetails.replaceChildren();
      let pass=reading.time>=0.002,compared=0;
      for(const m of x.measured||[]){
        const actual=m.type==="current"?reading.current:reading.voltage;
        if(!Number.isFinite(actual)){pass=false;continue;}
        const diff=Math.abs(actual-m.value);
        const tolerance=Math.max(0.0001,Math.abs(m.value)*0.005);
        const ok=diff<=tolerance;
        pass=pass && ok;compared++;
        meterDetails.append(create("p","",
          m.label+": lectura Falstad "+fmt(actual)+" "+m.unit+
          " · cálculo "+fmt(m.value)+" "+m.unit+
          " · error "+fmt(diff)+" "+m.unit+
          (ok?" (dentro de tolerancia)":" (no coincide)")));
      }
      meterResult.textContent=compared===(x.measured||[]).length && pass?
        "Contraste instrumental satisfactorio para esta ejecución (tolerancia 0,5 %; t ≥ 2 ms).":
        "Resultado pendiente: revisa conexión, estabilización y lecturas en Falstad.";
    }
    actions.append(button("Comparar lecturas reales de Falstad",compareMeters));
    actions.append(button("Descargar informe TXT",report));
    actions.append(button("Cerrar ejercicio",close));
    root.append(actions,status,meterResult,meterDetails);
    root.append(create("h4","practice-subtitle","Procedimiento"));
    const steps=create("ol","practice-steps");
    x.steps.forEach(step=>steps.append(create("li","",step)));
    root.append(steps);
    root.append(create("h4","practice-subtitle","Cálculos del ejercicio original"));
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
