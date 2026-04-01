const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const emptyMsg = document.getElementById('emptyMsg');
const totalSpan = document.getElementById('total');
const activeSpan = document.getElementById('active');
const completedSpan = document.getElementById('completed');
const clearCompletedButton = document.getElementById('clearCompleted');

let tasks = [];

addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if(taskText === '') return;

    const task = {text: taskText, completed: false};
    tasks.push(task);

    taskInput.value = '';
    renderTasks();
}

function renderTasks(filter = "all") {
    taskList.innerHTML ='';

    let filteredTasks = tasks;

    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
}

filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
    <span class="${task.completed ? 'complete': ''}">${task.text}</span>
    <button onclick="toggleTask(${index})">Toggle</button>
    `;
    taskList.appendChild(li);
});

updateStats();
emptyMsg.style.display = tasks.length === 0 ? 'block' : 'none';
}

function updateStats() {
    totalSpan.textContent = tasks.length;
    activeSpan.textContent = tasks.filter(task => !task.completed).length;
    completedSpan.textContent = tasks.filter(task => task.completed).length;
}
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function filterTasks(type) {
    renderTasks(type);
}

clearCompletedButton.addEventListener('click', () => {
    tasks = tasks.filter(t => !t.completed);
    renderTasks();
});