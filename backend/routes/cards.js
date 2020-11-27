/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const {
  getCards, createCard, deleteCard,
} = require('../controllers/cards.js');

router.get('/', getCards);

router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(20),
    link: Joi.string().required(),
  }),
}),
createCard);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}),
deleteCard);

// router.put('/likes/:id', putLike);

module.exports = router;
