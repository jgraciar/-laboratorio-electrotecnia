import assert from "node:assert/strict";
import {chromium} from "playwright";

const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
page.on("pageerror",err=>console.error("BROWSER:",err.message));
try {
  await page.goto("http://127.0.0.1:8765/",{waitUntil:"domcontentloaded"});
  await page.waitForFunction(()=>window.LabCircuit?.isIntegrated?.(),null,{timeout:180000});
  await page.waitForFunction(()=>document.querySelector("#circuit-frame")?.contentWindow?.CircuitJS1,null,{timeout:180000});
  for(const ref of [
    {unit:2,kind:"resuelta",number:1},
    {unit:2,kind:"resuelta",number:2}
  ]){
    const meta=await page.evaluate(ref=>{
      const x=window.LabTextbookExercises.build(ref);
      const result=window.LabCircuit.loadExerciseCircuit(x.id,x.circuit);
      return {id:x.id,expected:x.measured,load:result};
    },ref);
    assert(meta.load?.ok,meta.id+": CircuitJS rechazó la importación: "+JSON.stringify(meta.load));
    await page.waitForFunction(id=>{
      const r=window.LabCircuit.getInstrumentReadings();
      return r?.id===id && r.time>=0.03 && Number.isFinite(r.current) &&
        Number.isFinite(r.voltage);
    },meta.id,{timeout:30000});
    const readings=await page.evaluate(()=>window.LabCircuit.getInstrumentReadings());
    for(const measure of meta.expected){
      const actual=readings[measure.type];
      const tolerance=Math.max(0.0001,Math.abs(measure.value)*0.005);
      const error=Math.abs(actual-measure.value);
      assert(error<=tolerance,meta.id+": "+measure.label+
        " calcula "+measure.value+", Falstad "+actual+", error "+error);
      console.log(meta.id,measure.label,"teoría",measure.value,"medido",actual);
    }
  }
  console.log("DOS ACTIVIDADES CONTRASTADAS CON MOTOR REAL CIRCUITJS");
}finally{await browser.close();}
