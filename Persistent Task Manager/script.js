let tasks = [];
let currentFilter = 'all';

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const showAllBtn = document.getElementById('showAllBtn');
const showActiveBtn = document.getElementById('showActiveBtn');
const showDoneBtn = document.getElementById('showDoneBtn');
const taskList = document.getElementById('taskList');
const counter = document.getElementById('counter');
const clearDoneBtn = document.getElementById('clearDoneBtn');

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  } else {
    tasks = [
      { id: Date.now(), text: 'Learn JavaScript', completed: false }
    ];
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function render() {
  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'done') return task.completed;
    return true; // 'all'
  });

  taskList.innerHTML = filteredTasks.map(task => `
    <li>
      <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">
        ${task.text}
      </span>
      <button onclick="toggleTask(${task.id})">${task.completed ? 'Undo' : 'Done'}</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    </li>
  `).join('');

  const activeCount = tasks.filter(t => !t.completed).length;
  counter.textContent = `${activeCount} active / ${tasks.length} total`;

  saveTasks();
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === '') return;

  const newTask = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = '';
  render();
}

function toggleTask(id) {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  render();
}

function clearDone() {
  tasks = tasks.filter(task => !task.completed);
  render();
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

showAllBtn.addEventListener('click', () => {
  currentFilter = 'all';
  render();
});

showActiveBtn.addEventListener('click', () => {
  currentFilter = 'active';
  render();
});

showDoneBtn.addEventListener('click', () => {
  currentFilter = 'done';
  render();
});

clearDoneBtn.addEventListener('click', clearDone);

window.toggleTask = toggleTask;
window.deleteTask = deleteTask;

loadTasks();
render();