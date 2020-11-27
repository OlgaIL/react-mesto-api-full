/* eslint-disable no-console */
const User = require('../models/user');
/** const usersDataPath = path.join(__dirname, '..', 'data', 'users.json'); */

const NotFoundError = require('../errors/not-found-err');
const NoValideDataError = require('../errors/novalid-data-err');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

const getUserForID = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
    //  res.status(404).send({ message: 'Пользователь не найден' });
      throw new NotFoundError('Пользователь не найден');
    } else { res.status(200).send(user); }
  } catch (err) {
    if (err.name === 'CastError') next(new NoValideDataError('Не корректный id'));
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    // console.log(req.user._id);
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    } else { res.status(200).send(user); }
  } catch (err) {
    if (err.name === 'CastError') next(new NoValideDataError('Не корректный id'));
    next(err);
  }
};

const putUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, about }, { new: true });
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') next(new NoValideDataError('Переданы некорректные данные в метод обновления пользователя'));
    next(err);
  }
};

const putAvatarUser = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { avatar }, { new: true });
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') next(new NoValideDataError('Переданы некорректные данные в метод обновления пользователя'));
    next(err);
  }
};

module.exports = {
  getUsers, getUser, getUserForID, putUser, putAvatarUser,
};
