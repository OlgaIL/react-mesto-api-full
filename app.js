const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const userRout = require('./routes/users.js');
const cardsRout = require('./routes/cards.js');
const errorRout = require('./routes/error.js');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo mongodb://localhost:27017/mestodb
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRout);
app.use('/cards', cardsRout);
app.all('*', errorRout);

app.listen(PORT, () => {
  /** Если всё работает, консоль покажет, какой порт приложение слушает */
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
