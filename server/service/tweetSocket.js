
var textSearch = require('../textSearch');
TwitterAPI = require('../controllers/twitterApiController');

module.exports = {
  connect: function (socket) {
    if (stream === null) {
      stream = true;
      console.log('connected');
    
      TwitterAPI.streamTweets(twitterTopic, function (data) {
        if (data.coordinates) {
          if (data.coordinates !== null) {
            
            var tweetObject = data;
            var topicExists;

            //looking for search term within the text of the tweet
            if (twitterTopic !== undefined) {
              topicExists = textSearch.findTwitterTopic(twitterTopic, tweetObject.text);
            }
            //creating an object with useful properties
            if (twitterTopic === undefined || topicExists === true) {
              var scrubbedTweetObject = {
                name: tweetObject.user['name'],
                hashTags: tweetObject.entities['hashtags'],
                handle: tweetObject.user['screen_name'],
                verified: tweetObject.user['verified'],
                createdAt: tweetObject.user['created_at'],
                description: tweetObject.user['description'], 
                url: tweetObject.user['url'],
                followers_count: tweetObject.user['followers_count'], 
                friends_count: tweetObject.user['friends_count'],
                timezone: tweetObject.user['time_zone'],
                coordinates: tweetObject['coordinates'],
                geo: tweetObject['geo'],
                place: tweetObject['place'],
                tweetText: tweetObject['text'],
                tweetTime: tweetObject['created_at'],
                retweet_count: tweetObject['retweet_count'],
                favorite_count: tweetObject['favorite_count']
              };

              // console.log(tweetObject.entities.hashtags)

              // emit to client and send back tweet object
              socket.broadcast.emit("tweet-stream", scrubbedTweetObject);
              socket.emit("tweet-stream", scrubbedTweetObject);

              //changing twitterTopic to return new data related to twitterTopic mid-stream
              //below causes a memory leak (global variable)
              // socket.on('filter', function(topic) {
              //   twitterTopic = topic;
              // });
            }
            //Tweet Object that has been scrubbed for relevant data 
          }
        }
      });
    }
  }
};