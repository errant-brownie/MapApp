var textSearch = require('../utils/textSearch');
var TwitterAPI = require('../controllers/twitterApiController');
var filterService = require('../requestHandler/filter');
var socketio = require('socket.io');
var hashtagsController = require('../controllers/hashtagsController');
var hashtag = null;

var filterHashtag = function (newHashtag) {
  if (newHashtag) {
    hashtag = newHashtag;
  } else {
    return hashtag;
  }
};

var connect = function (server) {
  var io = socketio.listen(server);
  var count = 0;

  // Create web socket connection
  io.sockets.on('connection', function (socket) {
    socket.on('tweet flow', function () {

      var connection = null;

      if (connection === null) {
        connection = true;
        console.log('connected');

        var twitterTopic = filterHashtag();

        TwitterAPI.streamTweets(twitterTopic, function (data) {
          if (data.user.geo_enabled) {
            if (data.coordinates !== null || data.place !== null) {
              // write.write(JSON.stringify(data) );
              var tweetObject = data;
              var topicExists;
              var hashTagExists;

              count++;
              console.log("Tweet Recieved: " + count);

              // looking for search term within the text of the tweet
              // if (twitterTopic !== undefined) {
              //   topicExists = textSearch.findTwitterTopic(twitterTopic, tweetObject.text);
              //   // console.log(topicExists)
              // }

              // if (twitterTopic !== undefined && data.entities.hashtags.length !== 0) {
              //   hashTagExists = textSearch.findHashTag(twitterTopic, tweetObject.entities.hashtags);
              // }

              // //creating an object with useful properties
              // if (twitterTopic === undefined || topicExists === true || hashTagExists === true) {

                // TODO: images
                //var splicedProfileImage = tweetObject.users['profile_image_url_https'].slice(0, -4).concat('_mini.png');

                var scrubbedTweetObject = {
                  name: tweetObject.user['name'],
                  handle: tweetObject.user['screen_name'],
                  // verified: tweetObject.user['verified'],
                  createdAt: tweetObject.user['created_at'],
                  description: tweetObject.user['description'],
                  url: tweetObject.user['url'],
                  hashtags: tweetObject.entities['hashtags'],
                  followers_count: tweetObject.user['followers_count'],
                  coordinates: tweetObject['coordinates'] ? tweetObject['coordinates']['coordinates'] : tweetObject['place']['bounding_box']['coordinates'][0][0],
                  geo: tweetObject['geo'],
                  place: tweetObject['place'],
                  tweetText: tweetObject['text'],
                  tweetTime: tweetObject['created_at'],
                  //profileImage: splicedProfileImage,
                  // retweet_count: tweetObject['retweet_count'],
                  // favorite_count: tweetObject['favorite_count']
                };

                var databaseTweet = {
                  name: scrubbedTweetObject.handle,
                  hashtags: scrubbedTweetObject.hashtags,
                };

                hashtagsController.addHashtag(databaseTweet)
                  .then(function () {
                    if (count % 997 === 0) {
                      return filterService.updateFilter(twitterTopic)
                    }
                  })
                  // filter should be an array
                  .then(function (filter) {
                    if (filter) {
                      for (var i = 0; i < filter.length; i++) {
                        for (var j = 0; j < scrubbedTweetObject.hashtags.length; j++) {
                          if (filter[i] == scrubbedTweetObject.hashtags[j]) {
                            return scrubbedTweetObject
                          }
                        }
                      }
                      throw(new Error('Item does not contain filter hashtags'));
                    } else {
                      return scrubbedTweetObject;
                    }
                  })
                  .then(function (tweets) {
                    socket.broadcast.emit("tweet-stream", scrubbedTweetObject);
                    socket.emit("tweet-stream", scrubbedTweetObject);
                  })
                  .catch(function (err) {

                  })
                // emit to client and send back tweet object

                //changing twitterTopic to return new data related to twitterTopic mid-stream
                //below causes a memory leak (global variable)
              // }
              //Tweet Object that has been scrubbed for relevant data 
            }
          }
        });
      }
    });
    socket.on("disconnect", function () {
      console.log('disconnected');
    });
    socket.emit("connected");
  });
};

// throw dummy data into database
// var dummy = function () {

//   var databaseTweet = {
//     name: "Alex",
//     hashtags: ['winning', 'obama', 'losing'],
//   };

//   hashtagsController.addHashtag(databaseTweet)
//     // filter should be an array
// }
// dummy();

module.exports = {
  connect: connect,
  filterHashtag: filterHashtag
};
