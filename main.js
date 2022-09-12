import { postItem, getItem, deleteItem, getAll, eraseAll } from './api-client.js';

let currentTasks = new Map();

const addTaskToDb = async () => {
    let task = textField.value;
    currentTasks.has(task) ? alert(`${task} already exists. Please enter a new task`) : showTaskInUi(task)
    let toDo = { description: task, done: false }
    textField.value = '';
    let id = await postItem(toDo)
    currentTasks.set(task, id._id)
};

const showTaskInUi = (task) => {
    if (task != "") {
        let article, input, div, h1, button;
        const elements = ['article', 'input', 'div', 'h1', 'button'];
        elements.forEach((element, index) => {
            element = document.createElement(element)
            switch (index) {
                case 0:
                    article = element;
                    element.classList.add('item')
                    toDoList.appendChild(element);
                    break
                case 1:
                    input = element;
                    element.type = ('checkbox')
                    element.addEventListener('click', markAsDone)
                    article.appendChild(element);
                    break
                case 2:
                    div = element;
                    element.classList.add('textArea')
                    article.appendChild(element);
                    break
                case 3:
                    h1 = element;
                    element.innerHTML = task

                    div.appendChild(element);
                    break
                case 4:
                    button = element;
                    element.type = ('button')
                    element.addEventListener('click', removeTaskFromUi)
                    article.appendChild(element);
                    break
            }
        })
    }

}
const markAsDone = (e) => {
    let check = e.target.checked;
    let text = e.target.nextSibling.firstChild;
    check ? text.style = 'text-decoration:line-through' : text.style = 'text-decoration:none';

}
const removeTaskFromUi = (e) => {
    let listItem = e.target.parentNode
    let check = listItem.children[0].checked;
    check ? (listItem.style = ' transform: translateX(-950px);', setTimeout(() => { listItem.remove() }, 250)) : alert('An item must be checked as done before removal')
    let task = listItem.children[1].firstChild.innerHTML;
    removeTaskFromDb(task)
}
const removeTaskFromDb = (task) => {
    let id = currentTasks.get(task)
    deleteItem(id, task)
}

const toDoList = document.querySelector('#toDoList');
const textField = document.querySelector('#inputText');
const submitBtn = document.querySelector('#btn');
submitBtn.addEventListener('click', addTaskToDb);