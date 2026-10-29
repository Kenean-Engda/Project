document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addBtn = document.getElementById('addBtn');
  const taskList = document.getElementById('taskList');
  const counter = document.getElementById('counter');

  let tasks = JSON.parse(localStorage.getItem('myTasks')) || [
    { text: 'Study JavaScript', completed: true },
    { text: 'read book', completed: false }
  ];

  function saveAndRender() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    renderTasks();
  }

  function renderTasks() {
    taskList.innerHTML = '';
    
    let completedCount = 0;

    tasks.forEach((task, index) => {
      if (task.completed) completedCount++;

      const li = document.createElement('li');
      if (task.completed) li.classList.add('completed');

      li.innerHTML = `
        <div class="task-left">
          <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
          <span class="task-text">${task.text}</span>
        </div>
        <button class="delete-btn" data-index="${index}">&#10005;</button>
      `;

      taskList.appendChild(li);
    });

    counter.textContent = `${completedCount} / ${tasks.length} completed`;
  }

  function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;

    tasks.push({ text: text, completed: false });
    taskInput.value = '';
    saveAndRender();
  }

  addBtn.addEventListener('click', addTask);

  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  taskList.addEventListener('click', (e) => {
    const index = e.target.dataset.index;

    if (e.target.tagName === 'INPUT') {
      tasks[index].completed = e.target.checked;
      saveAndRender();
    } else if (e.target.classList.contains('delete-btn')) {
      tasks.splice(index, 1);
      saveAndRender();
    }
  });

  renderTasks();
});