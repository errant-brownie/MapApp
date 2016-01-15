// Setup dependences
var express = require('express');
var router = express.Router();
var path = require('path');
var twitterApiController = require('../controllers/twitterApiController.js');
var UserController = require('../controllers/userController.js');
var passport = require('passport');
var socketService = require('../service/socketService');

var isLoggedIn = function (req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }

  // if they aren't redirect them to the home page
  res.redirect('/signup');
};

/* GET Request for index page. */
router.get('/', isLoggedIn, function (req, res, next) {
  res.sendFile(path.join(__dirname, '../../client/views/index.html'));
});

// Login Route for O-Auth
router.get('/auth/twitter', passport.authenticate('twitter'));

// Login Callback From Twitters O-Auth
router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/auth/twitter' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

// Logout Route
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/signup');
});

// Handle GET request to Twitter API
// router.get('/api/tweets/:category', twitterApiController.getTweets);

// Handle PUT request to /api/users (to change favorites)
router.put('/api/users/:username', function (req, res) {
  console.log('Recevied PUT request from client', req.body);
  var favoritesHashtags = req.body.favoritesHashtags;
  UserController.addFavorite(req.params.username, favoritesHashtags, function (response) {
    console.log('Successfully updated favorite hashtags');
    res.sendStatus(200);
  });
});

router.post('/api/hashtag', function (req, res) {
  var hashtag = req.body.hashtag;
  socketService.filterHashtag(hashtag);
  res.end();
})

router.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/views/signup.html'));
});

module.exports = router;
