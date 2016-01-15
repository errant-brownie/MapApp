var Engine = require('../controllers/engineController');
var HashtagsController = require('../controllers/hashtagsController');

// the filter is an array of hashtags to filter
var filter = [];

var getFilter = function(newFilter) {
  if (newFilter) {
    filter = newFilter;
  }
  return filter;
};

// update the filter with hashtags associated with the hashtag parameter
var updateFilter = function (hashtag, threshold) {
  if (hashtag) {
    var threshold = threshold || 0.1;
    HashtagsController.getIdForHashtag(hashtag)
      .then(function (hashtagArr) {
        console.log('hashtag array: ', hashtagArr);
        Engine.getRelatedHashtags(hashtagArr)
          .then(function (relatedHashtags) {
            console.log('related hashtags: ', relatedHashtags);
            var result = [];

            for (var i = 0; i < relatedHashtags.length; i++) {
              if (relatedHashtags[i].strength >= threshold) {
                var relatedHashtag = {
                  name: relatedHashtags[i].hashtag['name'],
                  strength: relatedHashtags[i]['strength'],
                  count: relatedHashtags[i]['count']
                };
                // add related hashtag object to result array;
                result.push(relatedHashtag);
              }
            }
            getFilter(result);

            console.log('new filter: ', getFilter());
            return result;
          })
      }
    );
  } else {
    return getFilter();
  }
};

module.exports = {
  getFilter: getFilter,
  updateFilter: updateFilter
};
