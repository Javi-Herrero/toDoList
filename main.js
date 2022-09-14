import { postItem, getItem, deleteItem, getAll, eraseAll } from './api-client.js';

let currentTasks = new Map();

const addTaskToDb = async () => {
    let task = textField.value;
    let toDo = { description: task, done: false }
    textField.value = '';
    await postItem(toDo)

    getAndShowToDos()
};

const getAndShowToDos = async () => {
    currentTasks.clear()
    const toDos = await getAll();
    Array.from(toDoList.childNodes).forEach(item => {
        item.remove()
    });
    toDos.forEach(task => {
        showTaskInUi(task.description)
        currentTasks.set(task.description, task._id)

    });
}
getAndShowToDos()
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
    let task = listItem.children[1].firstChild.innerHTML;
    check ? (listItem.style = ' transform: translateX(-950px);', setTimeout(() => { removeTaskFromDb(task) }, 250)) : alert('You should have completed a task before removing it from the list!')

}
const removeTaskFromDb = async (task) => {
    let id = currentTasks.get(task)
    await deleteItem(id, task)
    getAndShowToDos()
}

const toDoList = document.querySelector('#toDoList');
const textField = document.querySelector('#inputText');
const submitBtn = document.querySelector('#btn');
submitBtn.addEventListener('click', addTaskToDb);