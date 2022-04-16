// import { hello, add } from './util';
import './style.css';
import './header.css';
import List from './List';
// import logo from './images/four_squares.png';

// const text = hello('<h1>안녕! 나는 000이야.</h1>');
// const sumNum = add(1, 2);
// const img = `<img src="${logo}" alt="4칸" />`;

const users = [
    {
        id: 1,
        name: 'one'
    },
    {
        id: 2,
        name: 'two'
    },
    {
        id: 3,
        name: 'three'
    },
    {
        id: 4,
        name: 'four'
    }
];

document.getElementById('root').appendChild(
    List({ userList: users })
);