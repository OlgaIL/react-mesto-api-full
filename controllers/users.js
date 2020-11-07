/* eslint-disable no-console */

const User = require('../models/user');

const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные в метод создания пользователя' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

/** const usersDataPath = path.join(__dirname, '..', 'data', 'users.json'); */

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send({ message: 'Пользователь не найден' });
    } else { res.status(200).send(user); }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Не коррректный id' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

module.exports = { getUsers, getUser, createUser };
