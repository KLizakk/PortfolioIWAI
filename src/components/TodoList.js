import React, { useState, useEffect } from 'react';
import './TodoList.css';
import axios from 'axios';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [lastDelay, setLastDelay] = useState(null); // Stan przechowujący czas ostatniego opóźnienia

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const startTime = Date.now(); // Zapisujemy czas rozpoczęcia operacji
      const response = await axios.get('http://localhost:5000/tasks');
      const endTime = Date.now(); // Zapisujemy czas zakończenia operacji
      setLastDelay(endTime - startTime); // Obliczamy czas trwania operacji i aktualizujemy stan
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async () => {
    if (newTask.trim() === '') return;
    setIsLoading(true);
    try {
      const startTime = Date.now();
      const response = await axios.post('http://localhost:5000/tasks', {
        text: newTask,
        completed: false,
      });
      const endTime = Date.now();
      setLastDelay(endTime - startTime);
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTaskCompletion = async (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    // Update task on server
    setIsLoading(true); // Ustawiamy isLoading na true podczas aktualizacji zadania
    try {
      await axios.put(`http://localhost:5000/tasks/${index}`, updatedTasks[index]);
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setIsLoading(false); // Zawsze ustawiamy isLoading na false, gdy aktualizacja się zakończy
    }
  };

  const deleteTask = async (index) => {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:5000/tasks/${index}`);
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setIsLoading(false);
    }
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
        {lastDelay !== null && ( // Wyświetlamy czas opóźnienia, jeśli został zarejestrowany
          <span className="last-delay">opóźnienie: {lastDelay} ms</span>
        )}
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
