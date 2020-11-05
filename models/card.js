const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({

  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    required: false,
    default: [],
  },

  _id: {
    type: String,
    required: true,
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
    maxlength: 20,

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
