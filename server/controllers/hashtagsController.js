var model = require('../db/dbModel.js');
var User = require('./usersController');
var Promise = require('bluebird');

// object will have the following format 
// { hashtags: ['xyz', 'abc', ...], 
//   name: { id: 'INTEGER', name: 'abc' } }
var addHashtag = function (object) {
  console.log("Adding hash tags: ");
  console.dir(object);
  var userParams = { name: object.name };
  
  // find or create the user
  return User.addUser(userParams)
  .then(function (user) {
    // once we have the user, iterate over the hashtags
    return Promise.each(object.hashtags, function (hashtag){
      // find or crate the hash tag
      return model.Hashtag.findOrCreate({
        where: {name: hashtag}, 
        defaults: {name: hashtag},
      })
      // once we have the hashtag object
      .then(function (hashtag) {
        console.log('hashtag.id: ' + hashtag[0].id);
        console.log(hashtag);
        console.log('user.name: ' + user[0].name);
        console.log(user);
        var params = { hashtag_id: hashtag[0].id, user_id: user[0].id }
        // find or create an entry into the join table.
        return model.HashtagUser.findOrCreate({
          where: params,
          defaults: params
        });
      })
    })
  });
};

var getHashtags = function (userId) {
  return model.User.findOne({ 
    where: {
      id: userId
    },
    include: [ model.Hashtag ]
  })
  .then(function (user) {
    return user.Hashtags;
  });
};

var getHashtagsForUsers = function (userIds) {
  return model.HashtagUser.findAll({
    where: {
      user_id: userIds
    }
  })
  .then(function (results) {
    return model.Hashtag.findAll({
      where: {
        id: results.map(function (result) {
          return result.hashtag_id
        })
      }
    })
  })
}

module.exports = {
  getHashtags: getHashtags,
  getHashtagsForUsers: getHashtagsForUsers,
  addHashtag: addHashtag
};
