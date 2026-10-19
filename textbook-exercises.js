"use strict";
(function textbookModule(){
  "use strict";
  // Ejercicios propios por tema; nunca pretenden reproducir una solución editorial.
  const H="$ 1 0.000005 10 60 5.0 50";
  const num=x=>Number(x).toPrecision(11);
  const w=(a,b,c,d)=>`w ${a} ${b} ${c} ${d} 0`;
  const r=(a,b,c,d,v)=>`r ${a} ${b} ${c} ${d} 0 ${num(v)}`;
  const l=(a,b,c,d,v)=>`l ${a} ${b} ${c} ${d} 0 ${num(v)} 0`;
  const c=(a,b,c,d,v)=>`c ${a} ${b} ${c} ${d} 0 ${num(v)} 0`;
  const dc=(a,b,c,d,v)=>`v ${a} ${b} ${c} ${d} 0 0 40 ${num(v)} 0`;
  const ac=(a,b,c,d,v,f)=>`v ${a} ${b} ${c} ${d} 0 1 ${num(f)} ${num(v*Math.SQRT2)} 0 0 0.5`;
  const g=(a,b)=>`g ${a} ${b} ${a} ${b+24} 0`;
  const pack=lines=>[H,...lines].join("\n")+"\n";
  const source=(V,R,AC=false,f=50)=>pack([
    AC?ac(96,352,96,96,V,f):dc(96,352,96,96,V),
    w(96,96,432,96),r(432,96,432,352,R),w(432,352,96,352),g(96,352)
  ]);
  const series=(V,R1,R2)=>pack([dc(96,352,96,96,V),r(96,96,256,96,R1),
    r(256,96,432,96,R2),w(432,96,432,352),w(432,352,96,352),g(96,352)]);
  const parallel=(V,R1,R2)=>pack([dc(96,352,96,96,V),
    w(96,96,256,96),w(256,96,432,96),r(256,96,256,352,R1),
    r(432,96,432,352,R2),w(256,352,432,352),w(96,352,256,352),g(96,352)]);
  const dual=(V1,V2,R)=>pack([dc(96,224,96,96,V1),dc(96,352,96,224,V2),
    w(96,96,432,96),r(432,96,432,352,R),w(432,352,96,352),g(96,352)]);
  const induct=(V,R,L,AC=true,f=50)=>pack([
    AC?ac(96,352,96,96,V,f):dc(96,352,96,96,V),
    r(96,96,276,96,R),l(276,96,432,96,L),w(432,96,432,352),
    w(432,352,96,352),g(96,352)]);
  const capac=(V,R,C)=>pack([dc(96,352,96,96,V),r(96,96,432,96,R),
    c(432,96,432,352,C),w(432,352,96,352),g(96,352)]);
  const rlc=(V,R,L,C,f)=>pack([ac(96,352,96,96,V,f),r(96,96,240,96,R),
    l(240,96,432,96,L),c(432,96,432,352,C),
    w(432,352,96,352),g(96,352)]);
  const acParallel=(V,R,L,f)=>pack([ac(96,352,96,96,V,f),
    w(96,96,256,96),w(256,96,432,96),r(256,96,256,352,R),
    l(432,96,432,352,L),w(96,352,256,352),w(256,352,432,352),g(96,352)]);
  const transformer=(V,ratio,R)=>pack([
    ac(96,304,96,176,V,50),w(96,176,208,176),r(208,176,272,176,.1),
    w(272,176,272,208),w(96,304,272,304),w(272,304,272,240),
    `T 272 208 352 208 0 1000 ${num(ratio)} 0 0 0.999`,
    w(352,208,352,176),w(352,240,352,304),
    w(352,176,448,176),w(352,304,448,304),
    r(448,176,448,304,R),g(96,304)
  ]);
  const motor=(V,Em,R)=>pack([dc(96,352,96,96,V),r(96,96,432,96,R),
    dc(432,352,432,96,Em),w(432,352,96,352),g(96,352)]);
  const q=(label,value,unit,formula)=>{
    if(!Number.isFinite(value))throw Error("Cálculo incorrecto: "+label);
    return {label,value,unit,formula,tolerance:Math.max(0.000001,Math.abs(value)*0.015)};
  };
  function build(a){
    const unit=Number(a.unit),n=Number(a.number)||1;
    const types={resuelta:1,practica:2,comprobacion:3,evaluacion:4,propuesta:5,ampliacion:6,experimental:7};
    const k=(unit*67+n*13+(types[a.kind]||0)*31)%9;
    let circuit="",title="",questions=[],scope="";
    const U=12+2*k, R=20+10*k;
    if(unit===1){
      title="Ley de Ohm y carga eléctrica";
      const i=U/R;circuit=source(U,R);
      questions=[q("Intensidad de corriente",1000*i,"mA",`I=U/R=${U}/${R} A`),
        q("Carga transportada en 60 s",60*i,"C",`Q=I·t=(${U}/${R})·60 C`)];
      scope="Circuito ideal de CC; no representa electrostática ni otras formas de generación.";
    }else if(unit===2){
      title="Resistencia del conductor";
      const rho=.01786,L=20+5*k,S=1.5+.5*(k%4),rw=rho*L/S,I=U/(rw+R);
      circuit=series(U,rw,R);
      questions=[q("Resistencia del conductor",rw,"Ω",`R=ρL/S=${rho}·${L}/${S}`),
        q("Corriente por la carga",I,"A",`I=U/(Rlínea+Rcarga)=${U}/(${rw.toFixed(6)}+${R})`)];
      scope="Resistencia de cobre a 20 °C: sin calentamiento ni criterios reglamentarios de sección.";
    }else if(unit===3){
      title="Potencia y energía eléctrica";
      const p=U*U/R,h=2+k%4;circuit=source(U,R);
      questions=[q("Potencia del receptor",p,"W",`P=U²/R=${U}²/${R}`),
        q("Energía en "+h+" horas",p*h/1000,"kWh",`E=P·t/1000=${p.toFixed(4)}·${h}/1000`)];
      scope="Carga ideal; la energía se determina mediante cálculo del tiempo.";
    }else if(unit===4){
      title="Efecto Joule en un conductor";
      const i=1+k%4,rh=3+k,t=10+5*k,p=i*i*rh;
      circuit=source(i*rh,rh);
      questions=[q("Potencia por efecto Joule",p,"W",`P=I²R=${i}²·${rh}`),
        q("Energía desprendida en "+t+" s",p*t,"J",`E=P·t=${p}·${t}`)];
      scope="No simula la temperatura del conductor ni la convección térmica.";
    }else if(unit===5){
      title="Carga calefactora resistiva";
      const P=U*U/R;circuit=source(U,R);
      questions=[q("Corriente del calefactor",U/R,"A",`I=U/R=${U}/${R}`),
        q("Potencia absorbida",P,"W",`P=U²/R=${U}²/${R}`)];
      scope="No representa protecciones térmicas, cortocircuitos peligrosos ni el disparo de magnetotérmicos.";
    }else if(unit===6){
      title="Dos resistencias en serie";
      const R2=30+20*k,It=U/(R+R2);circuit=series(U,R,R2);
      questions=[q("Resistencia equivalente",R+R2,"Ω",`Req=R1+R2=${R}+${R2}`),
        q("Caída de tensión en R2",It*R2,"V",`U2=U·R2/Req=${U}·${R2}/${R+R2}`)];
      scope="Topología serie: no equivale a un circuito mixto arbitrario.";
    }else if(unit===7){
      title="Primera ley de Kirchhoff";
      const R2=50+15*k;circuit=parallel(U,R,R2);
      questions=[q("Intensidad en la primera rama",U/R*1000,"mA",`I1=U/R1=${U}/${R} A`),
        q("Intensidad total",U*(1/R+1/R2)*1000,"mA",`Itot=U/R1+U/R2=${U}/${R}+${U}/${R2} A`)];
      scope="Dos ramas en paralelo; no es una resolución general de mallas.";
    }else if(unit===8){
      title="Generadores ideales en serie";
      const a1=2+k%4,a2=3+(k+2)%4;circuit=dual(a1,a2,R);
      questions=[q("Tensión total",a1+a2,"V",`Utotal=U1+U2=${a1}+${a2}`),
        q("Corriente de carga",(a1+a2)/R*1000,"mA",`I=(U1+U2)/R=(${a1}+${a2})/${R} A`)];
      scope="Fuentes CC ideales: no describe baterías químicas, irradiancia ni curva I-V fotovoltaica.";
    }else if(unit===9){
      title="Carga transitoria de un condensador";
      const rr=(10+5*k)*1000, cap=(10+5*(k%5))*1e-6,t=.01,tau=rr*cap;
      circuit=capac(U,rr,cap);
      questions=[q("Constante de tiempo",tau*1000,"ms",`τ=RC=${rr}·${cap} s`),
        q("Tensión del condensador a 10 ms",U*(1-Math.exp(-t/tau)),"V",`Uc=U·(1−exp(−t/τ))=${U}·(1−exp(−0.01/${tau.toFixed(4)}))`)];
      scope="Circuito RC ideal; observar tras reiniciar el estado de simulación.";
    }else if(unit===10){
      title="Bobina: energía y constante de tiempo";
      const rr=10+5*k,L=.05+.025*k,I=U/rr;
      circuit=induct(U,rr,L,false);
      questions=[q("Constante de tiempo RL",1000*L/rr,"ms",`τ=L/R=${L}/${rr} s`),
        q("Energía almacenada en régimen continuo",.5*L*I*I,"J",`E=0.5·L·I²=0.5·${L}·(${U}/${rr})²`)];
      scope="Modelo magnético lineal; no reproduce saturación, histéresis o el circuito magnético real.";
    }else if(unit===11){
      title="Autoinducción en un circuito RL";
      const f=40+5*k,L=.1+.02*k,XL=2*Math.PI*f*L;
      circuit=induct(U,R,L,true,f);
      questions=[q("Reactancia inductiva",XL,"Ω",`XL=2πfL=2π·${f}·${L}`),
        q("Intensidad eficaz",U/Math.hypot(R,XL),"A",`I=U/√(R²+XL²)=${U}/√(${R}²+${XL.toFixed(3)}²)`)];
      scope="La bobina representa autoinducción, no fuerza motriz ni ensayos de máquina eléctrica.";
    }else if(unit===12){
      title="Señal senoidal: período y valor eficaz";
      const f=25+5*k,peak=10+2*k;circuit=source(peak/Math.SQRT2,100,true,f);
      questions=[q("Valor eficaz de la tensión",peak/Math.SQRT2,"V",`Uef=Up/√2=${peak}/√2`),
        q("Período de la señal",1000/f,"ms",`T=1000/f=1000/${f}`)];
      scope="Señal alterna senoidal ideal. En Falstad la amplitud de fuente es de pico.";
    }else if(unit===13){
      title="Impedancia RLC serie y corriente";
      const f=40+5*k,L=.1+.025*k,C=(25+5*k)*1e-6,XL=2*Math.PI*f*L,XC=1/(2*Math.PI*f*C);
      const Z=Math.hypot(R,XL-XC);circuit=rlc(U,R,L,C,f);
      questions=[q("Módulo de impedancia",Z,"Ω",`|Z|=√(R²+(XL−XC)²), XL=${XL.toFixed(3)}, XC=${XC.toFixed(3)}`),
        q("Corriente eficaz",U/Z*1000,"mA",`Ief=Uef/|Z|=${U}/${Z.toFixed(3)} A`)];
      scope="Régimen permanente con componentes ideales; no se aplica el cálculo al transitorio inicial.";
    }else if(unit===14){
      title="R y L en paralelo en corriente alterna";
      const f=40+5*k,L=.1+.04*k,Ir=U/R,Il=U/(2*Math.PI*f*L);
      circuit=acParallel(U,R,L,f);
      questions=[q("Corriente eficaz resistiva",1000*Ir,"mA",`IR=U/R=${U}/${R} A`),
        q("Corriente eficaz total",1000*Math.hypot(Ir,Il),"mA",`Itotal=√(IR²+IL²), IL=U/(2πfL)`)];
      scope="Corrientes de fase distintas: no se suman los módulos de forma aritmética.";
    }else if(unit===15){
      title="Carga trifásica equilibrada: equivalente por fase";
      const Ul=360+10*k,Uf=Ul/Math.sqrt(3),I=Uf/R;
      circuit=source(Uf,R);
      questions=[q("Tensión simple eficaz",Uf,"V",`Uf=Ul/√3=${Ul}/√3`),
        q("Potencia activa total",3*Uf*I,"W",`P=3·Uf²/R=3·(${Uf.toFixed(3)})²/${R}`)];
      scope="ATENCIÓN: solo equivalente monofásico en valores eficaces; Falstad NO representa aquí las tres fases ni el desfase 120°.";
    }else if(unit===16){
      title="Medida de corriente por resistencia shunt";
      const Rs=.05+.01*k,I=U/(R+Rs);
      circuit=series(U,Rs,R);
      questions=[q("Intensidad del circuito",I,"A",`I=U/(R+Rshunt)=${U}/(${R}+${Rs})`),
        q("Tensión en el shunt",1000*I*Rs,"mV",`Ushunt=I·Rs=${I.toFixed(5)}·${Rs} V`)];
      scope="Modelización de medida ideal, sin incertidumbre ni límites instrumentales.";
    }else if(unit===17){
      title="Modelo resistivo de receptor luminoso";
      const P=U*U/R,h=1+k%5;circuit=source(U,R);
      questions=[q("Potencia consumida",P,"W",`P=U²/R=${U}²/${R}`),
        q("Energía tras "+h+" horas",P*h/1000,"kWh",`E=P·t/1000=${P.toFixed(4)}·${h}/1000`)];
      scope="No reproduce flujo luminoso, eficacia de iluminación ni comportamiento electrónico de lámparas LED.";
    }else if(unit===18){
      title="Transformador monofásico: relación de espiras";
      const ratio=.35+.05*(k%4),primary=60+10*k,secondary=primary*ratio;
      circuit=transformer(primary,ratio,R);
      questions=[q("Tensión secundaria ideal eficaz",secondary,"V",`U2=U1·N2/N1=${primary}·${ratio}`),
        q("Corriente secundaria ideal",1000*secondary/R,"mA",`I2=U2/R=${secondary}/${R} A`)];
      scope="El modelo Falstad incluye acoplamiento no ideal. Las respuestas son teóricas, no resultados exactos de ensayo.";
    }else if(unit===19){
      title="Circuito equivalente de inducido de motor CC";
      const primary=18+2*k,Em=6+k,Ra=2+k%5,I=(primary-Em)/Ra;
      circuit=motor(primary,Em,Ra);
      questions=[q("Corriente de inducido",I,"A",`Ia=(U−E)/Ra=(${primary}−${Em})/${Ra}`),
        q("Pérdida de cobre",Ra*I*I,"W",`Pcu=Ia²·Ra=${I.toFixed(4)}²·${Ra}`)];
      scope="Modelo de contraelectromotriz ideal: NO simula velocidad, par ni conmutación de la máquina.";
    }else if(unit===20){
      title="Devanado RL y velocidad síncrona";
      const f=50,L=.08+.02*k, poles=2*(1+k%3),XL=2*Math.PI*f*L;
      circuit=induct(U,R,L,true,f);
      questions=[q("Corriente eficaz del devanado",U/Math.hypot(R,XL),"A",`I=U/√(R²+(2πfL)²)`),
        q("Velocidad síncrona",120*f/poles,"rpm",`ns=120f/p=${120*f}/${poles}, p=${poles} polos`)];
      scope="Equivalente eléctrico RL; NO es un modelo dinámico de motor asíncrono o arranque Y-Δ.";
    }else if(unit===21){
      title="Modelo resistivo seguro de contacto a 12 V";
      const Rx=900+100*k,Rs=200+50*k,I=12/(Rx+Rs);
      circuit=series(12,Rs,Rx);
      questions=[q("Corriente a 12 V",1000*I,"mA",`I=12/(Rserie+Rcontacto)=12/(${Rs}+${Rx}) A`),
        q("Caída en resistencia de contacto",I*Rx,"V",`Uc=I·Rcontacto=${I.toFixed(5)}·${Rx}`)];
      scope="SOLO fuente ideal 12 V y resistencias: NO evalúa seguridad real, lesiones, diferenciales ni condiciones de contacto; no ensayar con personas.";
    }else throw Error("Unidad no catalogada "+unit);
    const id="PN-"+unit+"-"+a.kind+"-"+n;
    return {id,reference:a.id,bookPage:a.page,title,unit,
      circuit,questions,scope,
      steps:["Identifica los componentes del modelo en Falstad.",
        "Resuelve los cálculos de forma manual antes de mostrar la solución.",
        "Mide tensión y corriente seleccionando componentes del esquema y del osciloscopio.",
        "Varía un valor del montaje y explica el efecto; restaura el modelo antes de corregir."],
      warning:"Actividad original de apoyo: NO reproduce ni resuelve literalmente la referencia del libro Paraninfo."};
  }
  window.LabTextbookExercises={build,unitsSupported:21,
    validate(a){const e=build(a);return e.circuit.startsWith("$ ")&&
      e.questions.length===2&&e.questions.every(q=>Number.isFinite(q.value));}};
})();
