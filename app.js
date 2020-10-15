const express = require('express');
const path = require('path');

const userRout = require('./routes/users.js');
const cardsRout = require('./routes/cards.js');
const errorRout = require('./routes/error.js');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', userRout);
app.use('/cards', cardsRout);
app.all('*', errorRout);

app.listen(PORT, () => {
  /** Если всё работает, консоль покажет, какой порт приложение слушает */
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
