var passport = require("passport");
var TwitterStrategy =  require("passport-twitter").Strategy;
// var KEYS = require('../../config.js');

if(!process.env.CONSUMER_KEY){
  var KEYS = process.env.CONSUMER_KEY || require('../../config.js');
}

var mongoose = require('mongoose');
var User = require('../models/userModel.js');

module.exports = {
  
  initialize: function() {
  
    var strategyData = {
      consumerKey: process.env.CONSUMER_KEY || KEYS.twitter["consumer_key"],
      consumerSecret: process.env.CONSUMER_SECRET || KEYS.twitter["consumer_secret"],
      callbackURL: process.env.URL || "http://127.0.0.1:3000/auth/twitter/callback"
    };

    passport.serializeUser(function(user, cb) {
      cb(null, user);
    });

    passport.deserializeUser(function(obj, cb) {
      cb(null, obj);
    });

    var twitterCallback =  function(token, tokenSecret, profile, done) {
      User.findOneAndUpdate(
        {username: profile.username},
        {$setOnInsert: { username: profile.username, favorites: [], searchHistory: []}},
        { new: true, upsert:true}, //return new doc if one is upserted and insert the document if it does not exist
        function(err, data) { 
          if(err) {
            console.log(err);
          }
        }
      );
      return done(null, profile);
    };

    passport.use(new TwitterStrategy(strategyData, twitterCallback));
  }
};
