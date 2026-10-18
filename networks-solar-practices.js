"use strict";
// Actividades originales de cálculo para módulos 0236, 0239 y 0522.
// No equivalen a dimensionado reglamentario de una instalación real.
// Cada práctica dispone de un modelo equivalente CircuitJS que NO sustituye
// la instalación real ni modifica las hipótesis del cálculo autocorregido.
window.LabNetworksSolarPractices=[
  {
    code:"ID01",module:"Instalaciones de distribución 0236",
    title:"Centro de transformación: magnitudes nominales",
    duration:"35–45 min",file:"lab-id01.txt",
    modelNote:"Modelo equivalente por fase de transformador 50:1. La representación no incluye celdas, red completa, protecciones ni ensayos reales.",
    description:"Supuesto didáctico: CT trifásico de 250 kVA, 20 kV/400 V. Despreciamos pérdidas para determinar relación de transformación e intensidades nominales. No se simulan celdas ni maniobras de media tensión.",
    objectives:["Situar el CT entre la red de media tensión y la distribución en baja tensión.","Relacionar las características de un transformador y su cuadro de BT.","Calcular magnitudes nominales trifásicas."],
    tasks:["Dibuja un esquema unifilar de red MT → CT → cuadro BT → red de distribución.","Identifica la función de las celdas MT, transformador y cuadro BT.","Calcula la relación de tensiones y las corrientes nominales.","Indica por qué este cálculo no sustituye la elección de aparellaje ni el proyecto del CT."],
    questions:[
      {label:"Relación de tensiones 20 000 V / 400 V",unit:"V/V",value:50,tol:0.01,reason:"a = Uprim / Usec = 20 000 / 400 = 50."},
      {label:"Intensidad nominal primaria",unit:"A",value:250000/(Math.sqrt(3)*20000),tol:0.08,reason:"I1 = 250 000/(√3·20 000) ≈ 7,217 A."},
      {label:"Intensidad nominal secundaria",unit:"A",value:250000/(Math.sqrt(3)*400),tol:2,reason:"I2 = 250 000/(√3·400) ≈ 360,84 A."}
    ]
  },
  {
    code:"ID02",module:"Instalaciones de distribución 0236",
    title:"Red monofásica de BT: caída de tensión",
    duration:"35–45 min",file:"lab-id02.txt",
    modelNote:"Fuente de 230 V, carga equivalente y resistencias de ida y retorno que representan los conductores. La caída puede medirse en Falstad.",
    description:"Ejemplo de cálculo resistivo: Uorigen = 230 V, I = 20 A, longitud de ida 50 m, sección S = 16 mm² y resistividad adoptada ρ = 0,0225 Ω·mm²/m. Se desprecia la reactancia; NO es un dimensionado reglamentario.",
    objectives:["Relacionar longitud y sección con resistencia de línea.","Calcular la caída de tensión monofásica en ida y retorno.","Interpretar la tensión al final del conductor."],
    tasks:["Dibuja fuente, conductor de ida, receptor y conductor de retorno.","Calcula la resistencia del circuito completo usando 2L.","Calcula caída de tensión, su porcentaje y tensión final.","Comprueba por qué faltan criterios térmicos, protección y demás exigencias del REBT para seleccionar un cable real."],
    questions:[
      {label:"Resistencia total del conductor de ida y retorno",unit:"Ω",value:2*50*.0225/16,tol:.003,reason:"Rlínea = 2ρL/S = 2·0,0225·50/16 = 0,140625 Ω."},
      {label:"Caída de tensión a 20 A",unit:"V",value:20*2*50*.0225/16,tol:.05,reason:"ΔU = I·Rlínea = 20·0,140625 = 2,8125 V."},
      {label:"Porcentaje de caída respecto a 230 V",unit:"%",value:100*20*2*50*.0225/16/230,tol:.04,reason:"ΔU% = 100·ΔU/230 ≈ 1,223 %."},
      {label:"Tensión al final de la línea",unit:"V",value:230-20*2*50*.0225/16,tol:.1,reason:"Ufinal = 230 − 2,8125 = 227,1875 V."}
    ]
  },
  {
    code:"ID03",module:"Instalaciones de distribución 0236",
    title:"Instalación de enlace: intensidad y caída simplificada",
    duration:"40–50 min",file:"lab-id03.txt",
    modelNote:"Equivalente monofásico por fase de una red trifásica equilibrada. Fuente, resistencia de línea y carga RL; no modela una LGA real completa.",
    description:"Hipótesis de estudio para un tramo de una línea general de alimentación: trifásica 400 V, P = 20 kW, cos φ = 0,9, L = 35 m, S = 25 mm², ρ = 0,0225 Ω·mm²/m. Se desprecia reactancia y solo se calcula el tramo mostrado.",
    objectives:["Reconocer CGP, LGA, centralización de contadores y derivaciones individuales.","Calcular intensidad trifásica a partir de la potencia activa.","Evaluar caída de tensión resistiva simplificada sin equipararla al proyecto reglamentario."],
    tasks:["Dibuja un esquema funcional CGP–LGA–contadores–DI.","Obtén I mediante P/(√3·U·cos φ).","Calcula ΔU = √3·I·ρ·L·cos φ/S y su porcentaje.","Enumera las verificaciones reglamentarias no incluidas: previsión de cargas, condiciones de instalación, límites y protecciones."],
    questions:[
      {label:"Intensidad de línea a 20 kW y cos φ = 0,9",unit:"A",value:20000/(Math.sqrt(3)*400*.9),tol:.5,reason:"I = P/(√3·U·cos φ) ≈ 32,08 A."},
      {label:"Caída de tensión resistiva aproximada",unit:"V",value:Math.sqrt(3)*(20000/(Math.sqrt(3)*400*.9))*.0225*35*.9/25,tol:.06,reason:"ΔU ≈ √3·I·ρ·L·cos φ/S = 1,575 V. Se desprecia reactancia."},
      {label:"Porcentaje de caída respecto a 400 V",unit:"%",value:100*(Math.sqrt(3)*(20000/(Math.sqrt(3)*400*.9))*.0225*35*.9/25)/400,tol:.025,reason:"ΔU% = 100·1,575/400 = 0,39375 %."}
    ]
  },
  {
    code:"ID04",module:"Instalaciones de distribución 0236",
    title:"Red radial de BT: caída de tensión por tramos",
    duration:"40–50 min",file:"lab-id04.txt",
    modelNote:"Circuito radial de 230 V con cargas equivalentes de 12 A y 8 A, y resistencias por tramo que incluyen ida y retorno.",
    description:"Red monofásica simplificada de 230 V con dos tramos: A, 40 m por 20 A; B, 30 m por 8 A. En ambos se adopta S = 10 mm² y ρ = 0,0225 Ω·mm²/m. Las corrientes de cada tramo están ya determinadas.",
    objectives:["Interpretar que cada tramo de una red radial soporta corrientes distintas.","Calcular caída acumulada hasta el punto más alejado.","Comparar el comportamiento de cargas distribuidas."],
    tasks:["Representa fuente–tramo A–nudo–tramo B–receptor lejano.","Calcula cada caída usando ida y retorno.","Suma las caídas y calcula la tensión en el extremo.","Explica por qué no debe tratarse toda la red como si circularan 20 A por ambos tramos."],
    questions:[
      {label:"Caída de tensión del tramo A",unit:"V",value:2*.0225*40*20/10,tol:.04,reason:"ΔUA = 2ρ·LA·IA/S = 3,6 V."},
      {label:"Caída de tensión del tramo B",unit:"V",value:2*.0225*30*8/10,tol:.04,reason:"ΔUB = 2ρ·LB·IB/S = 1,08 V."},
      {label:"Caída total hasta el extremo",unit:"V",value:4.68,tol:.06,reason:"ΔUtotal = 3,6 + 1,08 = 4,68 V."},
      {label:"Tensión al final de la red",unit:"V",value:225.32,tol:.1,reason:"Ufinal = 230 − 4,68 = 225,32 V."}
    ]
  },
  {
    code:"DR01",module:"Desarrollo de redes eléctricas y centros de transformación 0522",
    title:"Proyecto de red BT: intensidad y caída en trifásica",
    duration:"45–60 min",file:"lab-dr01.txt",
    modelNote:"Equivalente monofásico por fase de la red trifásica; resistencia de línea y carga RL para observar la influencia del conductor.",
    description:"Modelo preliminar de red trifásica: 400 V, P = 60 kW, cos φ = 0,9, longitud 150 m, cobre con ρ = 0,0225 Ω·mm²/m y sección provisional 95 mm². Se considera únicamente resistencia de los conductores.",
    objectives:["Determinar intensidades de servicio a partir de la previsión de potencia.","Calcular caída de tensión resistiva trifásica.","Distinguir este cálculo preliminar del diseño reglamentario completo de la red."],
    tasks:["Define el esquema trifásico y anota las hipótesis.","Obtén I a partir de P, Ul y cos φ.","Calcula caída de tensión y su porcentaje en el extremo.","Enumera criterios adicionales: calentamiento, cortocircuitos, protecciones, reactancia, trazado, distancias y normativa vigente."],
    questions:[
      {label:"Intensidad de línea",unit:"A",value:60000/(Math.sqrt(3)*400*.9),tol:1,reason:"I = 60 000/(√3·400·0,9) ≈ 96,23 A."},
      {label:"Caída trifásica resistiva aproximada",unit:"V",value:Math.sqrt(3)*(60000/(Math.sqrt(3)*400*.9))*.0225*150*.9/95,tol:.12,reason:"ΔU = √3·I·ρ·L·cos φ/S ≈ 5,329 V."},
      {label:"Porcentaje de caída",unit:"%",value:100*(Math.sqrt(3)*(60000/(Math.sqrt(3)*400*.9))*.0225*150*.9/95)/400,tol:.04,reason:"ΔU% ≈ 1,332 %."}
    ]
  },
  {
    code:"DR02",module:"Desarrollo de redes eléctricas y centros de transformación 0522",
    title:"Centro de transformación: dimensionado eléctrico inicial",
    duration:"45–60 min",file:"lab-dr02.txt",
    modelNote:"Modelo simplificado por fase de transformador 20 kV/400 V. Sin celdas MT, protecciones ni puesta a tierra de un CT real.",
    description:"CT trifásico hipotético de 630 kVA, 20 kV/400 V. Determinar corrientes nominales para el estudio inicial del proyecto. Las corrientes calculadas no especifican ni validan por sí solas celdas, cables o protecciones.",
    objectives:["Calcular magnitudes de un transformador trifásico de distribución.","Relacionar potencia nominal con corrientes en MT y BT.","Identificar el papel de transformador, celdas y cuadro de distribución."],
    tasks:["Representa el esquema unifilar de llegada MT, CT y salidas BT.","Obtén corrientes nominales por I = S/(√3 U).","Calcula la relación de tensiones.","Indica qué estudios adicionales requiere un proyecto de CT: cortocircuito, puesta a tierra, protecciones y condiciones constructivas."],
    questions:[
      {label:"Intensidad primaria a 20 kV",unit:"A",value:630000/(Math.sqrt(3)*20000),tol:.2,reason:"I1 = 630 000/(√3·20 000) ≈ 18,19 A."},
      {label:"Intensidad secundaria a 400 V",unit:"A",value:630000/(Math.sqrt(3)*400),tol:3,reason:"I2 = 630 000/(√3·400) ≈ 909,33 A."},
      {label:"Relación nominal de tensiones",unit:"V/V",value:50,tol:.01,reason:"a = 20 000/400 = 50."}
    ]
  },
  {
    code:"DR03",module:"Desarrollo de redes eléctricas y centros de transformación 0522",
    title:"Comparación de secciones en una red trifásica",
    duration:"40–55 min",file:"lab-dr03.txt",
    modelNote:"Dos circuitos independientes equivalentes por fase, con secciones 50 y 95 mm² representadas como resistencias diferentes.",
    description:"Red trifásica resistiva de 400 V, I = 120 A, L = 100 m, cos φ = 1, ρ = 0,0225 Ω·mm²/m. Compara exclusivamente caída de tensión con S1 = 50 mm² y S2 = 95 mm².",
    objectives:["Analizar cómo influye la sección en las pérdidas resistivas de línea.","Justificar elecciones a partir de criterios eléctricos preliminares.","Reconocer otros condicionantes del diseño real."],
    tasks:["Calcula las caídas en ambos casos mediante ΔU = √3·I·ρ·L/S.","Determina los porcentajes.","Compara valores sin concluir automáticamente que una sección cumple el REBT.","Explica por qué también importan intensidad admisible, agrupamiento, temperatura, cortocircuito y protección."],
    questions:[
      {label:"ΔU con sección 50 mm²",unit:"V",value:Math.sqrt(3)*120*.0225*100/50,tol:.15,reason:"ΔU50 = √3·120·0,0225·100/50 ≈ 9,353 V."},
      {label:"ΔU con sección 95 mm²",unit:"V",value:Math.sqrt(3)*120*.0225*100/95,tol:.12,reason:"ΔU95 ≈ 4,923 V."},
      {label:"Reducción porcentual de caída al pasar de 50 a 95 mm²",unit:"%",value:100*(1-50/95),tol:.5,reason:"Reducción = [1 − (ΔU95/ΔU50)]·100 = [1−50/95]·100 ≈ 47,37 %."}
    ]
  },
  {
    code:"DR04",module:"Desarrollo de redes eléctricas y centros de transformación 0522",
    title:"Ensayos de transformador: balance simplificado de pérdidas",
    duration:"45–60 min",file:"lab-dr04.txt",
    modelNote:"Modelo DC de balance de potencia: una resistencia en paralelo representa pérdidas en vacío y otra en serie pérdidas de carga nominales. No es un ensayo real.",
    description:"Datos hipotéticos de ensayos de un transformador de 400 kVA: pérdidas de vacío P0 = 820 W y pérdidas de carga a intensidad nominal Pcc = 4500 W. Estima rendimiento a plena carga y cos φ = 0,8. Modelo simplificado con pérdidas adicionales despreciadas.",
    objectives:["Identificar el significado físico de los ensayos de vacío y cortocircuito.","Distinguir pérdidas en hierro y pérdidas de carga nominales.","Estimar el rendimiento en un punto de funcionamiento."],
    tasks:["Explica qué magnitud caracteriza el ensayo de vacío y cuál el de cortocircuito.","Calcula potencia activa de salida a 400 kVA y cos φ=0,8.","Suma las dos pérdidas adoptadas y calcula el rendimiento.","Indica por qué para realizar ensayos reales hacen falta equipos, procedimiento y seguridad específicos."],
    questions:[
      {label:"Potencia activa de salida a plena carga",unit:"kW",value:320,tol:.5,reason:"Psalida = S·cos φ = 400·0,8 = 320 kW."},
      {label:"Pérdidas totales nominales consideradas",unit:"W",value:5320,tol:15,reason:"Ppérdidas = 820 + 4500 = 5320 W."},
      {label:"Rendimiento aproximado a plena carga",unit:"%",value:100*320000/(320000+820+4500),tol:.2,reason:"η = 320 000/(320 000 + 5320)·100 ≈ 98,364 %."}
    ]
  },
  {
    code:"FV01",module:"Instalaciones solares fotovoltaicas 0239",
    title:"Generador fotovoltaico: módulos en serie y paralelo",
    duration:"35–45 min",file:"lab-fv01.txt",
    modelNote:"Dos strings con tres fuentes ideales de 40 V en serie por string, resistencias internas pequeñas y una carga. No representa curvas I-V ni variaciones por irradiancia.",
    description:"Generador ideal con 6 módulos iguales: Vmp = 40 V, Imp = 10 A, Voc = 49 V e Isc = 10,5 A por módulo. Conexión 3S2P (3 paneles en serie por rama y 2 ramas en paralelo), valores en condiciones de referencia STC.",
    objectives:["Identificar Voc, Isc, Vmp e Imp.","Calcular magnitudes eléctricas de asociaciones serie-paralelo.","Relacionar configuración de strings con límites de tensión e intensidad de equipos."],
    tasks:["Dibuja dos ramas en paralelo, cada una con tres módulos en serie.","Calcula Vmp, Imp, Pmp y Voc del campo.","Explica por qué las temperaturas extremas pueden modificar Voc y por qué hace falta comprobarlo en un diseño real."],
    questions:[
      {label:"Tensión de máxima potencia del string",unit:"V",value:120,tol:.5,reason:"Vmp string = 3·40 = 120 V."},
      {label:"Corriente de máxima potencia del campo",unit:"A",value:20,tol:.2,reason:"Imp campo = 2·10 = 20 A."},
      {label:"Potencia máxima total en STC",unit:"W",value:2400,tol:10,reason:"Pmp = 120 V·20 A = 2400 Wp."},
      {label:"Tensión en circuito abierto de cada string en STC",unit:"V",value:147,tol:1,reason:"Voc string = 3·49 = 147 V en STC, no su máximo a baja temperatura."}
    ]
  },
  {
    code:"FV02",module:"Instalaciones solares fotovoltaicas 0239",
    title:"Estimación energética de una instalación FV",
    duration:"35–45 min",file:"lab-fv02.txt",
    modelNote:"Fuente DC ideal y resistencia que representan un punto eléctrico de 2700 W. Las horas solares pico y el PR se calculan fuera de Falstad.",
    description:"Sistema de 6 módulos de 450 Wp, 4,5 horas solares pico (HSP) al día y factor global de rendimiento PR = 0,80. Consumo diario hipotético de 8 kWh. Modelo energético simplificado, no estudio de sombras, temperatura ni recurso solar horario.",
    objectives:["Calcular potencia pico instalada.","Estimar producción diaria con horas solares pico y PR.","Comparar generación y demanda de energía."],
    tasks:["Calcula la potencia pico total en kWp.","Estima Ediaria = Ppico·HSP·PR.","Compara con los 8 kWh/día de consumo.","Indica por qué la producción real varía según fecha, orientación, sombras, climatología y tecnología."],
    questions:[
      {label:"Potencia pico instalada",unit:"kWp",value:2.7,tol:.01,reason:"Ppico = 6·450 Wp = 2700 Wp = 2,7 kWp."},
      {label:"Energía estimada al día",unit:"kWh",value:2.7*4.5*.8,tol:.12,reason:"Ediaria = 2,7·4,5·0,8 = 9,72 kWh/día."},
      {label:"Saldo diario estimado frente a la demanda",unit:"kWh",value:2.7*4.5*.8-8,tol:.13,reason:"Saldo = 9,72−8 = 1,72 kWh/día; no representa necesariamente energía autoconsumida."}
    ]
  },
  {
    code:"FV03",module:"Instalaciones solares fotovoltaicas 0239",
    title:"Dimensionado energético teórico de batería",
    duration:"40–55 min",file:"lab-fv03.txt",
    modelNote:"Fuente de 48 V y resistencia de carga que representan una descarga eléctrica instantánea. No se simulan autonomía, estado de carga o degradación.",
    description:"Instalación aislada hipotética: carga de 5 kWh/día, 2 días de autonomía, batería a 48 V, profundidad útil de descarga DoD=80 % y rendimiento del inversor η=90 %. Se omiten temperatura, envejecimiento, curvas de descarga y eficiencia real de batería.",
    objectives:["Estimar la energía nominal de acumulación necesaria.","Relacionar tensión nominal con capacidad en Ah.","Justificar coeficientes de descarga y rendimiento."],
    tasks:["Calcula energía demandada durante los dos días.","Obtén capacidad energética nominal dividiendo por DoD·η.","Convierte el resultado a Ah nominales a 48 V.","Explica qué características reales consultarías en la ficha de la batería antes de elegirla."],
    questions:[
      {label:"Energía de consumo para dos días",unit:"kWh",value:10,tol:.1,reason:"E = 5 kWh/día × 2 días = 10 kWh."},
      {label:"Capacidad energética nominal teórica",unit:"kWh",value:10/(.8*.9),tol:.2,reason:"Enom = 10/(0,8×0,9) ≈ 13,889 kWh."},
      {label:"Capacidad nominal aproximada de batería a 48 V",unit:"Ah",value:10000/(.8*.9*48),tol:4,reason:"C ≈ 13 888,9 Wh / 48 V ≈ 289,35 Ah."}
    ]
  },
  {
    code:"FV04",module:"Instalaciones solares fotovoltaicas 0239",
    title:"Condiciones eléctricas de entrada de un regulador MPPT",
    duration:"40–50 min",file:"lab-fv04.txt",
    modelNote:"Dos strings 2S2P con fuentes de 41 V por módulo y carga equivalente. No se simula el regulador MPPT ni su respuesta real.",
    description:"Cuatro módulos de 410 Wp cada uno, con Vmp = 41 V, Voc = 49 V e Isc = 11 A en STC. Se organizan 2S2P sobre una batería nominal de 48 V. El cálculo de corriente de salida es un límite ideal: no constituye una selección válida de regulador.",
    objectives:["Calcular potencia, Voc e Isc de strings y paralelos.","Estimar corriente de salida ideal al bus DC.","Reconocer la influencia de temperatura y márgenes del fabricante."],
    tasks:["Representa dos strings en paralelo de dos paneles en serie.","Calcula Voc string STC, Isc total y potencia instalada.","Determina corriente ideal de salida si la potencia íntegra llega al bus de 48 V.","Anota comprobaciones pendientes: Voc a temperatura mínima, ventana MPPT, carga de batería, eficiencia, protecciones y normativa."],
    questions:[
      {label:"Tensión en circuito abierto del string en STC",unit:"V",value:98,tol:.5,reason:"Voc,STC string = 2·49 V = 98 V. A baja temperatura puede ser superior."},
      {label:"Corriente de cortocircuito conjunta en STC",unit:"A",value:22,tol:.3,reason:"Isc campo = 2 strings·11 A = 22 A."},
      {label:"Potencia pico instalada",unit:"Wp",value:1640,tol:8,reason:"Ppico = 4·410 = 1640 Wp."},
      {label:"Corriente ideal de salida si se entregan 1640 W a 48 V",unit:"A",value:1640/48,tol:.5,reason:"Iideal = P/U = 1640/48 ≈ 34,17 A. No es la intensidad de diseño del MPPT."}
    ]
  }
];