import React, { useState } from 'react';
import './TodoList.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addTask = () => {
    if (newTask.trim() === '') return;
    setIsLoading(true);
    setTimeout(() => {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
      setIsLoading(false);
    }, 500); // Symulacja opóźnienia serwera
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setIsLoading(true);
    setTimeout(() => {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
      setIsLoading(false);
    }, 500); // Symulacja opóźnienia serwera
  };

  return (
    <div id="todo-list">
      <h2>Prosta lista zadań</h2>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Dodaj nowe zadanie"
        />
        <button onClick={addTask} disabled={isLoading}>
          Dodaj
          {isLoading && <span className="loader"></span>}
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleTaskCompletion(index)}>
              {task.text}
            </span>
            <button onClick={() => deleteTask(index)}>
              Usuń
              {isLoading && <span className="loader"></span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
