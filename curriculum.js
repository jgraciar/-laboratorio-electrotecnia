"use strict";
// Referencias curriculares sintetizadas para navegación didáctica.
// Las descripciones NO son transcripciones literales: consultar la norma enlazada.
// La realización de una práctica NO acredita por sí sola un RA o CE completo.
window.LabCurriculum = {
  E01: {
    ra:"RA1",title:"Cálculos y fundamentos de circuitos eléctricos de corriente continua",
    criteria:[
      ["b","Magnitudes eléctricas y sus unidades"],
      ["c","Problemas basados en la ley de Ohm"],
      ["g","Simplificación de asociaciones de resistencias"],
      ["h","Resolución de circuitos de CC en serie y paralelo"]
    ]
  },
  E02: {
    ra:"RA1",title:"Cálculos y fundamentos de circuitos eléctricos de corriente continua",
    criteria:[
      ["d","Cálculos de potencia y energía eléctrica"],
      ["g","Agrupaciones de resistencias en serie"],
      ["h","Cálculos de tensiones e intensidades en circuitos de CC"]
    ]
  },
  E03: {
    ra:"RA3",title:"Cálculo y análisis de circuitos monofásicos de corriente alterna",
    criteria:[
      ["a","Características de una señal senoidal"],
      ["b","Valores característicos de la corriente alterna"],
      ["c","Relaciones entre tensión, corriente y potencia en receptores de CA"],
      ["d","Cálculos en circuitos de CA con R, L y C en serie"]
    ]
  },
  E04: {
    ra:"RA4",title:"Magnitudes de sistemas trifásicos y conexiones de receptores",
    criteria:[
      ["b","Distribución trifásica a tres y cuatro hilos"],
      ["c","Conexiones estrella y triángulo"],
      ["d","Diferencia entre cargas equilibradas y desequilibradas"],
      ["e","Cálculos de tensión, intensidad y potencia en cargas equilibradas"]
    ]
  },
  N01: {
    ra:"RA3",title:"Análisis de circuitos electrónicos de rectificación y filtrado",
    criteria:[
      ["a","Identificación de los componentes de rectificación"],
      ["d","Identificación de componentes y símbolos en esquemas"],
      ["e","Reconocimiento de rectificadores y filtros"],
      ["f","Simulación de circuitos de rectificación"]
    ]
  },
  N02: {
    ra:"RA1",title:"Reconocimiento de circuitos lógicos combinacionales",
    criteria:[
      ["b","Funciones lógicas fundamentales"],
      ["c","Representación simbólica de circuitos lógicos"],
      ["d","Interpretación de funciones combinacionales"],
      ["f","Montaje o simulación de circuitos lógicos"],
      ["g","Comprobación del funcionamiento del circuito"]
    ]
  },
  SCE01: {
    ra:"RA1",title:"Parámetros y cálculos en sistemas de corriente alterna",
    criteria:[
      ["a","Características de señales alternas senoidales"],
      ["b","Comportamiento de receptores en corriente alterna"],
      ["c","Cálculos de U, I, impedancia, potencia y cos φ en RLC"]
    ]
  },
  SCE02: {
    ra:"RA1",title:"Parámetros y cálculos en sistemas de corriente alterna",
    criteria:[
      ["b","Respuesta de los receptores frente a la corriente alterna"],
      ["c","Cálculos de impedancia y frecuencia de resonancia en RLC"]
    ]
  },
  SCE03: {
    ra:"RA1",title:"Parámetros y cálculos en sistemas de corriente alterna",
    criteria:[
      ["c","Cálculos de intensidad, tensión y potencia en cargas de CA"],
      ["d","Distribución trifásica a tres y cuatro hilos"]
    ]
  },
  SCE04: {
    ra:"RA3",title:"Caracterización y ensayos de transformadores trifásicos",
    criteria:[
      ["a","Características físicas y funcionales de transformadores: introducción parcial con modelo monofásico"]
    ],
    caution:"Actividad introductoria. No representa un transformador trifásico ni incluye ensayos de vacío/cortocircuito; no acredita por sí misma el RA3."
  },
  SCE05: {
    ra:"RA5",title:"Funcionamiento y aplicaciones de circuitos analógicos",
    criteria:[
      ["d","Caracterización de amplificadores"],
      ["e","Dependencia de la ganancia en amplificadores operacionales"],
      ["h","Visualización de señales de entrada y salida"]
    ]
  },
  SCE06: {
    ra:"RA6",title:"Funcionamiento y aplicaciones de circuitos digitales",
    criteria:[
      ["a","Reconocimiento de funciones lógicas básicas"],
      ["b","Representación de circuitos lógicos"],
      ["c","Interpretación de funciones combinacionales"],
      ["g","Comprobación del funcionamiento de circuitos lógicos"],
      ["h","Simulación informática de circuitos digitales"]
    ]
  }
};
window.LabCurriculumSources = {
  "Electrotecnia 0234":"https://www.boe.es/buscar/doc.php?id=BOE-A-2008-3957",
  "Electrónica 0233":"https://www.boe.es/buscar/doc.php?id=BOE-A-2008-3957",
  "Sistemas y Circuitos Eléctricos 0520":"https://www.boe.es/buscar/doc.php?id=BOE-A-2010-15355"
};
