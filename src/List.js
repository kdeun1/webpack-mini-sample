import User from "./User";

export default function List({ userList }) {
    const ul = document.createElement('ul');
    userList.forEach(user => {
        ul.appendChild(User({ name: user.name }));
    });
    return ul;
};
