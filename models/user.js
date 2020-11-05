const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },

  avatar: {
    type: String,
    required: true,
  },

});

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
