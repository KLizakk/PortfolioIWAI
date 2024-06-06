const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

// Konfiguracja middleware
app.use(cors());
app.use(express.json());

// Ścieżka do pliku JSON przechowującego zadania
const tasksFilePath = './tasks.json';

// Pobieranie listy zadań
app.get('/tasks', (req, res) => {
  fs.readFile(tasksFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const tasks = JSON.parse(data);
    res.json(tasks);
  });
});

// Dodawanie nowego zadania
app.post('/tasks', (req, res) => {
  const { text, completed } = req.body;
  fs.readFile(tasksFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const tasks = JSON.parse(data);
    const newTask = { id: Date.now(), text, completed };
    tasks.push(newTask);
    setTimeout(() => { // Dodaj opóźnienie 1.5 sekundy
      fs.writeFile(tasksFilePath, JSON.stringify(tasks), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        res.json(newTask);
      });
    }, 1500); // Czas w milisekundach (1500ms = 1.5 sekundy)
  });
});

// Aktualizacja zadania
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { text, completed } = req.body;
  fs.readFile(tasksFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const tasks = JSON.parse(data);
    const updatedTasks = tasks.map((task) => {
      if (task.id.toString() === taskId) {
        return { ...task, text, completed };
      }
      return task;
    });
    fs.writeFile(tasksFilePath, JSON.stringify(updatedTasks), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json({ message: 'Task updated successfully' });
    });
  });
});

// Usuwanie zadania
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  fs.readFile(tasksFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const tasks = JSON.parse(data);
    const updatedTasks = tasks.filter((task) => task.id.toString() !== taskId);
    setTimeout(() => { // Dodaj opóźnienie 0.5 sekundy
      fs.writeFile(tasksFilePath, JSON.stringify(updatedTasks), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        res.json({ message: 'Task deleted successfully' });
      });
    }, 500); // Czas w milisekundach (500ms = 0.5 sekundy)
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
