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
}), putUser);

router.patch('/me/avatar', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().length(179),
  }).unknown(true),

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
