// Page scaffolding only:
import './style.css';
import { run } from './examples/triangle.ff';


const stage = document.getElementById('stage')!;
const canvas = document.createElement('canvas');
stage.replaceChildren(canvas);
run(canvas);
