import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";

// Prueba automatizada de estructura y cálculos independientes.
// NO sustituye a la comparación posterior con el motor CircuitJS.
const source=readFileSync(new URL("../textbook-exercises.js",import.meta.url),"utf8");
const context=vm.createContext({window:{},Math});
vm.runInContext(source,context,{filename:"textbook-exercises.js"});
const lab=context.window.LabTextbookExercises;
const refs=[
  {unit:2,kind:"resuelta",number:1,id:"Actividad resuelta 2.1",u:12,r:10,expected:1.2},
  {unit:2,kind:"resuelta",number:2,id:"Actividad resuelta 2.2",u:230,r:1150,expected:0.2}
];
for(const ref of refs){
  assert(lab.has(ref),ref.id+" no catalogada");
  assert(lab.validate(ref),ref.id+" no valida su sintaxis básica");
  const e=lab.build(ref);
  assert(e.statement && e.bookPage===24 && e.pdfPage===50);
  const entries=e.circuit.split("\n");
  const resistor=entries.find(s=>s.startsWith("r ")).split(/\s+/);
  const source=entries.find(s=>s.startsWith("v ")).split(/\s+/);
  assert.equal(Number(resistor[6]),ref.r);
  assert.equal(Number(source[8]),ref.u);
  assert(entries.some(s=>s.startsWith("370 ")),"No hay amperímetro en "+ref.id);
  assert(entries.some(s=>s.startsWith("p ")),"No hay voltímetro en "+ref.id);
  assert(Math.abs(ref.u/ref.r-ref.expected)<1e-12);
  assert.equal(e.measured.find(m=>m.type==="current").value,ref.expected);
  assert.equal(e.measured.find(m=>m.type==="voltage").value,ref.u);
  const q=e.questions[0];
  if(ref.number===1)assert.equal(q.value,ref.expected);
  if(ref.number===2)assert.equal(q.value,ref.r);
  console.log("Cálculo y estructura:",ref.id,"OK");
}
assert.equal(lab.build({unit:6,kind:"resuelta",number:1}),null,
  "Los ejercicios genéricos no pueden mostrarse como originales.");
console.log("Las 2 fichas pasan la comprobación analítica y estructural.");
console.log("PENDIENTE: medidas reales de CircuitJS en un navegador.");
