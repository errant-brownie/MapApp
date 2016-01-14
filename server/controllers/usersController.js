var model = require('../db/dbModel.js');

// var getUser = function (user) {
//   return model.User.findOne({ where: { username: user.username }})
//     .then(function (match) {
//       if (!match) {
//         throw (new Error('User does not exist!'));
//       } else {
//         return match;
//       }
//     })
// };

var addUser = function (user) {
  var params = { name: user.name }
  return model.User.findOrCreate({
    where: params,
    defaults: params 
  })
};

module.exports = {
  // getUser: getUser,
  addUser: addUser
};