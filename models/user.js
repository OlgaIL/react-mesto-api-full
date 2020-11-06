/* eslint-disable max-len */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  avatar: {
    type: String,
    required: true,

    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        return /^https?:\/\/([w{3}\.]?)([a-z0-9\-]+\.)+(ru)(\/[\w.]*)*.*#?$/gi.test(v);
      },
      message: 'Ошибка в пути к файлу',
    },
  },

});

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
