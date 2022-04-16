import photo from './images/four_squares.png';
// import photo2 from './images/vue_logo.png';
import styles from './User.css';

export default function User({ name }) {
    const li = document.createElement('li');
    li.classList.add('user');
    li.addEventListener('click', () => {
        console.log(name);
    })
    li.innerHTML = `
        <img src="${photo}" alt="${name}" />
        ${name}
    `;
    return li;
};
