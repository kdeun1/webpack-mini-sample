import photo from './images/four_squares.png';
import photo2 from './images/vue_logo.jpg';
import photo3 from './images/icon-check.gif';
import styles from './user.css';

export default function User({ name }) {
    const li = document.createElement('li');
    const liMap = new Map();
    liMap.set('photo1', photo);
    liMap.set('photo2', photo2);
    liMap.set('photo3', photo3);
    li.classList.add('user');
    li.addEventListener('click', () => {
        console.log(name);
        li.innerHTML = `<div class=\"user--logo\"></div>`
    })
    li.innerHTML = `
        <img src="${liMap.get('photo1')}" alt="${name}" />
        ${name}
        <img src="${liMap.get('photo2')}" alt="${name}" />
        <img src="${liMap.get('photo3')}" alt="${name}" />
        dfsfsd
    `;
    return li;
};
