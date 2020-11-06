const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({

  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        return /^https?:\/\/([w{3}\.]?)([a-z0-9\-]+\.)+(ru)(\/[\w.]*)*.*#?$/gi.test(v);
      },
      message: 'Ошибка в пути к файлу изображения',
    },

  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('card', cardSchema);
