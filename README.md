# Laboratorio virtual de Electrotecnia y Electrónica

Aplicación web docente para FP. Combina un generador de funciones, un osciloscopio virtual, cálculo de redes trifásicas equilibradas y el simulador CircuitJS.

**Web publicada desde el repositorio:** https://jgraciar.github.io/-laboratorio-electrotecnia/

**Versión 0.6 (desarrollo)**. Las funciones ya añadidas a la rama main pueden tardar unos minutos en aparecer en la web.

## Funciones implementadas

- Generador de señales senoidales, cuadradas, triangulares, diente de sierra y pulsos, con frecuencia, amplitud, offset, desfase y ciclo de trabajo ajustables.
- Visualización de CH1 y CH2; cursores verticales desplazables para medir Δt, 1/Δt y diferencia de nivel en el primer canal.
- Exportación CSV de las muestras representadas con tiempo en segundos.
- Espectro de los 15 primeros armónicos y THD aproximada respecto a la fundamental de la ventana, para las ondas virtuales periódicas.
- Simulador matemático de red trifásica senoidal equilibrada en estrella, secuencia ABC/ACB, tensiones simples y compuestas y corrientes por fase.
- Carga RLC serie, equilibrada y en régimen sinusoidal permanente; cálculo de impedancia, desfase, U, I, P, Q, S y factor de potencia.
- Pestaña CircuitJS y un puente JavaScript para consultar la tensión y la corriente de un elemento de dos terminales **cuando CircuitJS está alojado en el mismo origen**.

## Banco inicial de prácticas guiadas

La pestaña **Prácticas guiadas** incluye seis propuestas iniciales basadas en archivos de circuito existentes y comprobados del catálogo oficial de CircuitJS:

| Código | Módulo | Práctica | Circuito CircuitJS |
|---|---|---|---|
| E01 | Electrotecnia 0234 | Ley de Ohm, resistencias en paralelo | ohms.txt |
| E02 | Electrotecnia 0234 | Divisor resistivo de tensión | voltdivide.txt |
| E03 | Electrotecnia 0234 | Circuito RC serie en CA | capac.txt |
| E04 | Electrotecnia 0234 | Sistema trifásico equilibrado en estrella | 3phasewye.txt |
| N01 | Electrónica 0233 | Rectificador de onda completa | fullrect.txt |
| N02 | Electrónica 0233 | Puerta XOR y tabla de verdad | xor.txt |

Cada práctica incorpora: objetivos, enunciado, procedimientos, preguntas numéricas, autocorrección con margen de tolerancia, explicación matemática accesible bajo demanda y exportación de un informe TXT sin enviar datos del alumno a ningún servidor.

La autocorrección se refiere a **los valores iniciales del circuito**. Si el alumno modifica componentes o generadores, debe restaurar el circuito original antes de usarla. Es una herramienta de autoevaluación, no una evaluación oficial del módulo. Los RA/CE se incorporarán una vez contrastados con la programación docente.

El botón **Cargar montaje en CircuitJS** utiliza el parámetro documentado startCircuit y la copia de CircuitJS alojada en el mismo dominio; se reinicia la simulación y la adquisición virtual. No precisa hardware físico.

## Módulo de Grado Superior: Sistemas y Circuitos Eléctricos (0520)

La versión 0.4 incorpora un selector de módulo en **Prácticas guiadas** que separa:

- **Electrotecnia 0234**, Grado Medio.
- **Electrónica 0233**, Grado Medio.
- **Sistemas y Circuitos Eléctricos 0520**, Grado Superior de Sistemas Electrotécnicos y Automatizados (SEA).

Se incluyen seis prácticas nuevas de SCE; los RA y los CE asociados provienen del Real Decreto 1127/2010, anexo I, módulo 0520: https://www.boe.es/buscar/doc.php?id=BOE-A-2010-15355.

