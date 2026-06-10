# Product Requirements Document
# CodeKids — Plataforma de aprendizaje de HTML & CSS para niños

**Versión:** 1.0  
**Fecha:** Junio 2026  
**Estado:** Draft  
**Audiencia objetivo:** Niños de 8 años en adelante  
**Idioma de la plataforma:** Español  
**Despliegue:** Vercel (tier gratuito)  

---

## 1. Visión general del producto

CodeKids es una plataforma web educativa e interactiva que enseña a niños desde los 8 años a escribir HTML y CSS desde cero. El aprendizaje ocurre a través de aventuras narrativas, proyectos creativos y un editor de código real (sin autocompletado ni asistencia de IA), con retroalimentación visual inmediata. El objetivo es que los niños desarrollen pensamiento lógico, creatividad y habilidades reales de programación web escribiendo código manualmente, de la misma forma en que aprenden a escribir a mano antes de usar procesadores de texto.

---

## 2. Objetivos del producto

- Enseñar HTML y CSS de forma progresiva, divertida y en español.
- Garantizar que el niño escriba código real sin asistencia de autocompletado ni IA.
- Proporcionar retroalimentación visual inmediata (preview en tiempo real).
- Mantener la motivación mediante un sistema de aventuras, logros y recompensas.
- Ser completamente gratuito de desplegar (Vercel + backend serverless o sin backend).
- Diseñar pensando en niños de 8+ años: interfaz amigable, lenguaje simple, personajes.
- Ser extensible para agregar JavaScript en el futuro sin reescritura mayor.

---

## 3. Usuarios objetivo

| Perfil | Descripción |
|---|---|
| **Estudiante principal** | Niños de 8 a 14 años con lectura fluida y manejo básico del teclado |
| **Supervisor (padre/docente)** | Adulto que configura la cuenta, revisa progreso y habilita funciones |
| **Estudiante avanzado** | Niños mayores de 12 años o con experiencia previa que acceden a contenido más complejo |

---

## 4. Principios de diseño pedagógico

### 4.1 Aprendizaje activo sin asistencia

El niño escribe cada línea de código manualmente. No habrá:
- Autocompletado de código.
- Sugerencias de IA.
- Botones de "copiar código".
- Bloques de arrastrar y soltar (drag & drop) para generar código.

Solo se permitirá:
- **Resaltado de sintaxis** (colores por tipo de token: etiqueta, atributo, valor, texto).
- **Indicadores de error en tiempo real** (línea marcada en rojo con mensaje explicativo en español simple).
- **Preview en tiempo real** del resultado visual del código.

### 4.2 Progresión gradual del conocimiento

El currículo está estructurado en niveles. Cada nivel introduce un concepto nuevo y lo consolida con práctica. El niño nunca enfrenta conceptos sin haber dominado los anteriores. Se siguen los principios de:

- **Andamiaje cognitivo:** la plataforma da contexto suficiente antes de pedir que el niño escriba.
- **Aprendizaje por descubrimiento guiado:** el niño experimenta el resultado de cada cambio en código inmediatamente.
- **Repetición espaciada:** conceptos pasados reaparecen en lecciones futuras dentro de proyectos.

### 4.3 Narrativa y personajes

Cada aventura/lección está narrada por personajes (ej. aliens, robots, animales) que hablan en español simple y amigable. Los personajes:

- Explican el concepto del día.
- Felicitan al niño cuando completa un reto.
- Dan pistas cuando el niño está atascado (sin resolver el problema por él).
- Tienen nombre, personalidad y historia que evolucionan a lo largo del curso.

### 4.4 Motivación continua

- **Sistema de aventuras:** cada lección es un "capítulo" de una historia más grande.
- **Insignias y trofeos** desbloqueables al completar lecciones o logros especiales.
- **Barra de progreso visual** por nivel y por curso completo.
- **Proyectos propios:** una vez que el niño aprende un concepto, puede aplicarlo en proyectos libres.
- **Retos opcionales** al final de cada lección para niños que quieren ir más lejos.

