import photo from './images/four_squares.png';
import photo2 from './images/vue_logo.jpg';
import photo3 from './images/icon-check.gif';
import styles from './user.css';

export default function User({ name }) {
    const li = document.createElement('li');
    li.classList.add('user');
    li.addEventListener('click', () => {
        console.log(name);
        li.innerHTML = `<div class=\"user--logo\"></div>`
    })
    li.innerHTML = `
        <img src="${photo}" alt="${name}" />
        ${name}
        <img src="${photo2}" alt="${name}" />
        <img src="${photo3}" alt="${name}" />
        dfsfsd
    `;
    return li;
};
