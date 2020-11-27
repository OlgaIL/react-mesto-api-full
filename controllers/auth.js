const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SALT_ROUND, JWT_SECRET } = require('../config/index.js');

const NoValideDataError = require('../errors/novalid-data-err');
const ConflictError = require('../errors/conflict-err');
const AuthError = require('../errors/auth-err');

const createUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new NoValideDataError('Невалидные данные');
    // return res.status(400).send({ message: 'Невалидные данные' });
  }

  User.findOne({ email })
    .then((user) => {
      if (user) { throw new ConflictError('Пользователь с такой почтой уже зарегистрирован'); }
      // хешируем пароль
      bcrypt.hash(req.body.password, SALT_ROUND)
        .then((hash) => User.create({
          ...req.body,
          email: req.body.email,
          password: hash, // записываем хеш в базу
        }))
        .then(({ _id }) => res.send({ _id }))
        .catch((err) => {
          if (err.name === 'ValidationError') next(new NoValideDataError('Переданы некорректные данные в метод создания пользователя'));
          next(err);
        });
    }).catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: 3600 });
      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      // ошибка аутентификации
     // console.log(err);
      next(new AuthError('Неправильные почта или пароль'));
    });
};

module.exports = {
  createUser, login,
};
