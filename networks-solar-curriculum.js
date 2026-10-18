"use strict";
// Vinculaciones parciales con criterios de evaluación de las enseñanzas mínimas
// del RD 177/2008 (GM) y del RD 1127/2010 (GS).
// Las descripciones son síntesis didácticas; consultar la redacción literal en el BOE.
Object.assign(window.LabCurriculum, {
  ID01:{
    ra:"RA1",
    title:"Identifica la configuración y los tipos de centros de transformación, describiendo las características y funciones de cada elemento.",
    criteria:[
      ["a","Reconocimiento de la función del CT y su posición en el sistema eléctrico."],
      ["c","Identificación de las partes fundamentales del CT."],
      ["h","Reconocimiento de las conexiones y características de los cuadros de distribución en BT."]
    ],
    caution:"El cálculo nominal del CT y el esquema teórico son actividades introductorias: no incluyen identificación real de celdas, aparatos ni procedimientos de seguridad."
  },
  ID02:{
    ra:"RA2",
    title:"Identifica la configuración de una red de distribución en baja tensión reconociendo sus componentes y describiendo sus características según el tipo de instalación.",
    criteria:[["e","Cálculo para la determinación del conductor siguiendo las prescripciones reglamentarias (solo una componente del cálculo, la caída de tensión)."]],
    caution:"El ejercicio solo calcula la caída resistiva; NO realiza la selección reglamentaria completa del conductor."
  },
  ID03:{
    ra:"RA3",
    title:"Configura instalaciones de enlace seleccionando los elementos que las componen y su emplazamiento.",
    criteria:[
      ["a","Interpretación de los elementos del proyecto de enlace y de sus condiciones de montaje (trabajo teórico)."],
      ["f","Dimensionado de LGA y derivaciones individuales (solo cálculo preliminar de intensidad y caída)."]
    ],
    caution:"No calcula la previsión reglamentaria de cargas ni verifica las demás condiciones de las ITC-BT; no equivale a una memoria técnica de diseño."
  },
  ID04:{
    ra:"RA2",
    title:"Identifica la configuración de una red de distribución en baja tensión reconociendo sus componentes y describiendo sus características según el tipo de instalación.",
    criteria:[
      ["d","Identificación y representación de elementos de la red mediante esquemas (aproximación simplificada)."],
      ["e","Cálculo para la determinación del conductor siguiendo las prescripciones reglamentarias (solo magnitudes preliminares)."]
    ],
    caution:"Faltan trazado, protecciones, intensidad admisible y demás comprobaciones necesarias para configurar una red real."
  },
  DR01:{
    ra:"RA2",
    title:"Caracteriza las redes eléctricas de distribución de baja tensión, analizando su estructura e identificando sus parámetros típicos y normas de aplicación.",
    criteria:[["e","Cálculo de magnitudes y parámetros característicos de una red de distribución en BT."]],
    caution:"Modelo resistivo preliminar; no sustituye una comprobación reglamentaria ni un proyecto de red."
  },
  DR02:{
    ra:"RA5",
    title:"Configura Centros de Transformación de interior o intemperie elaborando esquemas y seleccionando sus equipos y elementos.",
    criteria:[["b","Cálculo de magnitudes eléctricas nominales de un CT y sus componentes."]],
    caution:"No se dimensionan tierras, celdas, protecciones ni equipamiento reglamentario."
  },
  DR03:{
    ra:"RA3",
    title:"Configura redes de baja tensión aérea o subterránea de baja tensión, analizando anteproyectos o condiciones dadas y seleccionando los elementos que las componen.",
    criteria:[["d","Cálculos eléctricos y mecánicos de la red (aquí solo el cálculo eléctrico resistivo preliminar)."]],
    caution:"La actividad no incluye el cálculo mecánico ni la selección final de equipos y materiales."
  },
  DR04:{
    ra:"RA6",
    title:"Define las pruebas y ensayos de los elementos de los centros de transformación, empleando la información de los fabricantes y elaborando la documentación técnica correspondiente.",
    criteria:[
      ["c","Determinación de características técnicas de los transformadores a partir de datos propuestos."],
      ["f","Identificación de ensayos de vacío, cortocircuito y carga."],
      ["h","Documentación de resultados y cálculos propuestos (parcial)."]
    ],
    caution:"Es un análisis de datos hipotéticos, no un ensayo de transformador real."
  },
  FV01:{
    ra:"RA2",
    title:"Configura instalaciones solares fotovoltaicas justificando la elección de los elementos que la conforman.",
    criteria:[["c","Cálculo de los parámetros característicos del generador FV en serie y paralelo."]],
    caution:"No contempla temperatura extrema, irradiancia real, elección de inversor/regulador o comprobación normativa."
  },
  FV02:{
    ra:"RA2",
    title:"Configura instalaciones solares fotovoltaicas justificando la elección de los elementos que la conforman.",
    criteria:[["c","Estimación de parámetros de potencia y energía de un generador fotovoltaico."]],
    caution:"La energía obtenida es estimativa y depende de HSP y PR hipotéticos: no es un estudio de producción real."
  },
  FV03:{
    ra:"RA2",
    title:"Configura instalaciones solares fotovoltaicas justificando la elección de los elementos que la conforman.",
    criteria:[["c","Cálculo de características energéticas y capacidad de acumulación teórica."]],
    caution:"No sustituye a la selección real de baterías y sus protecciones ni considera el BMS o el ciclo de vida."
  },
  FV04:{
    ra:"RA2",
    title:"Configura instalaciones solares fotovoltaicas justificando la elección de los elementos que la conforman.",
    criteria:[["c","Cálculos de potencia, tensiones y corrientes para una configuración FV."]],
    caution:"Los valores STC y la corriente ideal de salida NO bastan para seleccionar un regulador MPPT ni garantizan su seguridad."
  }
});
Object.assign(window.LabCurriculumSources, {
  "Instalaciones de distribución 0236":"https://www.boe.es/diario_boe/txt.php?id=BOE-A-2008-3957",
  "Instalaciones solares fotovoltaicas 0239":"https://www.boe.es/diario_boe/txt.php?id=BOE-A-2008-3957",
  "Desarrollo de redes eléctricas y centros de transformación 0522":"https://www.boe.es/buscar/doc.php?id=BOE-A-2010-15355"
});