---

## 5. Arquitectura técnica (compatible con Vercel gratuito)

### 5.1 Stack recomendado

| Capa | Tecnología |
|---|---|
| **Frontend** | Next.js 14+ (App Router) — desplegado en Vercel |
| **Editor de código** | CodeMirror 6 (sin extensiones de autocompletado) |
| **Preview** | `<iframe>` con srcdoc actualizado en tiempo real |
| **Persistencia local** | localStorage / IndexedDB (sin backend obligatorio en MVP) |
| **Persistencia en nube (opcional)** | Vercel KV (Redis) o PlanetScale (MySQL) — tier gratuito |
| **Autenticación (opcional)** | NextAuth.js con provider de magic link o Google OAuth |
| **Estilos** | Tailwind CSS |
| **Animaciones** | Framer Motion o CSS animations |
| **Internacionalización** | next-intl (todo en español desde el día 1) |

### 5.2 Restricciones de Vercel gratuito

- Sin funciones serverless de larga duración (timeout 10s).
- Sin almacenamiento de archivos pesados (usar CDN externo para assets).
- Sin bases de datos incluidas (usar soluciones externas con tier gratuito: PlanetScale, Supabase, o localStorage puro).
- El MVP puede funcionar 100% en cliente (sin backend) almacenando progreso en localStorage.

---

## 6. Módulos del sistema

### 6.1 Landing page pública

- Descripción del producto en español, dirigida a padres y docentes.
- Demo interactiva embebida (sin login): el visitante puede probar la primera aventura directamente.
- Botón "Empezar gratis" visible y prominente.
- Sección de preguntas frecuentes.
- Sin requerimiento de tarjeta de crédito para el acceso gratuito.

### 6.2 Módulo de aventuras / lecciones

Cada aventura es una unidad de aprendizaje completa con la siguiente estructura:

**Paso 1 — Introducción narrativa**
- Pantalla animada con personaje que explica el concepto usando lenguaje simple.
- Máximo 3-4 frases por pantalla.
- Opción de escuchar la explicación en audio (accesibilidad).

**Paso 2 — Demostración visual**
- El personaje muestra el resultado final que el niño va a construir.
- Comparación visual: "esto es una página SIN el elemento" vs "esto es CON el elemento".

**Paso 3 — Código de referencia**
- Se muestra un ejemplo de código (solo lectura, no copiable) con el elemento o propiedad introducido.
- El código está resaltado con colores y cada parte tiene una etiqueta explicativa emergente al pasar el cursor.

**Paso 4 — El niño escribe**
- Editor de código con una tarea específica (ej. "Escribe un `<h1>` con tu nombre").
- Preview en tiempo real al lado derecho.
- Validación: el sistema verifica si el resultado cumple con la condición esperada (no si el código es idéntico, sino si el output es correcto).
- Mensajes de error en rojo con explicación amigable en español ("Parece que olvidaste cerrar la etiqueta. Busca el `</h1>`").

**Paso 5 — Celebración**
- Animación de éxito con el personaje.
- Desbloqueo de insignia o progreso en la historia.
- Botón para continuar a la siguiente aventura.

### 6.3 Módulo de proyectos libres

- Zona de sandbox donde el niño puede crear páginas web propias.
- Editor con las mismas restricciones (resaltado de sintaxis, sin autocompletado).
- Preview en tiempo real.
- Galería de proyectos del estudiante (guardados en localStorage o en nube).
- Plantillas de inicio (proyecto en blanco, mi página personal, mi mascota favorita, etc.).
- El niño puede nombrar y organizar sus proyectos.

### 6.4 Módulo de perfil del estudiante

- Nombre de usuario (sin email, sin datos personales).
- Avatar seleccionable de una galería de personajes (no fotos).
- Tablero de logros y aventuras completadas.
- Estadísticas simples: aventuras completadas, proyectos creados, racha de días.

### 6.5 Módulo de progreso (vista supervisor)

