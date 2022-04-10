import { hello, add } from './util';
import './style.css';
import './header.css';

const text = hello('<h1>안녕! 나는 000이야.</h1>');
const sumNum = add(1, 2);

document.getElementById('root').innerHTML = `${text} 결과 값은 ${sumNum}`;