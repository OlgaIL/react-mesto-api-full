const readFile = require('../utils/read-file.js');
const path = require('path');
const usersDataPath = path.join(__dirname, '..', 'data','users.json');


const getUsers = (req, res) => {
  readFile(usersDataPath)
    .then (data => res.send(data))
    .catch (err => res.send(err));
}


const getUser = (req, res) => {
  const {id} = req.params;

  readFile(usersDataPath)
    .then (data => {
    const findUser = data.find(user => user._id===id);
    return findUser;
    })
    .then (user =>{
        if (!user){
            return  res.status(404).send({ message : 'Нет пользователя с таким id'});
        }
        res.send(user);
    })
    .catch (err => res.send(err));
}

module.exports = {getUsers, getUser};
