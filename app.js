const express = require('express');
// const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const userRout = require('./routes/users.js');
const cardsRout = require('./routes/cards.js');
const errorRout = require('./routes/error.js');
const authRouter = require('./routes/auth.js');



const auth = require('./middlewares/auth.js');
const errHendle = require('./middlewares/error.js');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo mongodb://localhost:27017/mestodb
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

/** можно попробовать без bodyParser установки */
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
/** для подключения фронта */
// app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger); // подключаем логгер запросов


// роуты, не требующие авторизации,
// например, регистрация и логин
app.use('/', authRouter);

// авторизация
app.use(auth);

app.use('/users', userRout);
app.use('/cards', cardsRout);
app.all('*', errorRout);

app.use(errorLogger); // подключаем логгер ошибок


app.use(errors()); // обработчик ошибок celebrate
app.use(errHendle);

app.listen(PORT, () => {
  /** Если всё работает, консоль покажет, какой порт приложение слушает */
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
