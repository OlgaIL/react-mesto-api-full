const fs = require('fs').promises;
// const { parse } = require('querystring');

module.exports = (url) => fs.readFile(url, { encoding: 'utf8' })
  .then((file) => JSON.parse(file));
