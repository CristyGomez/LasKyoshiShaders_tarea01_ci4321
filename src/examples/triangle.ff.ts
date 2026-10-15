// RGB triangle, FixedFunction (FF) version.
// FF hides the shaders. Compare with triangle.vanilla.ts, which shows them.
import { ATTRIB, createFixedFunction, LIGHTING } from '../vendor/ff/ff';
import { CANVAS_SIZE, CLEAR_COLOR, TRIANGLE, SQUARE_POSITIONS, SQUARE_INDICES, COLORS, STRIDE_BYTES, Shape, makeCircle, SEGMENTS } from './shared';



// Step 1. Get the WebGL2 context.
function getContext(canvas: HTMLCanvasElement): WebGL2RenderingContext {
  const gl = canvas.getContext('webgl2');
  if (!gl) throw new Error('WebGL2 is not available.');
  return gl;
}

// Step 2. Shaders and program: FF creates and owns them.
// Step 3. Vertex specification: copy the vertex data to the GPU.
function createVertexBuffer(gl: WebGL2RenderingContext, data: Float32Array): WebGLBuffer {
  const buffer = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return buffer;
}

// FUNCION AUXILIAR: Vamos a usar la siguiente funcion para el buffer de los indices (por ejemplo para el cuadrado)
function createIndexBuffer(gl: WebGL2RenderingContext, data: Uint16Array): WebGLBuffer {
  const buffer = gl.createBuffer()!;
  // Usamos ELEMENT_ARRAY_BUFFER y no ARRAY_BUFFER porque vamos a usar indices (O sea nos referimos a los vertices por su indice y no por su posicion en el arreglo)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return buffer;
}

// Step 4. Describe how the vertex data is laid out, using FF's attribute slots.
// Modificamos la funcion para que ahora le pasemos el buffer de los indices (Es opcional porque no todos los objetos van a usar indices)
function createVAO(gl: WebGL2RenderingContext, 
                   buffer: WebGLBuffer, 
                   indexBuffer?: WebGLBuffer): WebGLVertexArrayObject {
  const vao = gl.createVertexArray()!;
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(ATTRIB.POSITION);
  // Pasamos STRIDE_BYTES a 0, de esta forma decimos que los datos vienen pegados
  gl.vertexAttribPointer(ATTRIB.POSITION, 2, gl.FLOAT, false, STRIDE_BYTES, 0);
  // Eliminamos el atributo de color

  // En el caso de tener indices los enlazamos
  if (indexBuffer) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  } 

  gl.bindVertexArray(null);
  return vao;
}

// Step 5. Pipeline state: canvas size, viewport, clear color.
function setupState(gl: WebGL2RenderingContext, canvas: HTMLCanvasElement): void {
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(...CLEAR_COLOR);
}

// Step 6. Draw. ff.drawArrays binds the FF program and uploads its uniforms first.
// Modificamos la funcion y ahora le pasamos la interfaz (En donde esta el vao y la funcion que usa para dibujar!!!)
// tambien agregamos el color como param
function draw(gl: WebGL2RenderingContext, 
              ff: ReturnType<typeof createFixedFunction>, 
              shape: Shape,
              color: [number, number, number]): void {

  gl.clear(gl.COLOR_BUFFER_BIT);
  // Como ya no tenemos el atributo de los colores, usamos setColor
  ff.setColor(color);
  gl.bindVertexArray(shape.vao);
  shape.draw(); // AHora cada figura sabe como dibujarse a si misma, ya sea con drawArrays o drawElements
}


export function run(canvas: HTMLCanvasElement): void {
  const gl = getContext(canvas);
  const ff = createFixedFunction(gl, { debug: true });
  ff.disable(LIGHTING); // unlit: the output is the per-vertex color
  // Buscamos los botones en el HTML usando su id
  const shapeBtn = document.getElementById('shape-btn')!;
  const colorBtn = document.getElementById('color-btn')!;

  // COmenzamos en el primer shape y color (Triangulo y rojo)
  let shapeIndex = 0; 
  let colorIndex = 0; 

  // Aqui estaran nuestros VAOs, que son los que nos van a permitir dibujar los objetos (Triangulo, Cuadrado, etc)

  // Triangulo
  const triangleBuffer = createVertexBuffer(gl, TRIANGLE);
  const triangleVao = createVAO(gl, triangleBuffer);

  // Cuadrado
  const squareBuffer = createVertexBuffer(gl, SQUARE_POSITIONS);
  const squareIndexBuffer = createIndexBuffer(gl, SQUARE_INDICES); 
  const squareVao = createVAO(gl, squareBuffer, squareIndexBuffer);

  // Hexagono
  const hexPositions = makeCircle(6, 0.6);
  const hexVao = createVAO(gl, createVertexBuffer(gl, hexPositions));

  // Circulo
  const circlePositions = makeCircle(SEGMENTS, 0.6);
  const circleVao = createVAO(gl, createVertexBuffer(gl, circlePositions)); 

  //arreglo de figuras, cada una con su nombre, su VAO y la funcion que usa para dibujarse a si misma
  const shapes: Shape[] = [  
    {name: 'Triangle', vao: triangleVao, draw: () => ff.drawArrays(gl.TRIANGLES, 0, 3) },
    {name: 'Square',   vao: squareVao,   draw: () => ff.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0) },
    { name: 'hexagon', vao: hexVao,    draw: () => ff.drawArrays(gl.TRIANGLE_FAN, 0, hexPositions.length / 2) },
    { name: 'circle',  vao: circleVao, draw: () => ff.drawArrays(gl.TRIANGLE_FAN, 0, circlePositions.length / 2) },
  ];

  // Lo que sigue aca es basicamente para manejar los botones y dibujar la figura y color seleccionados
  
  setupState(gl, canvas); //pone el canvas a 480×480 píxeles reales, para que no se vea borroso

  function render(): void {
    const shape = shapes[shapeIndex];
    const color = COLORS[colorIndex];

    // Mandamos a dibujar la figura con el color seleccionado
    draw(gl, ff, shape, color.rgb);

    // Actualizamos el texto de los botones para mostrar la figura y color seleccionados
    shapeBtn.textContent = `Shape: ${shape.name}`;
    colorBtn.textContent = `Color: ${color.name}`;
  }

  // Usamos addEventListener para que cuando se haga click en los botones, se cambie la figura o el color y se vuelva a dibujar

  shapeBtn.addEventListener('click', () => {
    shapeIndex = (shapeIndex + 1) % shapes.length;
    render();
  });

  colorBtn.addEventListener('click', () => {
    colorIndex = (colorIndex + 1) % COLORS.length;
    render();
  });

  render(); 
}
