# Laboratorio virtual de Electrotecnia y Electrónica

Aplicación web educativa para **FP**, con osciloscopio, generador de funciones y análisis teórico de redes trifásicas equilibradas. Su objetivo es evolucionar hacia una instrumentación virtual integrada con CircuitJS.

## Estado actual — prototipo 0.1

- Generación y visualización en el navegador de ondas **senoidal, cuadrada, triangular, diente de sierra y pulsos**; frecuencia, amplitud, offset DC, fase CH2 y ciclo de trabajo configurables.
- **Red trifásica equilibrada**, secuencia ABC o ACB. Representación de tres tensiones de fase, tres tensiones compuestas o tres corrientes de fase.
- **Carga equilibrada RLC serie en estrella** en régimen sinusoidal permanente. Ajustes R, L y C (C = 0 significa condensador omitido); cálculo de U, I, |Z|, X, ángulo, P, Q, S y factor de potencia.
- Osciloscopio virtual con escala automática y visualización de dos periodos.
- Acceso a **Falstad CircuitJS**, cargado desde el sitio oficial mediante un marco web, con enlace alternativo.

## Limitaciones actuales

- **No existe todavía transferencia automática de muestras entre Falstad y el osciloscopio virtual**.
- No se capturan señales físicas ni se controla un Hantek o ESP8266.
- No se simulan desequilibrios, neutro flotante, motores, maniobras, armónicos o transitorios RLC.
- Los cálculos trifásicos corresponden a redes senoidales equilibradas en régimen permanente.
- Los valores y señales son **virtuales**: no autorizan ninguna conexión directa de 230/400 V al Hantek 6022BE.

## Ejecutar en local

La aplicación es estática: abrir el archivo index.html en un navegador o servir la carpeta con un servidor HTTP local, por ejemplo, usando Python con el comando python -m http.server 8000. El marco remoto de CircuitJS requiere Internet.

## Publicar en GitHub Pages

1. Abre el repositorio en GitHub y entra en **Settings → Pages**.
2. En **Build and deployment**, elige **Deploy from a branch**.
3. Selecciona la rama **main** y la carpeta **/(root)**; pulsa **Save**.
4. Espera a que GitHub Pages confirme la publicación. La URL prevista es https://jgraciar.github.io/-laboratorio-electrotecnia/ ; no darla por operativa sin confirmar el despliegue.

## Próximos pasos

1. Incorporar CircuitJS al mismo origen web y aprovechar su interfaz JavaScript para leer tensiones y corrientes.
2. Medidas con cursores, importación de señales, FFT y THD.
3. Prácticas para Electrotecnia 0234 y Electrónica 0233.
4. Simulación trifásica desequilibrada, corte de neutro y nuevas cargas.
5. Conexión opcional con instrumentos físicos.

## Licencias

El código original de esta web se publica bajo **GPL-3.0-only**. CircuitJS, software de Paul Falstad y colaboradores, está bajo **GPL-2.0-or-later** y se carga externamente en esta versión. OpenHantek6022 es una referencia técnica; este prototipo todavía no incorpora su código fuente.
