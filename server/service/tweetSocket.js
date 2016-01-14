var textSearch = require('../textSearch');
var TwitterAPI = require('../controllers/twitterApiController');
var socketio = require('socket.io');

module.exports = {
  connect: function (server) {
    var io = socketio.listen(server);

    // Create web socket connection
    io.sockets.on('connection', function (socket) {
      socket.on('tweet flow', function () {
        var connection = null;

        if (connection === null) {
          connection = true;
          console.log('connected');

          // kill me, kill me please, cuz i don't work, so smash my face like soft bread
          // twitterTopic needs to be defined currently to make sockets work
          var twitterTopic;

          
          TwitterAPI.streamTweets(twitterTopic, function (data) {
            if (data.user.geo_enabled) {
              if (data.coordinates !== null || data.place !== null) {
                // write.write(JSON.stringify(data) );
                var tweetObject = data;
                var topicExists;
                var hashTagExists;

                console.log(data)

                //looking for search term within the text of the tweet
                if (twitterTopic !== undefined) {
                  topicExists = textSearch.findTwitterTopic(twitterTopic, tweetObject.text);
                  // console.log(topicExists)
                }
                if (twitterTopic !== undefined && data.entities.hashtags.length !== 0) {
                  hashTagExists = textSearch.findHashTag(twitterTopic, tweetObject.entities.hashtags);
                }
                //creating an object with useful properties
                if (twitterTopic === undefined || topicExists === true || hashTagExists === true) {
                  var scrubbedTweetObject = {
                    name: tweetObject.user['name'],
                    handle: tweetObject.user['screen_name'],
                    verified: tweetObject.user['verified'],
                    createdAt: tweetObject.user['created_at'],
                    description: tweetObject.user['description'],
                    url: tweetObject.user['url'],
                    hashtags: tweetObject.entities['hashtags'],
                    followers_count: tweetObject.user['followers_count'],
                    friends_count: tweetObject.user['friends_count'],
                    timezone: tweetObject.user['time_zone'],
                    coordinates: tweetObject['coordinates'] ? tweetObject['coordinates']['coordinates'] : tweetObject['place']['bounding_box']['coordinates'][0][0],
                    geo: tweetObject['geo'],
                    place: tweetObject['place'],
                    tweetText: tweetObject['text'],
                    tweetTime: tweetObject['created_at'],
                    retweet_count: tweetObject['retweet_count'],
                    favorite_count: tweetObject['favorite_count']
                  };
                  // emit to client and send back tweet object
                  socket.broadcast.emit("tweet-stream", scrubbedTweetObject);
                  socket.emit("tweet-stream", scrubbedTweetObject);

                  //changing twitterTopic to return new data related to twitterTopic mid-stream
                  //below causes a memory leak (global variable)

                }
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
  }
};