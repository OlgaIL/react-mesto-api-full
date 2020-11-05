/* eslint-disable no-console */

const User = require('../models/user');

const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: `Произошла ошибка ${err}` });
  }
};

/** const usersDataPath = path.join(__dirname, '..', 'data', 'users.json'); */

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: `Произошла ошибка ${err}` });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send({ message: `Нет пользователя с таким id ${req.params.id}` });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: `Ошибка чтения базы данных ${err}` });
  }
};

module.exports = { getUsers, getUser, createUser };
