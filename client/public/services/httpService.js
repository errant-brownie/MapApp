app.service('httpService', ['$http', function ($http) {

  this.signUp = function (username, password, email) {
    var signupUser = {
      username : username,
      password : password,
      email : email
    };

    //signing up a new user
    return $http.post("/api/users", signupUser)
      .then(function (success) {
        return success.body;
      }, function (error) {
        return error;
        console.log(error);
      });
  };

  //adding favorite to users list of favorites
  this.filterTweets = function (hashtag) {
    
    var filterHashtag = {
      hashtag: hashtag
    };

    return $http.post("/api/hashtag", filterHashtag)
      .then(function (success) {
        return success;
      }, function (error) {
        return error;
      });
  };

  //login functionality
  this.login = function () {
    return $http.get('/login')
      .then(function (success) {
        return success;
      }, function (error) {
        return error;
      });
  };

  //getting tweets
  this.getTweets = function (searchTerm) {

    var getRequestGoesTo = '/api/tweets/' + searchTerm;

    return $http.get(getRequestGoesTo)
      .then(function (success) {
        return success.data;
      }, function (error) {
        return error;
      });
  }


}]);