- Dashboard para padres o docentes.
- Visualización del avance por aventura.
- Tiempo total de uso.
- Proyectos creados (con preview).
- Sin acceso al código escrito por el niño en sesiones pasadas (privacidad del proceso).

---

## 7. Currículo detallado de HTML & CSS

### Nivel 1 — Fundamentos de HTML (Aventuras 1–10)

| # | Concepto | Descripción |
|---|---|---|
| 1 | ¿Qué es HTML? | Introducción: HTML como lenguaje de instrucciones para el navegador |
| 2 | Estructura básica | `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>` |
| 3 | Títulos | `<h1>` a `<h6>`, jerarquía de encabezados |
| 4 | Párrafos | `<p>`, saltos de línea `<br>` |
| 5 | Texto con estilo | `<strong>`, `<em>`, `<mark>` |
| 6 | Listas | `<ul>`, `<ol>`, `<li>` |
| 7 | Imágenes | `<img src="" alt="">`, atributo alt como buena práctica |
| 8 | Enlaces | `<a href="">`, links internos y externos |
| 9 | Divisiones | `<div>` como contenedor genérico |
| 10 | Mi primera página completa | Proyecto integrador: "Mi página personal" |

### Nivel 2 — Introducción a CSS (Aventuras 11–20)

| # | Concepto | Descripción |
|---|---|---|
| 11 | ¿Qué es CSS? | CSS como lenguaje de estilos, relación con HTML |
| 12 | Cómo conectar CSS | `<link>` en el `<head>`, archivo `style.css` |
| 13 | Selectores básicos | Selector de etiqueta, clase (`.clase`), id (`#id`) |
| 14 | Colores | `color`, `background-color`, nombres de colores y hex |
| 15 | Tipografía | `font-size`, `font-family`, `font-weight`, `text-align` |
| 16 | Espaciado | `margin`, `padding`, diferencia entre ambos |
| 17 | Bordes | `border`, `border-radius` |
| 18 | Ancho y alto | `width`, `height`, unidades `px` y `%` |
| 19 | Fondos | `background-image`, `background-size`, `background-repeat` |
| 20 | Mi primera página estilizada | Proyecto: "Mi página personal con colores" |

### Nivel 3 — HTML intermedio (Aventuras 21–30)

| # | Concepto | Descripción |
|---|---|---|
| 21 | Tablas | `<table>`, `<tr>`, `<td>`, `<th>` |
| 22 | Formularios básicos | `<form>`, `<input>`, `<button>` |
| 23 | Tipos de input | `text`, `number`, `color`, `checkbox`, `radio` |
| 24 | Etiquetas semánticas | `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>` |
| 25 | Elementos multimedia | `<video>`, `<audio>` básico |
| 26 | Caracteres especiales | `&amp;`, `&lt;`, `&gt;`, `&copy;` |
| 27 | Comentarios en HTML | `<!-- comentario -->` y para qué sirven |
| 28 | Atributos globales | `class`, `id`, `title`, `style` inline |
| 29 | Estructura de sitio multi-página | Concepto de varios archivos HTML enlazados |
| 30 | Proyecto: Mi sitio de 2 páginas | Header, nav, dos páginas enlazadas |

### Nivel 4 — CSS intermedio (Aventuras 31–40)

| # | Concepto | Descripción |
|---|---|---|
| 31 | Display | `block`, `inline`, `inline-block`, `none` |
| 32 | Flexbox básico | `display: flex`, `justify-content`, `align-items` |
| 33 | Flexbox avanzado | `flex-direction`, `flex-wrap`, `gap` |
| 34 | Pseudoclases | `:hover`, `:focus`, `:first-child` |
| 35 | Transiciones | `transition`, suavizar cambios de estado |
| 36 | Sombras | `box-shadow`, `text-shadow` |
| 37 | Posicionamiento | `position: relative`, `absolute`, `fixed` |
| 38 | Z-index | Capas y superposición de elementos |
| 39 | Variables CSS | `--mi-color`, `var()` |
| 40 | Proyecto: Página de mi hobby | Diseño libre aplicando todo lo aprendido |

