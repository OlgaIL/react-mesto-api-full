const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getUsers, getUser, getUserForID, putUser, putAvatarUser,
} = require('../controllers/users.js');

router.get('/', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().length(179),
  }).unknown(true),
}), getUsers);

router.get('/me', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().length(179),
  }).unknown(true),
}), getUser);

router.patch('/me', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().length(179),
  }).unknown(true),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), putUser);

router.patch('/me/avatar', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().length(179),
  }).unknown(true),

  [Segments.BODY]: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required(),

  }),
}), putAvatarUser);

router.get('/:id', celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().alphanum().length(24),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().length(179),
  }).unknown(true),
}),
getUserForID);

module.exports = router;
