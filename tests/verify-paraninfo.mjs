import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";
const src=readFileSync(new URL("../textbook-exercises.js",import.meta.url),"utf8");
const sandbox=vm.createContext({window:{},Math});
vm.runInContext(src,sandbox);
const lab=sandbox.window.LabTextbookExercises;
const cases=[
  [2,1,[1.2],[12,10]],
  [2,2,[1150],[230,1150]],
  [3,3,[4.6,1058],[230,50]],
  [3,5,[125,31.25],[125,31.25]],
  [3,6,[Math.sqrt(700*75.6)],[230,75.6]],
  [3,9,[4,14400000],null],
  [3,10,[120,10.8],null],
  [4,1,[600000,144000],null],
  [4,4,[2400000,10000000/3600,230**2/(10000000/3600)],[230,230**2/(10000000/3600)]],
  [4,5,[2.8,.25],[230,230**2/(10000000/3600)]],
  [4,6,[12.5,225000,168750/(7000*.11)],[125,10]]
];
assert.equal(lab.totalCatalogued,cases.length);
for(const [unit,number,expected,elec] of cases){
  const entry={unit,kind:"resuelta",number,id:"Actividad resuelta "+unit+"."+number};
  assert(lab.has(entry)&&lab.validate(entry));
  const x=lab.build(entry);
  assert(x.statement.length>20 && x.bookPage>0 && x.pdfPage===x.bookPage+26);
  assert.equal(x.questions.length,expected.length);
  expected.forEach((v,i)=>assert(Math.abs(x.questions[i].value-v)<=1e-8*Math.max(1,Math.abs(v))));
  if(elec){
    assert(x.circuit && x.measured.length===3);
    const parts=x.circuit.trim().split("\n");
    const R=parts.find(s=>s.startsWith("r ")).split(" ");
    const V=parts.find(s=>s.startsWith("v ")).split(" ");
    assert(Math.abs(Number(R[6])-elec[1])<1e-8);
    assert(Math.abs(Number(V[8])-elec[0])<1e-8);
    assert(parts.some(s=>s.startsWith("370 ")));
    assert(parts.some(s=>s.startsWith("p ")));
    assert(parts.some(s=>s.startsWith("420 ")));
    assert(Math.abs(x.measured[0].value-elec[0]/elec[1])<1e-8);
    assert(Math.abs(x.measured[2].value-elec[0]*elec[0]/elec[1])<1e-8);
  }else assert.equal(x.circuit,null);
  console.log("Comprobación matemática y esquema: AR "+unit+"."+number+" OK");
}
assert(!lab.has({unit:6,kind:"resuelta",number:1}));
console.log("Actividades originales:",cases.length);