### Nivel 5 — Diseño responsive y buenas prácticas (Aventuras 41–50)

| # | Concepto | Descripción |
|---|---|---|
| 41 | ¿Qué es responsive? | Concepto de diseño adaptable a pantallas |
| 42 | Media queries | `@media`, breakpoints básicos |
| 43 | Unidades relativas | `em`, `rem`, `vw`, `vh` |
| 44 | Grid CSS básico | `display: grid`, `grid-template-columns` |
| 45 | Grid avanzado | `grid-column`, `grid-row`, `gap` |
| 46 | Accesibilidad básica | `alt` en imágenes, contraste de color, orden lógico |
| 47 | Organización del código | Nombrado de clases, comentarios en CSS, indentación |
| 48 | Fuentes de Google Fonts | Importar y usar fuentes externas |
| 49 | Iconos con emoji y SVG | Usar emoji en HTML, concepto de SVG |
| 50 | Proyecto final: Mi sitio web completo | Sitio responsive de 3 páginas con todo lo aprendido |

### Módulo futuro — JavaScript (Aventuras 51+)

*(Documentado para planificación futura, no incluido en MVP)*

- Variables y tipos de datos.
- Selección de elementos del DOM.
- Eventos (click, input).
- Condicionales y bucles.
- Funciones.
- Manipulación del DOM.
- Proyectos interactivos.

---

## 8. Editor de código — Especificación técnica

### 8.1 Características activas

| Feature | Descripción |
|---|---|
| **Resaltado de sintaxis** | HTML: etiquetas en azul/naranja, atributos en verde, valores en rojo, texto en blanco. CSS: selectores, propiedades y valores con colores diferenciados. |
| **Numeración de líneas** | Visible en todo momento, ayuda a referenciar errores. |
| **Indicador de errores** | Línea marcada con fondo rojo suave. Mensaje en panel inferior en español simple. |
| **Indentación automática** | Al presionar Enter dentro de una etiqueta, se indenta automáticamente (esta es asistencia de formato, no de contenido). |
| **Matching de etiquetas** | Cuando el cursor está sobre una etiqueta de apertura, resalta su cierre correspondiente. |
| **Preview en tiempo real** | Panel derecho que renderiza el HTML+CSS del editor con actualización en cada keystroke (con debounce de 300ms). |
| **Modo pantalla dividida** | Editor a la izquierda, preview a la derecha. Ajustable en móvil a pestañas. |

### 8.2 Características desactivadas deliberadamente

| Feature desactivada | Razón pedagógica |
|---|---|
| Autocompletado de etiquetas | El niño debe memorizar y practicar la escritura. |
| Cierre automático de etiquetas | El niño aprende a cerrar etiquetas conscientemente. |
| Snippets o templates de código | Evita que el niño copie sin entender. |
| Asistencia de IA / Copilot | El aprendizaje requiere esfuerzo genuino. |
| Botón "ver solución" | Las pistas son textuales, no muestran el código. |
| Copiar/pegar desde fuera del editor | Restringido en modo lección (permitido en modo proyecto libre). |

### 8.3 Sistema de errores

Los errores deben ser comprensibles para un niño de 8 años. Ejemplos:

| Error técnico | Mensaje en la plataforma |
|---|---|
| Etiqueta sin cerrar | "¡Ups! Parece que la etiqueta `<p>` necesita su pareja de cierre `</p>`" |
| Atributo sin comillas | "El valor del atributo debe estar entre comillas. Ej: `src=\"imagen.jpg\"`" |
| Propiedad CSS inválida | "Hmm, `colour` no es una propiedad CSS. ¿Quisiste escribir `color`?" |
| Selector mal escrito | "El selector `.mi clase` tiene un espacio. Las clases van sin espacios: `.miclase`" |

---

## 9. Sistema de aventuras — Mecánica detallada

### 9.1 Estructura de pantallas por aventura
