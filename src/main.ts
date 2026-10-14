// Page scaffolding only:
import './style.css';
import { run } from './examples/triangle.ff';


// function show(mode: Mode): void {

//   const canvas = document.createElement('canvas');
//   stage.replaceChildren(canvas);
//   examples[mode].run(canvas);

  
// }

const stage = document.getElementById('stage')!;
const canvas = document.createElement('canvas');
stage.replaceChildren(canvas);
run(canvas);
