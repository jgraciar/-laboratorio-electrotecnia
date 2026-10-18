"use strict";
(() => {
  // Biblioteca inicial de prácticas. Ejemplos procedentes de
  // github.com/pfalstad/circuitjs1/src/com/lushprojects/circuitjs1/public/circuits/
  // Los valores de autocorrección solo corresponden al montaje inicial.
  const PRACTICES=[
    {
      code:"E01",module:"Electrotecnia 0234",title:"Ley de Ohm y resistencias en paralelo",
      file:"ohms.txt",duration:"20–30 min",
      description:"Una fuente de 5 V alimenta en paralelo dos resistencias de 100 Ω y 1 kΩ.",
      objectives:["Identificar tensión e intensidad en cada rama.","Aplicar la ley de Ohm y calcular la resistencia equivalente.","Contrastar el cálculo con la corriente indicada por CircuitJS."],
      tasks:["Carga el circuito y localiza la fuente de 5 V.","Selecciona cada resistencia en el desplegable del osciloscopio y compara su corriente.","Calcula los resultados del montaje original antes de cambiar los componentes.","Duplica el valor de una resistencia y explica cómo varía la intensidad."],
      questions:[
        {label:"Corriente en la resistencia de 100 Ω",unit:"mA",value:50,tol:0.6,reason:"I = U/R = 5/100 = 0,05 A = 50 mA."},
        {label:"Corriente en la resistencia de 1 kΩ",unit:"mA",value:5,tol:0.08,reason:"I = 5/1000 = 0,005 A = 5 mA."},
        {label:"Resistencia equivalente de las dos ramas",unit:"Ω",value:1000/11,tol:1,reason:"1/Req = 1/100 + 1/1000. Req = 90,91 Ω."}
      ]
    },
    {
      code:"E02",module:"Electrotecnia 0234",title:"Divisor resistivo de tensión",
      file:"voltdivide.txt",duration:"20–30 min",
      description:"Una fuente continua de 10 V alimenta una rama con dos resistencias de 10 kΩ en serie. El ejemplo también incluye otra rama para observar varias tomas de tensión.",
      objectives:["Aplicar el reparto de tensión entre resistencias en serie.","Obtener las corrientes y caídas de tensión con el simulador.","Comprobar el efecto de cambiar el valor de una resistencia."],
      tasks:["Identifica la rama formada por dos resistencias de 10 kΩ.","Comprueba la tensión de cada resistencia y la corriente de la rama.","Calcula los resultados del montaje original.","Cambia una resistencia a 20 kΩ y justifica qué tensión cae en ella."],
      questions:[
        {label:"Tensión en cada resistencia de la rama 10 kΩ + 10 kΩ",unit:"V",value:5,tol:0.08,reason:"U_R = 10 × 10/(10+10) = 5 V."},
        {label:"Corriente de esa rama",unit:"mA",value:0.5,tol:0.01,reason:"I = 10 V / 20 000 Ω = 0,5 mA."},
        {label:"Potencia total de esa rama",unit:"mW",value:5,tol:0.1,reason:"P = U × I = 10 × 0,0005 = 0,005 W = 5 mW."}
      ]
    },
    {
      code:"E03",module:"Electrotecnia 0234",title:"Circuito RC serie en corriente alterna",
      file:"capac.txt",duration:"35–45 min",
      description:"Fuente senoidal de 5 V de pico a 40 Hz, R = 180 Ω y C = 33 µF en serie.",
      objectives:["Calcular reactancia capacitiva e impedancia.","Distinguir tensión pico y tensión eficaz.","Observar desfase y corriente en un circuito RC."],
      tasks:["Localiza la fuente alterna y los elementos R y C.","Utiliza el valor eficaz U = 5/√2 V para los cálculos.","Selecciona el condensador y compara la tensión y corriente simuladas.","Modifica la frecuencia y observa cómo varía la reactancia."],
      questions:[
        {label:"Reactancia capacitiva a 40 Hz",unit:"Ω",value:1/(2*Math.PI*40*33e-6),tol:1.8,reason:"|Xc| = 1/(2π f C) ≈ 120,57 Ω."},
        {label:"Impedancia total |Z|",unit:"Ω",value:Math.hypot(180,1/(2*Math.PI*40*33e-6)),tol:2.8,reason:"|Z| = √(R² + Xc²), en un circuito RC serie."},
        {label:"Corriente eficaz",unit:"mA",value:1000*(5/Math.SQRT2)/Math.hypot(180,1/(2*Math.PI*40*33e-6)),tol:0.3,reason:"Ief = (5/√2) / |Z|, y se expresa en mA."}
      ]
    },
    {
      code:"N01",module:"Electrónica 0233",title:"Rectificador de onda completa en puente",
      file:"fullrect.txt",duration:"30–40 min",
      description:"Un puente de cuatro diodos rectifica una fuente alterna de 40 Hz con carga resistiva de 100 Ω.",
      objectives:["Reconocer el sentido de conducción de los diodos.","Comparar la forma de onda de entrada con la salida rectificada.","Diferenciar frecuencia de la fuente y frecuencia de ondulación."],
      tasks:["Selecciona el circuito y localiza sus cuatro diodos.","Observa la tensión sobre la resistencia de 100 Ω.","Compara entrada y salida. Usa los cursores para medir el periodo de la ondulación.","Modifica la carga y explica qué magnitudes cambian."],
      questions:[
        {label:"Frecuencia de ondulación de salida",unit:"Hz",value:80,tol:1,reason:"Rectificación de onda completa: 2 × 40 Hz = 80 Hz."},
        {label:"Diodos que conducen simultáneamente (ideal)",unit:"diodos",value:2,tol:0,reason:"En cada semiciclo la corriente atraviesa dos diodos del puente."},
        {label:"Número de diodos del puente",unit:"diodos",value:4,tol:0,reason:"El circuito completo es un puente rectificador de cuatro diodos."}
      ]
    },
    {
      code:"E04",module:"Electrotecnia 0234",title:"Sistema trifásico equilibrado en estrella",
      file:"3phasewye.txt",duration:"35–45 min",
      description:"Tres fuentes senoidales de 60 Hz y 120 V RMS por fase, con tres cargas resistivas equilibradas de 1 kΩ. El ejemplo incluye un interruptor en el conductor neutro.",
      objectives:["Identificar tensiones simples y compuestas.","Comprobar el desfase de 120° entre fases.","Calcular intensidad por fase y analizar la corriente de neutro equilibrada."],
      tasks:["Identifica las tres fuentes, cargas y el interruptor de neutro.","Comprueba los 120° entre las tres ondas de fase.","Calcula tensiones y corriente con los valores originales.","Observa el efecto de variar una carga y de abrir/cerrar el neutro. No apliques la hipótesis equilibrada tras modificar la carga."],
      questions:[
        {label:"Tensión simple eficaz (fase-neutro)",unit:"V",value:120,tol:1.5,reason:"169,706 V de pico / √2 ≈ 120 V RMS."},
        {label:"Tensión compuesta eficaz",unit:"V",value:120*Math.sqrt(3),tol:2.2,reason:"Ul = √3 × Uf ≈ 207,85 V para sistema equilibrado."},
        {label:"Corriente eficaz de cada fase resistiva",unit:"mA",value:120,tol:1.5,reason:"I = Uf/R = 120/1000 = 0,12 A = 120 mA."}
      ]
    },
    {
      code:"N02",module:"Electrónica 0233",title:"Puerta lógica XOR y tabla de verdad",
      file:"xor.txt",duration:"20–30 min",
      description:"Montaje digital XOR con dos entradas lógicas controlables en CircuitJS.",
      objectives:["Interpretar la tabla de verdad de XOR.","Distinguir los niveles lógicos de las entradas y salida.","Comprobar las cuatro combinaciones con los interruptores virtuales."],
      tasks:["Identifica las entradas A y B y el indicador de salida.","Prueba las cuatro combinaciones de entradas (00, 01, 10, 11).","Registra el valor de salida de cada combinación.","Explica por qué XOR vale 1 cuando las entradas son distintas."],
      questions:[
        {label:"Salida XOR para A = 0, B = 0",unit:"0 o 1",value:0,tol:0,reason:"Entradas iguales: XOR = 0."},
        {label:"Salida XOR para A = 0, B = 1",unit:"0 o 1",value:1,tol:0,reason:"Entradas distintas: XOR = 1."},
        {label:"Salida XOR para A = 1, B = 0",unit:"0 o 1",value:1,tol:0,reason:"Entradas distintas: XOR = 1."},
        {label:"Salida XOR para A = 1, B = 1",unit:"0 o 1",value:0,tol:0,reason:"Entradas iguales: XOR = 0."}
      ]
    }
  ];
  const $=id=>document.getElementById(id);
  const content=$("practiceContent"),select=$("practiceSelect"),status=$("practiceStatus");
  if(!content || !select)return;
  let attempts=0,lastResults=[];
  function node(tag,cls,text) {
    const el=document.createElement(tag);
    if(cls)el.className=cls;
    if(text!==undefined)el.textContent=text;
    return el;
  }
  function list(items){
    const ol=node("ol","practice-steps");
    items.forEach(item=>ol.append(node("li","",item)));
    return ol;
  }
  function practice(){return PRACTICES.find(p=>p.code===select.value)||PRACTICES[0];}
  function number(s){
    const input=s.trim().replace(/\s/g,"").replace(",",".");
    if(!input || !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(input))return NaN;
    return Number(input);
  }
  function render(){
    const p=practice();attempts=0;lastResults=[];
    content.replaceChildren();
    const tag=node("p","practice-meta",p.code+" · "+p.module+" · Duración orientativa: "+p.duration);
    const title=node("h3","practice-title",p.title);
    const desc=node("p","practice-description",p.description);
    const subtitle1=node("h4","practice-subtitle","Objetivos");const objectives=list(p.objectives);
    const subtitle2=node("h4","practice-subtitle","Trabajo propuesto");const steps=list(p.tasks);
    const note=node("p","practice-note",
      "Autocorrección: usa los valores originales del circuito. Si has cambiado algún componente, recarga el montaje antes de comprobar. Las medidas de CircuitJS pueden presentar pequeñas diferencias numéricas.");
    const h=node("h4","practice-subtitle","Hoja de cálculo y comprobación");
    const fields=node("div","practice-questions");
    p.questions.forEach((q,i)=>{
      const wrapper=node("div","practice-question");
      const label=node("label","",q.label+" ("+q.unit+")");
      const input=node("input","practice-answer");
      input.id="practiceAnswer"+i;
      input.type="text";input.inputMode="decimal";input.autocomplete="off";
      input.placeholder="Escribe el valor calculado";label.htmlFor=input.id;
      const result=node("span","practice-feedback");result.id="practiceFeedback"+i;
      wrapper.append(label,input,result);fields.append(wrapper);
    });
    const buttons=node("div","practice-actions");
    const check=node("button","toolbtn","Comprobar respuestas");
    check.type="button";check.addEventListener("click",verify);
    const reveal=node("button","toolbtn","Ver desarrollo matemático");
    reveal.type="button";reveal.addEventListener("click",()=>{
      const solutions=$("practiceSolutions");
      solutions.hidden=!solutions.hidden;
      reveal.textContent=solutions.hidden?"Ver desarrollo matemático":"Ocultar desarrollo";
    });
    const download=node("button","toolbtn","Guardar informe TXT");
    download.type="button";download.addEventListener("click",downloadReport);
    buttons.append(check,reveal,download);
    const solutions=node("div","practice-solutions");solutions.id="practiceSolutions";
    solutions.hidden=true;
    p.questions.forEach((q,i)=>solutions.append(node("p","",String(i+1)+". "+q.reason)));
    const summary=node("p","practice-summary");summary.id="practiceSummary";
    content.append(tag,title,desc,subtitle1,objectives,subtitle2,steps,note,h,fields,buttons,solutions,summary);
    status.textContent="Práctica "+p.code+" preparada. Pulsa «Cargar montaje en CircuitJS».";
  }
  function verify(){
    const p=practice();attempts++;
    let correct=0;lastResults=[];
    p.questions.forEach((q,i)=>{
      const answer=$("practiceAnswer"+i).value,parsed=number(answer);
      const valid=Number.isFinite(parsed);
      const ok=valid && Math.abs(parsed-q.value)<=q.tol+Math.abs(q.value)*0.005;
      if(ok)correct++;
      const msg=$("practiceFeedback"+i);
      msg.textContent=!valid?"Introduce un número en la unidad indicada.":ok?"Correcto.":"Revisa el resultado y sus unidades.";
      msg.className="practice-feedback "+(ok?"practice-correct":"practice-incorrect");
      lastResults.push({question:q.label,answer,ok});
    });
    $("practiceSummary").textContent="Resultado: "+correct+" de "+p.questions.length+" respuestas correctas (intento "+attempts+").";
    status.textContent="La autocorrección se refiere al circuito original, no a valores que hayas modificado.";
  }
  function downloadReport(){
    const p=practice();
    const lines=[
      "LABORATORIO VIRTUAL · HOJA DE PRÁCTICA",
      p.code+" — "+p.title,
      p.module,
      "Fecha: "+new Date().toLocaleString("es-ES"),
      "",
      "Objetivos:",
      ...p.objectives.map(x=>"- "+x),
      "",
      "Respuestas del alumno (unidades indicadas):",
      ...p.questions.map((q,i)=>String(i+1)+". "+q.label+": "+($("practiceAnswer"+i).value||"(sin respuesta)")+" "+q.unit),
      "",
      "Autocorrección realizada: "+(attempts>0?"sí; intentos: "+attempts:"no"),
      "Nota: las respuestas se evalúan respecto al circuito original. No son una calificación oficial.",
      "Observaciones personales:",
      "____________________________________________________________",
      "____________________________________________________________"
    ];
    const blob=new Blob([lines.join("\n")+"\n"],{type:"text/plain;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=node("a");a.href=url;a.download="practica_"+p.code+"_informe.txt";
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    status.textContent="Informe generado en tu navegador; no se han enviado respuestas a ningún servidor.";
  }
  PRACTICES.forEach(p=>{
    const option=node("option","",p.code+" · "+p.title);
    option.value=p.code;select.append(option);
  });
  select.addEventListener("change",render);
  $("practiceReset").addEventListener("click",render);
  $("practiceLoad").addEventListener("click",()=>{
    const p=practice();
    if(!window.LabCircuit){
      status.textContent="Todavía no se ha inicializado la integración con CircuitJS.";
      return;
    }
    const result=window.LabCircuit.loadExample(p.file);
    status.textContent=result.ok?
      "Cargando "+p.code+": "+p.title+". Espera al mensaje «CircuitJS conectado» y selecciona el componente que quieras medir.":
      result.message;
  });
  document.addEventListener("lab:circuit-ready",event=>{
    const loaded=event.detail?.example;
    if(loaded && practice().file===loaded){
      status.textContent="Montaje de "+practice().code+" cargado correctamente. Ya puedes modificar componentes y medir sus señales.";
    }
  });
  render();
})();
