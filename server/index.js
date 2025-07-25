const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./task');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const task = new Task({ text: req.body.text });
  await task.save();
  res.json(task);
});

app.delete('/api/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
