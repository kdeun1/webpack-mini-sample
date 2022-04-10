import { hello, add } from './util';

const text = hello('안녕! 나는 000이야.');
const sumNum = add(1, 2);

document.getElementById('root').innerHTML = `${text} 결과 값은 ${sumNum}`;