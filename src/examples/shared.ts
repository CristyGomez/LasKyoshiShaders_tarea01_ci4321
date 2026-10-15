// Data shared by both implementations, so the two files differ only in how they drive WebGL.

/** Background color #1b1e2b as linear floats in [0, 1]. */
export const CLEAR_COLOR: readonly [number, number, number, number] = [0x1b / 255, 0x1e / 255, 0x2b / 255, 1];

/** Canvas size in device pixels. Fixed so both versions render the same pixels. */
export const CANVAS_SIZE = 480;

/** Interleaved vertex data: x, y, z  per vertex. Clip space, counter-clockwise. */
export const TRIANGLE = new Float32Array([
  //  x      y     z   (Quitamos los colores)
   0.0,   0.7,  0.0,  
  -0.7,  -0.6,  0.0, 
   0.7,  -0.6,  0.0,  
]);

// Datos para el Cuadrado

// La posiciones nos dicen donde dibujar los vertices
export const SQUARE_POSITIONS = new Float32Array([
  // x    y     z
  -0.7, -0.7, 0.0, // p0 abajo-izquierda
   0.7, -0.7, 0.0, // p1 abajo-derecha
   0.7,  0.7, 0.0, // p2 arriba-derecha
  -0.7,  0.7, 0.0, // p3 arriba-izquierda
]);

// Los indices nos dicen que vertices unimos/usamos para formar los triangulos 
export const SQUARE_INDICES = new Uint16Array([
  0, 1, 2, // Triangulo 1 (con vertices p0, p1, p2)
  0, 2, 3, // Triangulo 2 (con vertices p0, p2, p3)
]);

// Funcion auxiliar para crear las posiciones que vamos a usar en el Hexagono y el Circulo
export function makeCircle(segments: number, radius: number): Float32Array {

  // Necesitamos 3 puntos como minimo para formar un triangulo, y no podemos tener mas de 64 segmentos
  if (segments < 3 || segments > 64) {
    throw new RangeError(`segments must be in [3, 64], got ${segments}`);
  }

  const positions: number[] = [];

  // Necesitas agregar el centro? Depende del metodo
  // Recorre los segmentos calculando el angulo de cada punto del borde
  // angulo ?????? x = radius * Math.cos(ángulo), y = radius * Math.sin(ángulo), z = 0 
  // Necesitamnos repetir algún punto? para cerrar

  return new Float32Array(positions);
}


// Vamos a definir una interface para poder dibujar cada figura
export interface Shape {
  name: string;
  vao: WebGLVertexArrayObject;
  draw: () => void;
}

// Y una interface para los colores
export interface Color {
  name: string;
  rgb: [number, number, number];
}

export const COLORS: Color[] = [
  { name: 'red',   rgb: [1, 0, 0] },
  { name: 'green', rgb: [0, 1, 0] },
  { name: 'blue',  rgb: [0, 0, 1] },
];

export const STRIDE_BYTES = 0
