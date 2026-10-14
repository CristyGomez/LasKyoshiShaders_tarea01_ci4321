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

// Creo que ya no necesitamos este constante
export const STRIDE_BYTES = 7 * 4;//4 bytes per float (Float32)
export const COLOR_OFFSET_BYTES = 3 * 4;
