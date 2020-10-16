const path = require('path');
const readFile = require('../utils/read-file.js');

const cardsDataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  readFile(cardsDataPath)
    .then((data) => res.send(data))
    .catch(() => res.send({ message: 'Ошибка чтения файла' }));
};

module.exports = getCards;
