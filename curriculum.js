"use strict";
// Relación DIDÁCTICA y PARCIAL entre prácticas y RA/CE de las enseñanzas mínimas.
// Redacción del resultado de aprendizaje: currículo estatal; las descripciones de CE
// se han resumido fielmente. Consultar el BOE para el texto íntegro.
// Una simulación no acredita medidas reales ni la totalidad de un RA.
window.LabCurriculum = {
  E01: {
    ra:"RA1",
    title:"Realiza cálculos en circuitos eléctricos de corriente continua, aplicando principios y conceptos básicos de electricidad.",
    criteria:[
      ["b","Identifica magnitudes eléctricas y utiliza sus unidades correctamente."],
      ["c","Resuelve ejercicios aplicando la ley de Ohm (el CE también incluye variación de resistencia con la temperatura)."],
      ["g","Simplifica asociaciones de resistencias en serie y paralelo."],
      ["h","Calcula circuitos de corriente continua con asociaciones de resistencias."]
    ]
  },
  E02: {
    ra:"RA1",
    title:"Realiza cálculos en circuitos eléctricos de corriente continua, aplicando principios y conceptos básicos de electricidad.",
    criteria:[
      ["d","Calcula potencia eléctrica (el CE también trata energía y rendimiento)."],
      ["g","Simplifica conexiones serie-paralelo de resistencias."],
      ["h","Determina tensiones e intensidades en circuitos de corriente continua."]
    ]
  },
  E03: {
    ra:"RA3",
    title:"Realiza cálculos en circuitos eléctricos de corriente alterna (CA) monofásica, aplicando las técnicas más adecuadas.",
    criteria:[
      ["a","Identifica las características de señales senoidales."],
      ["b","Reconoce valores característicos de corriente alterna."],
      ["c","Relaciona tensión, corriente y potencia en cargas resistivas, inductivas y capacitivas."],
      ["d","Resuelve cálculos de magnitudes en circuitos de CA con R, L y C en serie."]
    ]
  },
  E04: {
    ra:"RA4",
    title:"Realiza cálculos de las magnitudes eléctricas básicas de un sistema trifásico, reconociendo el tipo de sistema y la naturaleza y tipo de conexión de los receptores.",
    criteria:[
      ["b","Describe sistemas de generación y distribución trifásicos de tres y cuatro conductores."],
      ["c","Identifica conexiones de cargas trifásicas en estrella y triángulo."],
      ["d","Diferencia cargas equilibradas y desequilibradas."],
      ["e","Calcula intensidades, tensiones y potencias en receptores trifásicos equilibrados."]
    ]
  },
  N01: {
    ra:"RA3",
    title:"Reconoce circuitos de rectificación y filtrado determinando sus características y aplicaciones.",
    criteria:[
      ["a","Reconoce los componentes del circuito rectificador."],
      ["d","Relaciona los símbolos de los esquemas con sus componentes."],
      ["e","Describe distintas configuraciones de rectificadores y filtros."],
      ["f","Monta o simula el circuito rectificador."]
    ]
  },
  N02: {
    ra:"RA1",
    title:"Reconoce circuitos lógicos combinacionales determinando sus características y aplicaciones.",
    criteria:[
      ["b","Describe funciones lógicas fundamentales."],
      ["c","Representa circuitos mediante simbología lógica adecuada."],
      ["d","Interpreta funciones combinacionales básicas."],
      ["f","Monta o simula circuitos lógicos."],
      ["g","Verifica el funcionamiento de los circuitos lógicos."]
    ]
  },
  SCE01: {
    ra:"RA1",
    title:"Determina los parámetros de sistemas eléctricos, realizando cálculos o medidas en circuitos de corriente alterna (c.a.).",
    criteria:[
      ["a","Reconoce las características de la señal alterna senoidal."],
      ["b","Reconoce el comportamiento de receptores ante corriente alterna."],
      ["c","Calcula tensión, intensidad, potencias, coseno de fi y otros parámetros en circuitos RLC."]
    ]
  },
  SCE02: {
    ra:"RA1",
    title:"Determina los parámetros de sistemas eléctricos, realizando cálculos o medidas en circuitos de corriente alterna (c.a.).",
    criteria:[
      ["b","Identifica el comportamiento de cargas R, L y C ante la corriente alterna."],
      ["c","Calcula magnitudes eléctricas y frecuencia de resonancia en un circuito RLC."]
    ]
  },
  SCE03: {
    ra:"RA1",
    title:"Determina los parámetros de sistemas eléctricos, realizando cálculos o medidas en circuitos de corriente alterna (c.a.).",
    criteria:[
      ["c","Calcula las potencias, tensiones y corrientes de una carga trifásica de CA."],
      ["d","Distingue los sistemas de distribución trifásicos a tres y cuatro hilos."]
    ]
  },
  SCE04: {
    ra:"RA3",
    title:"Caracteriza transformadores trifásicos, analizando su funcionamiento y realizando pruebas y ensayos.",
    criteria:[
      ["a","Distingue características físicas y funcionales de los transformadores, mediante una introducción monofásica."]
    ],
    caution:"Solo actividad introductoria monofásica. No reproduce un transformador trifásico ni sus ensayos; no acredita el RA3 completo. No se incluye el CE 3h porque aquí no se calcula regulación, rendimiento o caída de tensión."
  },
  SCE05: {
    ra:"RA5",
    title:"Caracteriza circuitos electrónicos analógicos, analizando su funcionamiento e identificando sus aplicaciones.",
    criteria:[
      ["d","Caracteriza circuitos amplificadores."],
      ["e","Comprueba de qué factores depende la ganancia de un amplificador operacional."],
      ["h","Visualiza y compara señales de entrada y salida de circuitos analógicos."]
    ]
  },
  SCE06: {
    ra:"RA6",
    title:"Caracteriza circuitos electrónicos digitales, analizando su funcionamiento e identificando sus aplicaciones.",
    criteria:[
      ["a","Reconoce las funciones lógicas fundamentales."],
      ["b","Representa esquemas de circuitos lógicos."],
      ["c","Interpreta funciones combinacionales."],
      ["g","Comprueba el funcionamiento de circuitos lógicos."],
      ["h","Utiliza programas informáticos para simular circuitos electrónicos."]
    ]
  }
};
window.LabCurriculumSources = {
  "Electrotecnia 0234":"https://www.boe.es/diario_boe/txt.php?id=BOE-A-2008-3957",
  "Electrónica 0233":"https://www.boe.es/diario_boe/txt.php?id=BOE-A-2008-3957",
  "Sistemas y Circuitos Eléctricos 0520":"https://www.boe.es/buscar/doc.php?id=BOE-A-2010-15355"
};