| Código | Práctica SCE | Circuito oficial CircuitJS | Vinculación orientativa |
|---|---|---|---|
| SCE01 | Carga RL en CA, impedancia y factor de potencia | inductac.txt | RA1: CE 1a, 1b, 1c |
| SCE02 | Resonancia RLC serie | lrc.txt | RA1: CE 1b, 1c |
| SCE03 | Estrella trifásica, potencia y neutro | 3phasewye.txt | RA1: CE 1c, 1d |
| SCE04 | Transformador monofásico como base para estudiar transformadores trifásicos | transformer.txt | RA3: CE 3a (introducción parcial) |
| SCE05 | Amplificador no inversor | amp-noninvert.txt | RA5: CE 5d, 5e, 5h |
| SCE06 | Circuito combinacional XOR | xor.txt | RA6: CE 6a, 6b, 6c, 6g, 6h |

Todas estas actividades incluyen objetivos, procedimiento, teoría de apoyo, preguntas numéricas con autocorrección y generación de un informe TXT. La autocorrección de respuestas numéricas emplea el **montaje original**, y su resultado no supone por sí solo la evaluación completa de un criterio de evaluación.

**Limitación didáctica específica:** la práctica SCE04 utiliza un transformador monofásico para introducir el comportamiento de los transformadores. No equivale a un ensayo trifásico, no comprueba el grupo vectorial y por tanto no acredita íntegramente el RA3. En SCE02 se diferencia el régimen transitorio del cálculo fasorial de resonancia. La simulación no acredita, por sí misma, las operaciones de medida sobre equipos reales que requieren normativa de seguridad.

## Consulta visible de resultados de aprendizaje (RA) y criterios de evaluación (CE)

**Versión 0.5:** abre **Prácticas guiadas**, selecciona un módulo y después una práctica. Justo debajo del enunciado aparece el apartado **«Resultados de aprendizaje y criterios de evaluación vinculados»**, con el número y la redacción del RA, una lista de CE identificados individualmente (por ejemplo, **CE 1b**, **CE 1c**), una descripción legible de cada criterio y el enlace directo al real decreto en el BOE. Las fichas de los **tres módulos** incluyen esa información.

La correspondencia es **parcial**: no se presupone que una simulación certifique la totalidad de un CE ni los ensayos/medidas reales requeridos en el taller. El informe TXT incorpora también el RA, los CE y su normativa de referencia. Las descripciones de los CE están adaptadas para lectura didáctica; el texto jurídico íntegro se consulta en el BOE.

## Seis módulos con denominación oficial y nivel

La lista de **Prácticas guiadas** presenta todos los módulos con su nombre oficial, código y nivel, agrupados por ciclo. El nombre abreviado usado internamente no se muestra al alumno:

| Nivel | Módulo | Código | Prácticas |
|---|---|---|---:|
| GM · Instalaciones Eléctricas y Automáticas | Electrónica | 0233 | 2 |
| GM · Instalaciones Eléctricas y Automáticas | Electrotecnia | 0234 | 4 |
| GM · Instalaciones Eléctricas y Automáticas | Instalaciones de distribución | 0236 | 4 |
| GM · Instalaciones Eléctricas y Automáticas | Instalaciones solares fotovoltaicas | 0239 | 4 |
| GS · Sistemas Electrotécnicos y Automatizados | Sistemas y circuitos eléctricos | 0520 | 6 |
| GS · Sistemas Electrotécnicos y Automatizados | Desarrollo de redes eléctricas y centros de transformación | 0522 | 4 |
| | **Total** | | **24** |

El nombre oficial del módulo 0522 empieza con «Desarrollo de». Denominaciones confirmadas según **RD 177/2008** (módulos 0233, 0234, 0236 y 0239) y **RD 1127/2010** (módulos 0520 y 0522).

### Nuevas prácticas de los módulos 0236, 0239 y 0522

**GM · Instalaciones de distribución (0236):**

- ID01. Centro de transformación: magnitudes nominales (RA1)
- ID02. Red monofásica de baja tensión: caída de tensión (RA2)
- ID03. Instalación de enlace: intensidad y caída simplificada (RA3)
- ID04. Red radial de BT: caída de tensión por tramos (RA2)

**GM · Instalaciones solares fotovoltaicas (0239):**

- FV01. Módulos fotovoltaicos en serie y paralelo (RA2)
- FV02. Estimación energética y horas solares pico (RA2)
- FV03. Dimensionado energético teórico de batería (RA2)
- FV04. Condiciones eléctricas de entrada de un regulador MPPT (RA2)

**GS · Desarrollo de redes eléctricas y centros de transformación (0522):**

