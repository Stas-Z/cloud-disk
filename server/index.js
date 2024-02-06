const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const authRouter = require('./src/routes/auth.routes');
const app = express();
const PORT = config.get('serverPort');

app.use(express.json());
app.use('/api/auth', authRouter);

const start = async () => {
  try {
    // Подключаемся к базе данных
    mongoose.connect(config.get('dbUrl'));

    app.listen(PORT, () => {
      console.log('Server started on port ', PORT);
    });
  } catch (e) {}
};

start();
