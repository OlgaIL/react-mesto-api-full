/* eslint-disable max-len */
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs'); // импортируем bcrypt
const validator = require('validator');

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Ошибка в email адресе',
      isAsync: false,
    },
    /** validate: {
      validator(v) {  return /^([a-z0-9\-\.])+@([a-z0-9\-]+\.)+([a-z]{2,6})$/gi.test(v);  },
      message: 'Ошибка в email адресе',
    }, */

  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },

  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },

  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },

  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        return /^https?:\/\/([w{3}\.]?)([a-z0-9\-]+\.)+([a-z]{2,6})(\/.*)*$/gi.test(v);
      //  return /^https?:\/\/([w{3}\.]?)([a-z0-9\-]+\.)+([a-z]{2,6}\/)([\w.]*\/)*.*#?$/gi.test(v);
      },
      message: 'Ошибка в пути к файлу изображения',
    },
  },

});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user; // теперь user доступен
        });
    });
};

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
