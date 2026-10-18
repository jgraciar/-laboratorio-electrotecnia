"use strict";
// Actividades originales para el módulo 0520 (CFGS Sistemas Electrotécnicos y Automatizados).
// RA/CE: RD 1127/2010, anexo I, módulo Sistemas y circuitos eléctricos.
// Cálculos teóricos sobre montajes originales de CircuitJS; no son ensayos reales.
window.SCE_PRACTICES=[
  {
    code:"SCE01",module:"Sistemas y Circuitos Eléctricos 0520",title:"Impedancia, desfase y potencia de una carga RL",
    file:"inductac.txt",duration:"45–55 min",
    ra:"RA1 · Parámetros de sistemas eléctricos en corriente alterna",
    ce:["1a","1b","1c"],
    description:"Carga RL serie: R = 180 Ω, L = 1 H, fuente senoidal de 5 V de pico y frecuencia 40 Hz. Se comparan magnitudes de pico y eficaces.",
    objectives:["Resolver fasorialmente una carga inductiva.","Determinar reactancia, impedancia, desfase y factor de potencia.","Contrastar las tensiones y corrientes calculadas con el circuito simulado."],
    tasks:["Carga el ejemplo y localiza la resistencia, bobina y fuente.","Calcula XL, |Z| e Ief a partir de Uef = 5/√2 V.","Comprueba la tensión y la corriente de los elementos desde la interfaz de CircuitJS.","Varía la frecuencia, compara XL y observa si aumenta o disminuye el desfase.","Distingue los resultados calculados de una medida eléctrica real."],
    questions:[
      {label:"Reactancia inductiva XL a 40 Hz",unit:"Ω",value:2*Math.PI*40,tol:1.0,reason:"XL = 2πfL = 2π·40·1 ≈ 251,33 Ω."},
      {label:"Impedancia |Z|",unit:"Ω",value:Math.hypot(180,2*Math.PI*40),tol:1.5,reason:"|Z| = √(180² + 251,33²) Ω."},
      {label:"Intensidad eficaz",unit:"mA",value:1000*(5/Math.SQRT2)/Math.hypot(180,2*Math.PI*40),tol:.12,reason:"Ief = (5/√2) / |Z|; convertir de A a mA."},
      {label:"Ángulo de desfase de la corriente respecto a la tensión, valor absoluto",unit:"°",value:Math.atan2(2*Math.PI*40,180)*180/Math.PI,tol:.6,reason:"|φ| = arctan(XL/R), la corriente se retrasa respecto a la tensión."},
      {label:"Factor de potencia cos φ",unit:"adimensional",value:180/Math.hypot(180,2*Math.PI*40),tol:.02,reason:"cos φ = R/|Z| para una carga RL serie ideal."}
    ]
  },
  {
    code:"SCE02",module:"Sistemas y Circuitos Eléctricos 0520",title:"Resonancia serie y comportamiento RLC",
    file:"lrc.txt",duration:"50–60 min",
    ra:"RA1 · Parámetros de sistemas eléctricos en corriente alterna",
    ce:["1b","1c"],
    description:"RLC con L = 1 H, C = 15 µF y resistencias de 10 Ω y 100 Ω. El archivo original incluye un interruptor y permite estudiar la transición. Las preguntas se refieren al modelo serie ideal con interruptor cerrado.",
    objectives:["Encontrar la frecuencia natural de resonancia.","Diferenciar reactancias inductiva y capacitiva.","Relacionar el comportamiento transitorio con el análisis sinusoidal de régimen permanente."],
    tasks:["Abre el circuito y comprueba el estado del interruptor.","Identifica las dos resistencias, la bobina y el condensador.","Calcula la frecuencia de resonancia del conjunto L-C.","Cierra el interruptor y observa la respuesta; espera al régimen permanente antes de comparar magnitudes fasoriales.","Modifica la capacitancia y razona cómo cambia f0."],
    questions:[
      {label:"Frecuencia de resonancia f0",unit:"Hz",value:1/(2*Math.PI*Math.sqrt(1*15e-6)),tol:.55,reason:"f0 = 1/(2π√(LC)) ≈ 41,09 Hz."},
      {label:"Reactancia inductiva XL a 40 Hz",unit:"Ω",value:2*Math.PI*40,tol:1.3,reason:"XL = 2π·40·1 ≈ 251,33 Ω."},
      {label:"Módulo de la reactancia capacitiva |XC| a 40 Hz",unit:"Ω",value:1/(2*Math.PI*40*15e-6),tol:1.6,reason:"|XC| = 1/(2π·40·15·10⁻⁶) ≈ 265,26 Ω."},
      {label:"Resistencia serie total (interruptor cerrado)",unit:"Ω",value:110,tol:.5,reason:"Rtotal = 10 Ω + 100 Ω = 110 Ω."}
    ]
  },
  {
    code:"SCE03",module:"Sistemas y Circuitos Eléctricos 0520",title:"Potencia trifásica equilibrada y conductor neutro",
    file:"3phasewye.txt",duration:"45–60 min",
    ra:"RA1 · Parámetros de sistemas eléctricos en corriente alterna",
    ce:["1c","1d"],
    description:"Sistema estrella-estrella de tres fuentes a 60 Hz, 120 V RMS por fase y tres resistencias equilibradas de 1 kΩ. Incluye interruptor del neutro.",
    objectives:["Obtener magnitudes simples, compuestas y de línea.","Calcular las potencias activa, reactiva y aparente totales.","Analizar la corriente del neutro con cargas equilibradas y al desequilibrar la red."],
    tasks:["Selecciona el ejemplo y localiza las tres fuentes y cargas de 1 kΩ.","Determina Ufase, Ulínea, Ifase e Ilínea.","Comprueba el desfase de 120° entre las fuentes.","Calcula las potencias de la carga resistiva equilibrada.","Abre el interruptor de neutro con cargas equilibradas y después modifica una resistencia; compara los resultados, sin aplicar fórmulas de equilibrio al caso desequilibrado."],
    questions:[
      {label:"Tensión compuesta eficaz",unit:"V",value:120*Math.sqrt(3),tol:1.5,reason:"Ul = √3·Uf = 120√3 ≈ 207,85 V."},
      {label:"Corriente eficaz de cada fase resistiva",unit:"mA",value:120,tol:1.0,reason:"I = 120 V / 1000 Ω = 0,12 A = 120 mA."},
      {label:"Potencia activa total",unit:"W",value:3*120*120/1000,tol:.5,reason:"P = 3·Uf²/R = 3·120²/1000 = 43,2 W."},
      {label:"Potencia reactiva total (carga ideal puramente resistiva)",unit:"var",value:0,tol:.1,reason:"φ = 0° y Q = 3·Uf·I·sen φ = 0 var."},
      {label:"Corriente del neutro en régimen perfectamente equilibrado",unit:"mA",value:0,tol:.5,reason:"La suma vectorial de las tres corrientes simétricas es nula."}
    ]
  },
  {
    code:"SCE04",module:"Sistemas y Circuitos Eléctricos 0520",title:"Transformador: relación de transformación y pérdidas",
    file:"transformer.txt",duration:"40–50 min",
    ra:"RA3 · Caracterización de transformadores (fundamentos monofásicos previos al estudio trifásico)",
    ce:["3a"],
    description:"Modelo monofásico previo al estudio de transformadores trifásicos: 60 Hz, fuente de 10 V pico, relación de espiras 1:1, carga 1 kΩ y resistencia primaria de 0,1 Ω. Acoplamiento magnético k = 0,999.",
    objectives:["Distinguir valores pico y eficaces en el primario.","Relacionar la tensión secundaria ideal con la relación de espiras.","Comparar el transformador ideal con su representación acoplada en CircuitJS."],
    tasks:["Localiza ambos devanados, la carga y la resistencia del primario.","Calcula los valores ideales solicitados sin confundirlos con medidas exactas del modelo real.","Visualiza las tensiones primaria y secundaria y comprueba las pequeñas diferencias respecto al caso ideal.","Cambia la resistencia de carga y observa cómo varían las corrientes.","Explica por qué este montaje no acredita por sí solo los grupos de conexión ni los ensayos de un transformador trifásico."],
    questions:[
      {label:"Valor eficaz de la fuente de 10 V de pico",unit:"V",value:10/Math.SQRT2,tol:.1,reason:"Uef = Up/√2 = 10/√2 ≈ 7,071 V."},
      {label:"Tensión secundaria eficaz ideal con espiras 1:1",unit:"V",value:10/Math.SQRT2,tol:.1,reason:"En un transformador ideal 1:1, Us = Up (en valores eficaces)."},
      {label:"Corriente eficaz ideal en la carga de 1 kΩ",unit:"mA",value:1000*(10/Math.SQRT2)/1000,tol:.12,reason:"I = Us/R = 7,071/1000 A = 7,071 mA, en la hipótesis ideal."},
      {label:"Periodo de la señal a 60 Hz",unit:"ms",value:1000/60,tol:.15,reason:"T = 1/f = 1/60 s ≈ 16,667 ms."}
    ]
  },
  {
    code:"SCE05",module:"Sistemas y Circuitos Eléctricos 0520",title:"Amplificador operacional no inversor",
    file:"amp-noninvert.txt",duration:"40–50 min",
    ra:"RA5 · Caracterización de circuitos electrónicos analógicos",
    ce:["5d","5e","5h"],
    description:"Amplificador operacional con red de realimentación: Rf = 2 kΩ y Rg = 1 kΩ; excitación senoidal de 5 V pico a 40 Hz. Valores calculados para un operacional ideal sin saturación.",
    objectives:["Calcular la ganancia teórica no inversora.","Comprobar el efecto de la realimentación sobre la amplitud.","Identificar limitaciones del operacional frente a la ganancia ideal."],
    tasks:["Localiza el amplificador operacional y las resistencias de 1 kΩ y 2 kΩ.","Calcula la ganancia ideal y la tensión de salida pico.","Visualiza la onda de salida y comprueba si aparece limitación por alimentación o saturación.","Cambia la resistencia de realimentación y comprueba el cambio de ganancia."],
    questions:[
      {label:"Ganancia de tensión ideal Av",unit:"V/V",value:3,tol:.02,reason:"Av = 1 + Rf/Rg = 1 + 2000/1000 = 3."},
      {label:"Amplitud pico ideal de salida",unit:"V",value:15,tol:.15,reason:"Up salida = Av·Up entrada = 3·5 = 15 V. Puede haber recorte en el simulador."},
      {label:"Frecuencia ideal de salida",unit:"Hz",value:40,tol:.25,reason:"La amplificación lineal no cambia la frecuencia de la señal senoidal."}
    ]
  },
  {
    code:"SCE06",module:"Sistemas y Circuitos Eléctricos 0520",title:"Circuito lógico combinacional XOR",
    file:"xor.txt",duration:"35–45 min",
    ra:"RA6 · Caracterización de circuitos electrónicos digitales",
    ce:["6a","6b","6c","6g","6h"],
    description:"Montaje lógico XOR a partir de puertas con entradas conmutables, para trabajar funciones combinacionales, circuito y simulación.",
    objectives:["Obtener la tabla de verdad de la función XOR.","Relacionar el montaje lógico y su ecuación booleana.","Verificar las combinaciones mediante la simulación."],
    tasks:["Identifica A, B y salida Q.","Completa la tabla de verdad mediante los interruptores.","Relaciona cada combinación con la expresión Q = A̅B + AB̅.","Comprueba si la salida cambia cuando solo conmuta una de las entradas."],
    questions:[
      {label:"Q con A=0, B=0",unit:"0 o 1",value:0,tol:0,reason:"Ambas entradas iguales: XOR = 0."},
      {label:"Q con A=0, B=1",unit:"0 o 1",value:1,tol:0,reason:"Solo una entrada a 1: XOR = 1."},
      {label:"Q con A=1, B=0",unit:"0 o 1",value:1,tol:0,reason:"Solo una entrada a 1: XOR = 1."},
      {label:"Q con A=1, B=1",unit:"0 o 1",value:0,tol:0,reason:"Ambas entradas iguales: XOR = 0."}
    ]
  }
];
