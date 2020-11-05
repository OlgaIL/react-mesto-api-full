const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send({ message: `Произошла ошибка ${err}` });
  }
};

const createCard = async (req, res) => {
  try {
    const card = await Card.create({ ...req.body });
    res.status(200).send(card);
  } catch (err) {
    res.status(500).send({ message: `Произошла ошибка ${err}` });
  }
};

module.exports = { getCards, createCard };
