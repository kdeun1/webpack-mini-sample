import { hello, add } from './util';
import './style.css';
import './header.css';
import logo from './images/four_squares.png';

const text = hello('<h1>안녕! 나는 000이야.</h1>');
const sumNum = add(1, 2);
const img = `<img src="${logo}" alt="4칸" />`;

document.getElementById('root').innerHTML = `${img} / ${text} 결과 값은 ${sumNum}`;