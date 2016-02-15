TechAngularTest.factory('rssFeedService', ['$http',function($http) {
    var rssFeedService = {
        async: function(rssfeed,callback) {

            var FEED_API_URL = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=";
            var url = FEED_API_URL+encodeURIComponent(rssfeed);

            //jsonp.fetch(url,callback);
            JSONP.get(url, {}, function(response){
                callback(response.responseData.feed.entries);
            });


        }
    };
    return rssFeedService;
}]);
