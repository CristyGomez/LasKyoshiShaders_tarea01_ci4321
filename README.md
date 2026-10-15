# Tarea 1: Figuras en WebGL2 (CI4321)

**Equipo:** Las Kyoshi Shaders

**Integrantes:**

- Cristina Gómez
- Sandibel Soares

Programa en WebGL2 y TypeScript que muestra una figura a la vez (triángulo, cuadrado, hexágono y círculo), construidas solo con triángulos. Un botón cambia la figura y otro cambia el color (rojo, verde, azul). El color se mantiene al cambiar de figura.

## Requisitos

- Node.js 18 o superior
- npm
- Un navegador con soporte para WebGL2 (Chrome, Edge o Firefox)

## Run

1. Instalar las dependencias (solo la primera vez):

   ```
   npm install
   ```

2. Iniciar el servidor de desarrollo:

   ```
   npm run dev
   ```

3. Abrir `http://localhost:5173` en el navegador.

## Uso

- Click en **Shape:** cambia la figura en el orden triángulo > cuadrado > hexágono > círculo > triángulo.
- Click en **Color:** cambia el color en el orden rojo > verde > azul > rojo.
- La página arranca con el triángulo en rojo.

## Otros comandos

| Comando           | Acción                                              |
| ----------------- | --------------------------------------------------- |
| `npm run build`   | Revisa los tipos con `tsc` y genera `dist/`         |
| `npm run preview` | Sirve localmente la carpeta `dist/` ya construida   |

## Estructura del proyecto

```
index.html                    estructura de la página y botones
src/main.ts                   crea el canvas y arranca el programa
src/style.css                 estilos de la página
src/examples/shared.ts        datos de las figuras, colores y makeCircle
src/examples/triangle.ff.ts   buffers, VAOs, dibujo y manejo de botones
src/vendor/ff/                FixedFunction v1.0 del curso (no se modificó)
```

## Problemas comunes

- **Página en blanco o "WebGL2 is not available."** Activar la aceleración por hardware en el navegador o probar con otro navegador.
- **El puerto 5173 está en uso.** Cerrar el otro proceso o correr `npx vite --port 3000`.
