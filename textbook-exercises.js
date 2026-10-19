"use strict";
/**
 * Fichas de Paraninfo, edición 7.ª (2022): actividades REALES transcritas del PDF
 * proporcionado por el docente. No hay generación paramétrica.
 *
 * Fase de pruebas: solo AR 2.1 y AR 2.2. Estos modelos se verifican
 * matemáticamente, pero NO SE CONSIDERAN validados por CircuitJS hasta
 * terminar la comparación instrumental en ejecución real.
 * La rama main permanece intacta hasta esa verificación.
 */
(function verifiedParaninfoExercises(){
  const HEADER="$ 1 0.000005 10 60 5.0 50";
  const join=lines=>[HEADER,...lines].join("\n")+"\n";
  const makeCircuit=(voltage,resistance)=>join([
    "v 96 352 96 96 0 0 40 "+voltage+" 0",
    "w 96 96 144 96 0",
    "370 144 96 208 96 3 0 0",
    "w 208 96 384 96 0",
    "r 384 96 384 352 0 "+resistance,
    "w 384 352 96 352 0",
    "w 384 96 528 96 0",
    "p 528 96 528 352 3 0 0 0",
    "w 528 352 384 352 0",
    "g 96 352 96 376 0"
  ]);
  const question=(label,value,unit,formula,tolerance=0.001)=>
    ({label,value,unit,formula,tolerance});
  const cases={
    "2:resuelta:1":{
      unit:2,kind:"resuelta",number:1,bookPage:24,pdfPage:50,
      title:"Actividad resuelta 2.1 · Ley de Ohm",
      statement:"Calcula la intensidad que circula por el filamento de una lámpara incandescente de 10 Ω de resistencia, cuando está sometida a una tensión de 12 V.",
      circuit:makeCircuit(12,10),
      questions:[question("Intensidad que circula por el filamento",1.2,"A","I = U/R = 12 V / 10 Ω = 1,2 A")],
      scope:"Modelo de resistencia constante. El voltímetro está en paralelo con el receptor y el amperímetro en serie. No representa el calentamiento del filamento.",
      measured:[{label:"Amperímetro A1",value:1.2,unit:"A",type:"current"},{label:"Voltímetro V1",value:12,unit:"V",type:"voltage"}],
      proof:"Cálculo independiente: 12/10 = 1,2 A. Simulación instrumental aún por contrastar."
    },
    "2:resuelta:2":{
      unit:2,kind:"resuelta",number:2,bookPage:24,pdfPage:50,
      title:"Actividad resuelta 2.2 · Resistencia del filamento",
      statement:"Se quiere determinar la resistencia eléctrica del filamento de una lámpara incandescente. Para ello, se somete a la lámpara a una tensión de 230 V y, mediante un amperímetro intercalado en serie, se mide el paso de una intensidad de corriente de 0,2 A (Figura 2.8).",
      circuit:makeCircuit(230,1150),
      questions:[question("Resistencia eléctrica del filamento",1150,"Ω","R = U/I = 230 V / 0,2 A = 1.150 Ω",0.01)],
      scope:"Circuito simulado ideal de baja complejidad. Los 230 V son exclusivamente virtuales: no conectar la red ni el Hantek 6022BE directamente.",
      measured:[{label:"Amperímetro A1",value:0.2,unit:"A",type:"current"},{label:"Voltímetro V1",value:230,unit:"V",type:"voltage"}],
      proof:"Cálculo independiente: 230/0,2 = 1.150 Ω. La resistencia resultante es la carga del circuito de comprobación."
    }
  };
  const key=a=>[Number(a.unit),a.kind,Number(a.number)].join(":");
  function build(ref){
    const a=cases[key(ref)];
    if(!a)return null;
    return {...a,
      id:"PN-"+a.unit+"-"+a.kind+"-"+a.number,
      reference:ref.id||("Actividad resuelta "+a.unit+"."+a.number),
      warning:"Enunciado del libro y magnitudes originales. Verificado matemáticamente; contraste instrumental Falstad pendiente.",
      steps:[
        "Lee el enunciado literal y plantea la ecuación sin consultar la solución.",
        "Comprueba la conexión en serie del amperímetro y en paralelo del voltímetro.",
        "Ejecuta CircuitJS y compara las lecturas con el resultado matemático.",
        "Documenta los errores de medida antes de dar la actividad por validada."
      ]
    };
  }
  window.LabTextbookExercises={
    build,
    has:ref=>Boolean(cases[key(ref)]),
    unitsSupported:[2],
    validate(ref){
      const e=build(ref);
      return !!e && e.circuit.startsWith("$ ") && e.circuit.includes("370 ") &&
        e.circuit.includes("\np ") && e.questions.every(q=>Number.isFinite(q.value));
    },
    totalVerified:2,
    provisional:true
  };
})();