- DR01. Parámetros y caída de tensión trifásica en red BT (RA2)
- DR02. Magnitudes nominales de un CT trifásico (RA5)
- DR03. Comparación de secciones en red trifásica (RA3)
- DR04. Ensayos de transformador: balance simplificado de pérdidas (RA6)

Las 12 prácticas nuevas son ejercicios **de cálculo y análisis sobre supuestos teóricos** con autocorrección e informe descargable. No se atribuye falsamente una simulación fotovoltaica, una red física o un centro de transformación real al simulador CircuitJS. Por ello, cuando se abre una de estas fichas, se ocultan los controles de CircuitJS y el osciloscopio, que permanecerán disponibles para las prácticas anteriores con montaje simulable.

Todas las fichas muestran el RA y los CE relacionados, con descripción didáctica de cada criterio, advertencia de alcance parcial y enlace a la normativa oficial. Los cálculos eléctricos utilizados son simplificaciones explícitas; **no sustituyen las comprobaciones reglamentarias ni las medidas o ensayos sobre instalaciones reales**.

## Integración con CircuitJS

CircuitJS es software de Paul Falstad y colaboradores bajo licencia GPL-2.0-or-later.

El código original se encuentra en https://github.com/pfalstad/circuitjs1 y se obtiene durante la compilación de la página mediante GitHub Actions. La revisión compilada se fija en el workflow de despliegue.

La integración necesita una publicación construida por el workflow de GitHub Actions, que copia CircuitJS en el directorio /circuitjs del mismo dominio. La aplicación detecta automáticamente si existe esa copia:

- **CircuitJS local**: se activa la selección de componentes y la lectura de tensión y corriente mediante la interfaz JavaScript oficial.
- **Sin CircuitJS local**: se carga la versión externa de Falstad como simulador independiente, sin comunicación con el osciloscopio.

### Publicación integrada por GitHub Actions

1. En el repositorio, abrir **Settings → Pages**.
2. En **Build and deployment → Source**, elegir **GitHub Actions** (en lugar de Deploy from a branch).
3. En **Actions**, consultar el workflow **Publicar laboratorio con CircuitJS integrado**. En caso necesario, seleccionar **Run workflow**, rama **main**.
4. Esperar a que terminen con éxito los trabajos de compilación y despliegue antes de dar por operativa la integración.

Mientras Pages esté configurado en **Deploy from a branch**, la web puede funcionar con generador y trifásica, pero no tendrá la copia compilada de CircuitJS y utilizará el simulador externo.

## Limitaciones

- Simulación exclusivamente: no hay comunicación USB con el Hantek 6022BE ni control del ESP8266.
- La conexión con CircuitJS presenta actualmente una única magnitud seleccionable por componente (tensión o corriente). La frecuencia de muestreo y la duración de las ventanas dependen de la simulación.
- La estimación espectral para CircuitJS no ofrece una THD normativa validada: la THD solo se presenta para señales virtuales periódicas con ventana conocida, como cálculo aproximado de los primeros 15 armónicos.
- No se simulan todavía neutro flotante, desequilibrios, corte de fase, cargas motor, ni transitorios RLC reales.
- Los valores de tensión 230/400 V se refieren únicamente a un modelo matemático. **Nunca conectar directamente la red de 230/400 V al Hantek 6022BE.**

## Ejecución local

Puedes servir la raíz del repositorio con un servidor HTTP estático (por ejemplo, el comando Python: python -m http.server 8000) y abrir http://localhost:8000/. En este caso CircuitJS funcionará como aplicación externa hasta que se compile y aloje una copia local.

## Fuentes y licencias

- Código original del laboratorio: **GPL-3.0-only**, archivo LICENSE.
- CircuitJS (Falstad y colaboradores): **GPL-2.0-or-later**, código https://github.com/pfalstad/circuitjs1.
- OpenHantek6022 es una referencia de diseño de instrumentación, pero su código **no se ha copiado** en este prototipo.

## Próximos hitos

Validar en navegador los seis nuevos montajes SCE y sus cálculos guiados; completar prácticas sobre máquinas rotativas, transformadores trifásicos y medida real de parámetros; vincular evidencias de evaluación con los RA/CE y la programación docente; incorporar sistemas trifásicos desequilibrados y fallos de neutro.
