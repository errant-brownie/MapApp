// Import twit npm module
var Twit = require('twit');
// Imports twitter credential config

if (!process.env.CONSUMER_KEY) {
  var twitterCredentials = require('../../config.js').twitter;
}

var T = new Twit({
    "consumer_key": process.env.CONSUMER_KEY || twitterCredentials["consumer_key"],
    "consumer_secret": process.env.CONSUMER_SECRET || twitterCredentials["consumer_secret"],
    "access_token": process.env.ACCESS_TOKEN || twitterCredentials["access_token"],
    "access_token_secret": process.env.ACCESS_TOKEN_SECRET || twitterCredentials["access_token_secret"]
});

// getTweets: Function that gets the 'n' most recent tweets given a query string and a number n
var getTweets = function (query, number, callback) {
  T.get('search/tweets', {q: query, count: number}, callback);
};

// streamTweets: Function that streams tweets with a location or geocode provided
var streamTweets = function (query, callback) {
  var stream = T.stream('statuses/filter', {'locations':['-180','-90','180','90']});
  stream.on('tweet', callback);
};

// var getTweets = function (req, res) {
//   twitterApiController.getTweets(req.params.category, 100, function (err, data) {
//     // ** Reject data that doesn't have a location ** !!! Need to do this
//     if (err) {
//       console.log('Error getting data from Twttier API');
//       throw new Error(err);

//     } else {
//       console.log(data.statuses)
//       //create an empty scrubbedTweetData array.
//       var scrubbedTweetData = [];
//       //loop through each tweetObject returned from the twitter API...
//       data.statuses.forEach(function (tweetObject) {
//         //if tweet object has a 'truthy' time_zone or coordinates property... 
//         if (tweetObject['geo'] || tweetObject['coordinates']) {
//           //then create a scrubbedTweetObject containing most salient info...

//           var scrubbedTweetObject = {
//              name: tweetObject.user['name'],
//              handle: tweetObject.user['screen_name'],
//              verified: tweetObject.user['verified'],
//              createdAt: tweetObject.user['created_at'],
//              description: tweetObject.user['description'], 
//              url: tweetObject.user['url'],
//              followers_count: tweetObject.user['followers_count'], 
//              friends_count: tweetObject.user['friends_count'],
//              timezone: tweetObject.user['time_zone'],
//              coordinates: tweetObject['coordinates'],
//              geo: tweetObject['geo'],
//              place: tweetObject['place'],
//              tweetText: tweetObject['text'],
//              retweet_count: tweetObject['retweet_count'],
//              favorite_count: tweetObject['favorite_count']
//           };

//           var databaseTweet = {
//             username: tweetObject.user['name'],
//             hashtags: tweetObject.entities['hashtags']
//           };

//           //and push the scrubbed object to scrubbedTweetData.
//           scrubbedTweetData.push(scrubbedTweetObject);
//         }
//       });
    
//       //once data has been scrubbed, send it back up to the client side!
//       res.json(scrubbedTweetData);
//     }
//   });
// };

module.exports = { 
  // getTweets: getTweets,
  streamTweets: streamTweets
};
