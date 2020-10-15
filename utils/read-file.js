const fs = require('fs').promises;
//const { parse } = require('querystring');

module.exports = (url) => {
  return fs.readFile(url, {encoding: 'utf8'})
  .then( file => {
   // console.log(file);
    return JSON.parse(file);
  })

}