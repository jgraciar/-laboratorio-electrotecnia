"use strict";
(() => {
  const $ = id => document.getElementById(id);
  let mode = "generator";
  let falstadLoaded = false;
  const COLORS = ["#65c3f8","#f9b866","#72deb1"];
  const TAU = Math.PI * 2;
  const num = id => Number($(id).value);
  const finite = (value,fallback) => Number.isFinite(value) ? value : fallback;
  const clamp = (v,min,max) => Math.max(min,Math.min(max,v));
  const fmt = (v,digits=3) => Number.isFinite(v) ?
    v.toLocaleString("es-ES",{maximumFractionDigits:digits}) : "—";
  const wrap = x => ((x % TAU) + TAU) % TAU;
  function wave(phase,kind,duty) {
    const p = wrap(phase) / TAU;
    if (kind === "sine") return Math.sin(phase);
    if (kind === "triangle") return 1 - 4 * Math.abs(p - 0.5);
    if (kind === "saw") return 2 * p - 1;
    if (kind === "pulse") return p < duty ? 1 : 0;
    return p < duty ? 1 : -1;
  }
  function metric(label,value) {
    const box = document.createElement("div");
    box.className = "metric";
    const key = document.createElement("small");
    key.textContent = label;
    const content = document.createElement("strong");
    content.textContent = value;
    box.append(key,content);
    return box;
  }
  function showMetrics(items) {
    $("metrics").replaceChildren(...items.map(([k,v])=>metric(k,v)));
  }
  function getGenerator() {
    return {
      shape: $("waveform").value,
      frequency: clamp(finite(num("frequency"),50),0.1,100000),
      amplitude: clamp(finite(num("amplitude"),5),0,100000),
      offset: finite(num("offset"),0),
      phase: finite(num("phase"),90) * Math.PI / 180,
      duty: clamp(finite(num("duty"),50)/100,0.01,0.99)
    };
  }
  function getThreephase() {
    const uLine = clamp(finite(num("lineVoltage"),400),0,10000);
    const frequency = clamp(finite(num("threeFrequency"),50),0.1,10000);
    const r = Math.max(0.01,finite(num("resistance"),100));
    const l = Math.max(0,finite(num("inductance"),0)) / 1000;
    const c = Math.max(0,finite(num("capacitance"),0)) * 1e-6;
    const omega = TAU * frequency;
    // c = 0 significa condensador omitido, no circuito abierto.
    const x = omega*l - (c > 0 ? 1/(omega*c) : 0);
    const z = Math.hypot(r,x);
    const phi = Math.atan2(x,r);
    const ur = uLine/Math.sqrt(3);
    const ir = z > 0 ? ur/z : 0;
    const sequence = Number($("sequence").value) === -1 ? -1 : 1;
    const angles = [0,-sequence*TAU/3,sequence*TAU/3];
    return {uLine,frequency,ur,ir,z,phi,x,r,angles};
  }
  function sampleSet() {
    if (mode === "threephase") {
      const s = getThreephase();
      const peak = Math.SQRT2*s.ur, currentPeak = Math.SQRT2*s.ir;
      const t = $("traceMode").value;
      let traces;
      if (t === "current") {
        traces = s.angles.map((angle,i)=>({
          name:"I" + (i+1),color:COLORS[i],
          value:time=>currentPeak*Math.sin(TAU*s.frequency*time+angle-s.phi)
        }));
      } else if (t === "line") {
        traces = s.angles.map((angle,i)=>({
          name:["U12","U23","U31"][i],color:COLORS[i],
          value:time=>peak*(Math.sin(TAU*s.frequency*time+angle) -
            Math.sin(TAU*s.frequency*time+s.angles[(i+1)%3]))
        }));
      } else {
        traces = s.angles.map((angle,i)=>({
          name:"U" + (i+1) + "N",color:COLORS[i],
          value:time=>peak*Math.sin(TAU*s.frequency*time+angle)
        }));
      }
      const p = 3*s.ur*s.ir*Math.cos(s.phi);
      const q = 3*s.ur*s.ir*Math.sin(s.phi);
      const apparent = 3*s.ur*s.ir;
      const fp = apparent>0 ? p/apparent : 0;
      showMetrics([
        ["U fase RMS",fmt(s.ur)+" V"],
        ["U línea RMS",fmt(s.uLine)+" V"],
        ["I fase RMS",fmt(s.ir)+" A"],
        ["|Z| por fase",fmt(s.z)+" Ω"],
        ["Ángulo de carga",fmt(s.phi*180/Math.PI)+"°"],
        ["Potencia activa P",fmt(p)+" W"],
        ["Potencia reactiva Q",fmt(q)+" var"],
        ["Potencia aparente S",fmt(apparent)+" VA"],
        ["Factor de potencia",fmt(fp,4)],
        ["Reactancia X",fmt(s.x)+" Ω"],
        ["Secuencia",Number($("sequence").value)===1?"ABC":"ACB"]
      ]);
      return {frequency:s.frequency,traces,unit:t==="current"?"A":"V"};
    }
    const s = getGenerator();
    const traces = [
      {name:"CH1",color:COLORS[0],value:time=>s.offset+s.amplitude*wave(TAU*s.frequency*time,s.shape,s.duty)},
      {name:"CH2",color:COLORS[1],value:time=>s.offset+s.amplitude*wave(TAU*s.frequency*time+s.phase,s.shape,s.duty)}
    ];
    let mean,acSquare;
    if(s.shape==="pulse") {
      mean=s.amplitude*s.duty;
      acSquare=s.amplitude*s.amplitude*s.duty;
    } else if(s.shape==="square") {
      mean=s.amplitude*(2*s.duty-1);
      acSquare=s.amplitude*s.amplitude;
    } else {
      mean=0;
      acSquare=s.amplitude*s.amplitude*(s.shape==="sine"?0.5:1/3);
    }
    const rms=Math.sqrt(Math.max(0,acSquare+2*s.offset*mean+s.offset*s.offset));
    const vpp=s.shape==="pulse"?s.amplitude:2*s.amplitude;
    showMetrics([
      ["Frecuencia",fmt(s.frequency)+" Hz"],
      ["Periodo",fmt(1000/s.frequency,5)+" ms"],
      ["V pico",fmt(s.amplitude)+" V"],
      ["Vpp",fmt(vpp)+" V"],
      ["V RMS",fmt(rms)+" V"],
      ["Valor medio",fmt(mean+s.offset)+" V"],
      ["Desfase CH2",fmt(s.phase*180/Math.PI)+"°"]
    ]);
    return {frequency:s.frequency,traces,unit:"V"};
  }
  function draw() {
    if (mode === "falstad") return;
    const {frequency,traces,unit} = sampleSet();
    const canvas = $("scope");
    const bounds = canvas.getBoundingClientRect();
    if(bounds.width < 1 || bounds.height < 1) return;
    const dpi = Math.min(2.5,window.devicePixelRatio||1);
    canvas.width = Math.round(bounds.width*dpi);
    canvas.height = Math.round(bounds.height*dpi);
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpi,0,0,dpi,0,0);
    const w=bounds.width, h=bounds.height;
    ctx.clearRect(0,0,w,h);
    const padLeft=49,padRight=14,padTop=14,padBottom=30;
    const gw=w-padLeft-padRight, gh=h-padTop-padBottom;
    ctx.font="11px system-ui";
    ctx.lineWidth=1;
    ctx.strokeStyle="#24374b";
    ctx.fillStyle="#96aec9";
    for(let i=0;i<=10;i++){
      const x=padLeft+gw*i/10;
      ctx.beginPath();ctx.moveTo(x,padTop);ctx.lineTo(x,padTop+gh);ctx.stroke();
    }
    for(let i=0;i<=8;i++){
      const y=padTop+gh*i/8;
      ctx.beginPath();ctx.moveTo(padLeft,y);ctx.lineTo(padLeft+gw,y);ctx.stroke();
    }
    const duration=2/frequency;
    const samples=550;
    let max=0;
    const tracePoints=traces.map(tr=>Array.from({length:samples+1},(_,i)=>{
      const val=tr.value(duration*i/samples);
      max=Math.max(max,Math.abs(val));
      return val;
    }));
    max=Math.max(max*1.12,0.001);
    ctx.fillStyle="#9bb0c8";
    ctx.fillText(fmt(max)+" "+unit,4,padTop+9);
    ctx.fillText("0",28,padTop+gh/2+4);
    ctx.fillText(fmt(-max)+" "+unit,4,padTop+gh-2);
    ctx.fillText("0",padLeft,padTop+gh+17);
    ctx.textAlign="right";
    ctx.fillText(fmt(1000*duration,5)+" ms",padLeft+gw,padTop+gh+17);
    ctx.textAlign="left";
    ctx.strokeStyle="#61758a";
    ctx.beginPath();ctx.moveTo(padLeft,padTop+gh/2);ctx.lineTo(padLeft+gw,padTop+gh/2);ctx.stroke();
    tracePoints.forEach((values,i)=>{
      ctx.beginPath();ctx.strokeStyle=traces[i].color;ctx.lineWidth=2;
      for(let j=0;j<=samples;j++){
        const x=padLeft+gw*j/samples;
        const y=padTop+gh/2-values[j]/max*(gh/2);
        if(j===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
      }
      ctx.stroke();
    });
    const legend=$("legend");
    legend.replaceChildren(...traces.map(t=>{
      const span=document.createElement("span"),bar=document.createElement("i");
      bar.style.background=t.color;
      span.append(bar,document.createTextNode(t.name));return span;
    }));
    $("scope-subtitle").textContent="Dos periodos · "+fmt(frequency)+" Hz · "+(mode==="threephase"?"red equilibrada":"funciones virtuales");
  }
  function setMode(next) {
    mode=next;
    document.querySelectorAll("[data-mode]").forEach(button=>{
      const active=button.dataset.mode===mode;
      button.classList.toggle("active",active);
      button.setAttribute("aria-pressed",String(active));
    });
    $("generator-controls").hidden=mode!=="generator";
    $("threephase-controls").hidden=mode!=="threephase";
    $("falstad-controls").hidden=mode!=="falstad";
    $("scope-panel").hidden=mode==="falstad";
    $("trace-mode-label").hidden=mode!=="threephase";
    if(mode==="falstad" && !falstadLoaded){
      $("circuit-frame").src=$("circuit-frame").dataset.src;
      falstadLoaded=true;
    }
    draw();
  }
  document.querySelectorAll("[data-mode]").forEach(button=>{
    button.addEventListener("click",()=>setMode(button.dataset.mode));
  });
  const controls=[
    "waveform","frequency","amplitude","offset","phase","duty",
    "lineVoltage","threeFrequency","sequence","resistance","inductance","capacitance","traceMode"
  ];
  controls.forEach(id=>$(id).addEventListener("input",draw));
  window.addEventListener("resize",draw);
  setMode("generator");
})();
