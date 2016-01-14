var Engine = require('../controllers/engineController');

var updateFilter = function (hastag, threshold) {
  if (hashtag) {
    var threshold = threshold || .25;
    return Engine.getRelatedItems(hashtag)
      .then(function (relatedHashtags) {
        var result = [];

        for (var i = 0; i < relatedHashtags.length; i++) {
          if (relatedHashtags[i].strength >= threshold) {
            result.push(relatedHashtags[i]);
          }
        }

        return result;
      }
    );
  } else {
    return;
  }
};

module.exports = {
  filter: filter,
  updateFilter: updateFilter
};