"use strict";
// Catálogo de publicaciones y navegación a las prácticas educativas.
// Los ejercicios individuales se incorporan solo tras identificar su referencia
// en el ejemplar correspondiente, sin copiar enunciados ni solucionarios.
(()=>{
  const $=id=>document.getElementById(id);
  const books=window.LabPublications||[];
  const select=$("publicationSelect"),unitSelect=$("publicationUnit"),panel=$("publicationContent");
  if(!select || !unitSelect || !panel)return;
  const element=(tag,className,txt)=>{
    const a=document.createElement(tag);
    if(className)a.className=className;
    if(txt!==undefined)a.textContent=txt;
    return a;
  };
  const book=()=>books.find(b=>b.id===select.value)||books[0];
  const unit=()=>book()?.units.find(u=>String(u.number)===unitSelect.value);
  function labeled(key,value){
    const line=element("p","publication-field");
    line.append(element("strong","",key+" "),document.createTextNode(value));
    return line;
  }
  function info(){
    const b=book();if(!b)return;
    panel.replaceChildren();
    const h=element("header","publication-header");
    h.append(element("h3","",b.title),labeled("Autor:",b.author),
      labeled("Editorial:",b.publisher),labeled("Edición:",b.edition),
      labeled("ISBN:",b.isbn),labeled("Nivel y ciclo:",b.cycle),
      labeled("Módulo:",b.module));
    panel.append(h);
    const note=element("p","publication-note",
      "Se han identificado "+b.units.length+" unidades y sus secciones de actividades mediante el índice del libro. La extracción de referencias numeradas de ejercicios está en curso, empezando por la Unidad 2.");
    panel.append(note);
    const u=unit();if(!u)return;
    const section=element("section","publication-unit-content");
    section.append(element("h4","","Unidad "+u.number+" · "+u.title));
    section.append(labeled("Inicio:", "página impresa "+u.start+" · PDF del ejemplar, página "+(u.start+b.printedToPdfOffset)));
    const h5=element("h5","","Secciones de actividades del libro");
    section.append(h5);
    if(!u.sections.length){
      section.append(element("p","publication-muted","Las páginas de las secciones de actividades de esta unidad están pendientes de verificar."));
    }else{
      const list=element("ul","publication-activity-list");
      u.sections.forEach(entry=>{
        const li=element("li","publication-activity");
        const label=element("strong","",entry.type);
        const page=element("span","","p. impresa "+entry.page+" · p. PDF "+(entry.page+b.printedToPdfOffset));
        li.append(label,page);list.append(li);
      });
      section.append(list);
    }
    const activities=b.numberedActivities.filter(x=>x.unit===u.number);
    section.append(element("h5","","Actividades numeradas identificadas"));
    if(!activities.length){
      section.append(element("p","publication-muted","Pendiente de incorporar las referencias numeradas de esta unidad. Consulta las secciones y páginas indicadas en el libro."));
    }else{
      const list=element("div","publication-numbered");
      activities.forEach(act=>{
        const card=element("div","publication-numbered-item");
        card.append(element("strong","",act.id+" · p. "+act.page),
          element("p","",act.theme));
        const sourceText=element("small","","Referencia bibliográfica identificada; el enunciado original está en el libro.");
        card.append(sourceText);
        if(act.practiceCode){
          const link=element("button","toolbtn","Abrir práctica relacionada ("+act.practiceCode+")");
          link.type="button";
          link.addEventListener("click",()=>openPractice(act.practiceCode));
          card.append(link);
        }
        list.append(card);
      });section.append(list);
    }
    section.append(element("h5","","Simulaciones y prácticas relacionadas"));
    if(!u.practiceCodes.length){
      section.append(element("p","publication-muted","Esta unidad aún no dispone de una práctica del laboratorio asignada y validada. La relación de actividades del libro seguirá ampliándose."));
    }else{
      const actions=element("div","publication-linked");
      u.practiceCodes.forEach(code=>{
        const btn=element("button","toolbtn","Abrir "+code);
        btn.type="button";btn.addEventListener("click",()=>openPractice(code));
        actions.append(btn);
      });
      section.append(actions);
      section.append(element("p","publication-muted",
        "Las prácticas anteriores están relacionadas por contenidos, pero no son reproducciones ni soluciones de ejercicios concretos del libro."));
    }
    panel.append(section);
  }
  function openPractice(code){
    const api=window.LabPractices;
    if(api?.open){
      api.open(code);return;
    }
    const notice=element("p","publication-muted","No se pudo abrir la práctica; vuelve a intentarlo desde «Prácticas guiadas».");
    panel.append(notice);
  }
  function repopulateUnits(){
    const b=book();unitSelect.replaceChildren();
    if(!b){panel.replaceChildren();return}
    b.units.forEach(u=>{
      const opt=element("option","",String(u.number).padStart(2,"0")+" · "+u.title);
      opt.value=String(u.number);
      unitSelect.append(opt);
    });
    unitSelect.value=String(b.units[0]?.number||"");
    info();
  }
  books.forEach(b=>{
    const opt=element("option","",b.publisher+" · "+b.title+" ("+b.edition+")");
    opt.value=b.id;select.append(opt);
  });
  select.value=books[0]?.id||"";
  select.addEventListener("change",repopulateUnits);
  unitSelect.addEventListener("change",info);
  window.LabPublicationsUI={
    openBookUnit(bookId,number){
      select.value=bookId;repopulateUnits();
      if(number!==undefined)unitSelect.value=String(number);
      info();window.LabScope?.setMode("publications");
    }
  };
  repopulateUnits();
})();