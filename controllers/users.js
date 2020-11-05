/* eslint-disable no-console */
const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  console.log(req.body);

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

/** const usersDataPath = path.join(__dirname, '..', 'data', 'users.json'); */

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: `Нет пользователя с таким id ${req.params.id}` });
      }
      return res.status(200).send(user);
    })
    .catch(() => res.status(500).send({ message: 'Ошибка чтения базы данных' }));
};

module.exports = { getUsers, getUser, createUser };
