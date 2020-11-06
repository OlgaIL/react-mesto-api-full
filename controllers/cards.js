const Card = require('../models/card');
const User = require('../models/user');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).populate('owner');
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  }
};

const createCard = async (req, res) => {
  try {
    const ownerObj = await User.findById(req.user._id);
    const card = await Card.create({ owner: ownerObj, ...req.body });
    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные в метод создания карточки' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.id);
    if (!card) {
      res.status(404).send({ message: 'Карточка с введенным id не найдена' });
    } else { res.status(200).send('Карточка удалена'); }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(404).send({ message: 'Нет карточки с введенным id' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

module.exports = { getCards, createCard, deleteCard };
