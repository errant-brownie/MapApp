var model = require('../db/dbModel.js');
var User = require('./usersController');

var addHashtag = function (object) {
  var userParams = { name: object.user };
  var hashtagParams = { name: object.hashtags };
  
  return User.addUser(userParams)
    .then(function (user) {
      model.Hashtag.findOrCreate({
        where: hashtagParams, 
        defaults: hashtagParams
      })
      .spread(function (hashtag) {
        var params = { hashtag_id: hashtag.id, user_id: user.id }
        return model.HashtagUser.findOrCreate({
          where: params,
          defaults: params
        });
      })
    })
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
