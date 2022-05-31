import User from "./User";

export default function List({ userList }) {
    const ul = document.createElement('ul');
    const promiseObj = new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 5000);
    });
    console.log(promiseObj);
    userList.forEach(user => {
        ul.appendChild(User({ name: user.name }));
    });
    return ul;
};
