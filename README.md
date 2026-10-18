# Laboratorio virtual de Electrotecnia y Electrónica

Aplicación web docente para FP. Combina un generador de funciones, un osciloscopio virtual, cálculo de redes trifásicas equilibradas y el simulador CircuitJS.

**Web publicada desde el repositorio:** https://jgraciar.github.io/-laboratorio-electrotecnia/

**Versión 0.2 (desarrollo)**. Las funciones ya añadidas a la rama main pueden tardar unos minutos en aparecer en la web.

## Funciones implementadas

- Generador de señales senoidales, cuadradas, triangulares, diente de sierra y pulsos, con frecuencia, amplitud, offset, desfase y ciclo de trabajo ajustables.
- Visualización de CH1 y CH2; cursores verticales desplazables para medir Δt, 1/Δt y diferencia de nivel en el primer canal.
- Exportación CSV de las muestras representadas con tiempo en segundos.
- Espectro de los 15 primeros armónicos y THD aproximada respecto a la fundamental de la ventana, para las ondas virtuales periódicas.
- Simulador matemático de red trifásica senoidal equilibrada en estrella, secuencia ABC/ACB, tensiones simples y compuestas y corrientes por fase.
- Carga RLC serie, equilibrada y en régimen sinusoidal permanente; cálculo de impedancia, desfase, U, I, P, Q, S y factor de potencia.
- Pestaña CircuitJS y un puente JavaScript para consultar la tensión y la corriente de un elemento de dos terminales **cuando CircuitJS está alojado en el mismo origen**.

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

Comprobar la integración web real de CircuitJS; mejorar la sincronización y las mediciones de potencia y espectro de señales simuladas; ampliar la biblioteca de prácticas de Electrotecnia 0234 y Electrónica 0233; incorporar sistemas trifásicos desequilibrados y fallos de neutro.
