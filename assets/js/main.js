const inputTask = document.querySelector('.input-new-task');
const newTask = document.querySelector('.btn-new-task');
const tasks = document.querySelector('.tasks');
const warningText = document.querySelector('.warning');

loadTasks();
newTask.addEventListener('click', function(){
    makeTask(inputTask.value);
    inputTask.value = "";
    inputTask.focus();
})

inputTask.addEventListener('keypress', function(e){
    if (e.keyCode !== 13) return;
    makeTask(inputTask.value);
    inputTask.value = "";
    inputTask.focus();
})

function makeTask(text) {
    if (!text){
        warningText.innerText = "Você não pode criar uma tarefa vazia!";
        return;
    }
    warningText.innerHTML = '';
    const li = document.createElement('li');
    li.innerText = text + ' ';
    const button = document.createElement('button');
    button.innerText = 'Apagar';
    button.setAttribute('class', 'apagar');
    button.addEventListener('click', deleteTask);
    li.appendChild(button);
    tasks.appendChild(li);
    saveTask();
}

function deleteTask(e){
    const el = e.target;
    el.parentElement.remove();
    saveTask();
}

function saveTask(){
    const liTask = tasks.querySelectorAll('li');
    const taskLists = [];
    
    for (let task of liTask){
        let text = task.innerText;
        text = text.replace('Apagar', '').trim();
        taskLists.push(text);
    }
    const jsonTask = JSON.stringify(taskLists);
    localStorage.setItem('tasks', jsonTask);
}

function loadTasks() {
    const tasks = localStorage.getItem('tasks');
    if (!tasks) return;
    const taskList = JSON.parse(tasks);
    for (let text of taskList){
        makeTask(text);
    }
}