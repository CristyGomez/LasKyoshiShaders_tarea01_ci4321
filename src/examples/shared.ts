// Datos de las figuras, colores y constantes del programa

/** Background color #1b1e2b as linear floats in [0, 1]. */
export const CLEAR_COLOR: readonly [number, number, number, number] = [0x1b / 255, 0x1e / 255, 0x2b / 255, 1];

/** Tamaño del canvas en píxeles (ancho y alto). */
export const CANVAS_SIZE = 480;

/** Interleaved vertex data: x, y per vertex. Clip space, counter-clockwise. */
export const TRIANGLE = new Float32Array([
  //  x      y  (Quitamos los colores)
   0.0,   0.7,  
  -0.7,  -0.6, 
   0.7,  -0.6,  
]);

// Datos para el Cuadrado

// La posiciones nos dicen donde dibujar los vertices
export const SQUARE_POSITIONS = new Float32Array([
  // x    y  
  -0.7, -0.7, // p0 abajo-izquierda
   0.7, -0.7, // p1 abajo-derecha
   0.7,  0.7, // p2 arriba-derecha
  -0.7,  0.7, // p3 arriba-izquierda
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
  // Necesitamos un arreglo para guardar las posiciones de los vertices
  const positions: number[] = [];

  //agregamos el centro del circulo
  //en TRIANGLE_FAN el primer vertice es el punto en comun
  positions.push(0, 0);
    //paso del angulo para cada segmento, es decir, cuanto tenemos que movernos en el angulo para dibujar el siguiente vertice
    const step = (2 * Math.PI) / segments;

    //creamos los vertices del circulo, usando cos y sin para calcular las posiciones en x y y
    for (let i = 0; i <= segments; i++) {
      const angle = i * step; //calcula el angulo para el vertice actual
      //multiplicar por el radius para escalar el circulo al tamaño deseado
      const x = radius * Math.cos(angle); //que  tan a la der o izq esta el punto
      const y = radius * Math.sin(angle); //que tan arriba o abajo esta el punto
      //agregamos el vertice al arreglo de posiciones        
      positions.push(x, y);
    }
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

// 0 = los vértices vienen pegados, sin huecos
export const STRIDE_BYTES = 0;

