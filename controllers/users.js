const path = require('path');
const readFile = require('../utils/read-file.js');

const usersDataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => {
  readFile(usersDataPath)
    .then((data) => res.send(data))
    .catch(() => res.status(500).send({ message: 'Ошибка чтения файла' }));
};

const getUser = (req, res) => {
  const { id } = req.params;

  readFile(usersDataPath)
    .then((data) => {
      const findUser = data.find((user) => user._id === id);
      return findUser;
    })

    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.send(user);
    })
    .catch(() => res.status(500).send({ message: 'Ошибка чтения файла' }));
};

module.exports = { getUsers, getUser };
