"use strict";
// Consulta bibliográfica: ejercicios identificados por tipo, número y página.
// No se redistribuye el contenido protegido de la publicación.
(()=>{
  const $=id=>document.getElementById(id);
  const books=window.LabPublications||[];
  const select=$("publicationSelect"),unitSelect=$("publicationUnit"),panel=$("publicationContent");
  const typeSelect=$("publicationActivityType"),search=$("publicationActivitySearch");
  if(!select||!unitSelect||!panel)return;
  let visibleLimit=30;
  const typeNames={
    practica:"Prácticas de laboratorio",comprobacion:"Comprobación",
    evaluacion:"Evaluación resuelta",resuelta:"Actividad resuelta",propuesta:"Actividad propuesta",
    ampliacion:"Ampliación",experimental:"Actividad experimental"
  };
  const element=(tag,cls,text)=>{
    const el=document.createElement(tag);
    if(cls)el.className=cls;
    if(text!==undefined)el.textContent=text;
    return el;
  };
  const book=()=>books.find(b=>b.id===select.value)||books[0];
  const unit=()=>book()?.units.find(u=>String(u.number)===unitSelect.value);
  const labeled=(label,value)=>{
    const p=element("p","publication-field");
    p.append(element("strong","",label+" "),document.createTextNode(String(value)));
    return p;
  };
  function normalize(v){
    return String(v||"").toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g,"");
  }
  function openPractice(code){
    if(window.LabPractices?.open?.(code))return;
    panel.append(element("p","publication-muted",
      "No se pudo abrir la práctica: accede desde la pestaña «Prácticas guiadas»."));
  }
  function showActivities(){
    const root=$("publicationActivityResults");
    const summary=$("publicationActivityCount");
    if(!root||!summary)return;
    root.replaceChildren();
    const b=book(),u=unit();
    if(!b||!u)return;
    const filter=typeSelect?.value||"all";
    const term=normalize(search?.value).trim();
    const all=b.numberedActivities.filter(a=>a.unit===u.number);
    const matches=all.filter(a=>
      (filter==="all"||a.kind===filter) &&
      (!term||normalize([a.id,a.theme,a.kind,a.page].join(" ")).includes(term)));
    summary.textContent=matches.length+" referencias de "+all.length+
      " en esta unidad · "+b.numberedActivities.length+" en todo el libro.";
    if(!matches.length){
      root.append(element("p","publication-muted","No hay referencias que coincidan con estos filtros."));
      return;
    }
    const list=element("div","publication-numbered");
    for(const act of matches.slice(0,visibleLimit)){
      const card=element("div","publication-numbered-item");
      const head=element("strong","",act.id+" · p. impresa "+act.page);
      const pdf=element("small","","Página del PDF del docente: "+(act.page+b.printedToPdfOffset));
      const label=element("p","",act.theme);
      card.append(head,label,pdf);
      if(window.LabTextbookUI?.open){
        const own=element("button","toolbtn","Ejercicio original + Falstad");
        own.type="button";
        own.addEventListener("click",()=>window.LabTextbookUI.open(act));
        card.append(own);
      }
      if(act.practiceCode){
        const button=element("button","toolbtn","Abrir práctica relacionada ("+act.practiceCode+")");
        button.type="button";button.addEventListener("click",()=>openPractice(act.practiceCode));
        card.append(button);
      }
      list.append(card);
    }
    root.append(list);
    if(matches.length>visibleLimit){
      const more=element("button","toolbtn",
        "Mostrar más referencias ("+(matches.length-visibleLimit)+" restantes)");
      more.type="button";
      more.addEventListener("click",()=>{visibleLimit+=30;showActivities();});
      root.append(more);
    }
  }
  function render(){
    const b=book();panel.replaceChildren();
    if(!b)return;
    const header=element("header","publication-header");
    header.append(element("h3","",b.title),
      labeled("Autor:",b.author),labeled("Editorial:",b.publisher),
      labeled("Edición:",b.edition),labeled("ISBN:",b.isbn),
      labeled("Nivel y ciclo:",b.cycle),labeled("Módulo:",b.module));
    panel.append(header);
    panel.append(element("p","publication-note",
      b.units.length+" unidades · "+
      b.numberedActivities.length+" referencias localizadas en el ejemplar, con ejercicios originales generables. "+
      "Se muestran tipos, códigos y páginas para consultar cada actividad en el libro; los esquemas y enunciados no se reproducen."));
    const u=unit();if(!u)return;
    const section=element("section","publication-unit-content");
    section.append(element("h4","","Unidad "+u.number+" · "+u.title));
    section.append(labeled("Inicio:", "página impresa "+u.start+
      " · página PDF "+(u.start+b.printedToPdfOffset)));
    section.append(element("h5","","Secciones de actividades de la publicación"));
    if(!u.sections.length){
      section.append(element("p","publication-muted",
        "Consulta las referencias numeradas de esta unidad: se han identificado directamente sobre las páginas del libro."));
    }else{
      const ul=element("ul","publication-activity-list");
      u.sections.forEach(sec=>{
        const li=element("li","publication-activity");
        li.append(element("strong","",sec.type),
          element("span","","p. impresa "+sec.page+" · p. PDF "+(sec.page+b.printedToPdfOffset)));
        ul.append(li);
      });section.append(ul);
    }
    section.append(element("h5","","Actividades y ejercicios numerados"));
    const count=element("p","publication-activity-count");count.id="publicationActivityCount";
    const results=element("div","");results.id="publicationActivityResults";
    section.append(count,results);
    section.append(element("h5","","Circuitos Falstad y prácticas vinculadas por contenido"));
    if(!u.practiceCodes.length){
      section.append(element("p","publication-muted",
        "Sin práctica Falstad vinculada a esta unidad por el momento. "+
        "Las referencias del libro están catalogadas, pero no se atribuye una simulación inexistente."));
    }else{
      const actions=element("div","publication-linked");
      u.practiceCodes.forEach(code=>{
        const button=element("button","toolbtn","Abrir "+code);
        button.type="button";button.addEventListener("click",()=>openPractice(code));
        actions.append(button);
      });section.append(actions);
      section.append(element("p","publication-muted",
        "Las simulaciones trabajan contenidos relacionados, pero no son copias exactas ni soluciones de los ejercicios originales."));
    }
    panel.append(section);
    showActivities();
  }
  function repopulateUnits(){
    window.LabTextbookUI?.close();
    const b=book();unitSelect.replaceChildren();
    if(!b){panel.replaceChildren();return;}
    b.units.forEach(u=>{
      const opt=element("option","",String(u.number).padStart(2,"0")+" · "+u.title);
      opt.value=String(u.number);unitSelect.append(opt);
    });
    unitSelect.value=String(b.units[0]?.number||"");
    visibleLimit=30;
    if(typeSelect)typeSelect.value="all";
    if(search)search.value="";
    render();
  }
  books.forEach(b=>{
    const opt=element("option","",b.publisher+" · "+b.title+" ("+b.edition+")");
    opt.value=b.id;select.append(opt);
  });
  select.value=books[0]?.id||"";
  select.addEventListener("change",repopulateUnits);
  unitSelect.addEventListener("change",()=>{window.LabTextbookUI?.close();visibleLimit=30;render();});
  typeSelect?.addEventListener("change",()=>{visibleLimit=30;showActivities();});
  search?.addEventListener("input",()=>{visibleLimit=30;showActivities();});
  window.LabPublicationsUI={
    openBookUnit(bookId,number){
      select.value=bookId;repopulateUnits();
      if(number!==undefined)unitSelect.value=String(number);
      render();window.LabScope?.setMode("publications");
    }
  };
  repopulateUnits();
})();