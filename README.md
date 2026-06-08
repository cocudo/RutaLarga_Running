# RutaLarga Running - AI Gear Finder & Advisor
### 🚀 Proyecto Antigravity: Solución de IA para la Optimización de Ventas y Asesoramiento Técnico

Este repositorio contiene la **Prueba de Concepto (POC)** y el **Informe Ejecutivo** del proyecto desarrollado bajo el marco de **Antigravity** para la pyme **RutaLarga Running**. El objetivo es reducir la fricción en la decisión de compra técnica de calzado deportivo y automatizar la atención preventa utilizando Inteligencia Artificial.

---

## 📋 Contexto del Proyecto
En el e-commerce de calzado y textil para running, el **82% de los usuarios experimenta dudas biomecánicas** críticas antes de pagar (tipo de pisada, relación peso/amortiguación, drop adecuado para evitar lesiones, equivalencia de tallas). 

Al contar con soporte manual limitado, el tiempo de respuesta promedio oscila entre 18 y 36 horas, lo que genera un **68% de abandono de carritos**. Mantener este proceso manual le cuesta a la pyme un estimado de **7,870 €/mes (94,440 €/año)**.

**Antigravity** propone la integración de un asistente virtual inteligente conversacional de cara al cliente que soluciona estas dudas de forma instantánea (< 1 min) y aumenta la tasa de conversión en un 20%.

---

## 🛠️ Arquitectura Técnica y Stack
La solución propuesta consta de:
*   **Canales**: Widget de Chat Web y WhatsApp Business API mediante **ManyChat**.
*   **Procesamiento Cognitivo**: API de **OpenAI (GPT-4o mini)** con prompts contextualizados de lógica biomecánica.
*   **Base de Datos y CRM**: Sincronización de perfiles de corredor en **Klaviyo** para automatización de email marketing y recuperación de carritos.
*   **Generador del Informe**: Script en Python utilizando `python-docx` para compilar el PRD y el informe ejecutivo del proyecto.

---

## 💻 Características de la Web POC (Prueba de Concepto)
La web desarrollada en este repositorio simula la experiencia en tiempo real de la solución de IA:
1.  **Test del Corredor (Chat interactivo)**: Un chatbot guía al usuario a través de un cuestionario dinámico (Terreno, Peso corporal, Objetivos y Tipo de Pisada).
2.  **Motor de Recomendación en Tiempo Real**: El catálogo de productos a la derecha se filtra y resalta dinámicamente con una tarjeta iluminada y la etiqueta **"Sugerido por IA"** para los modelos compatibles.
3.  **Lead Magnet & Captura CRM**: Al completar el test, se solicita el correo electrónico del usuario para enviarlo a Klaviyo, desbloqueando un **Plan de Entrenamiento personalizado (PDF)** y un **Cupón del 15% de descuento** (`RUTALARGA15`).
4.  **Consulta Preventa Libre**: Tras el test, el chat libre se activa con respuestas pre-entrenadas para simular el comportamiento de la IA respondiendo dudas sobre lesiones, tallajes y placas de carbono.

---

## 📁 Estructura del Repositorio
*   `index.html`: Estructura responsiva de la Web POC.
*   `style.css`: Estilo visual de alta energía (tema oscuro, verde neón y azul eléctrico, glassmorphism y micro-animaciones).
*   `app.js`: Lógica conversacional, base de datos del catálogo y motor de filtrado biomecánico.
*   `img/`: Carpeta que almacena las imágenes del catálogo generadas mediante IA (`nimbus.png`, `vaporfly.png`, `speedgoat.png`).
*   `.gitignore`: Excluye los archivos de control de Word de la sincronización de Git.
*   `Pardal_Coca_Ivan_PRD.docx`: Documento formal de Requisitos del Producto subido al repositorio.

---

## 🚀 Cómo Visualizar la Web POC
No requiere compilación ni dependencias complejas. Solo clona el repositorio y abre el archivo en tu navegador:
1.  Clona el repositorio:
    ```bash
    git clone https://github.com/cocudo/RutaLarga_Running.git
    ```
2.  Abre el archivo `index.html` directamente en tu navegador (doble clic) o sírvelo localmente con:
    ```bash
    python -m http.server 8000
    ```
    E ingresa a `http://localhost:8000` en tu navegador.
