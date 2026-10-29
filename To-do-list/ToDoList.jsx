import React, { useState, useEffect } from 'react';
import './style.css'; // Make sure your style.css file is in the same folder

export default function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('myTasks');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { text: 'Study JavaScript', completed: true },
      { text: 'read book', completed: false }
    ];
  });

  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === '') return;
    setTasks([...tasks, { text: input.trim(), completed: false }]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask();
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="container">
      <h1>To Do List</h1>

      <div className="input-area">
        <input
          type="text"
          id="taskInput"
          placeholder="What do you need to do?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button id="addBtn" onClick={addTask}>
          Add
        </button>
      </div>

      <div className="counter" id="counter">
        {completedCount} / {tasks.length} completed
      </div>

      <ul id="taskList">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <div className="task-left">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(index)}
              />
              <span className="task-text">{task.text}</span>
            </div>
            <button
              className="delete-btn"
              onClick={() => deleteTask(index)}
            >
              &#10005;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}