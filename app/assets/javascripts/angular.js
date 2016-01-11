var app = angular.module('BlogHub', []);

app.controller("ArticleController", ['$http', '$scope', function($http, $scope) {
  $scope.data;
  $scope.searchParams = "";
  $scope.spanDestroy = function (data) {
    console.log("de-spanned");
    var newData = data.replace(/<\/?span>/g, '');
    return newData;
  };
  this.makeCall = function() {
    var url = "http://developer.echonest.com/api/v4/artist/news?api_key=KQHEOGU5MSXOACYMP";
    var urlParams = "&name=" + this.searchParams + "&format=json&results=3&start=0";
    var endpoint = url + urlParams;
    var promise = $http.get(endpoint);
    promise.success(function(data) {
      console.log(data);
      $scope.data = data;
      for (var i = 0; i < data.response.news.length; i++) {
        var rawData = $scope.data.response.news[i].summary;
        var safeData = $scope.spanDestroy(rawData);
        $scope.data.response.news[i].summary = safeData;
      };
      console.log($scope.data);
    });
    promise.error(function(err) {
      console.log("Call ERROR = " + err);
    });
  };
}]);

app.controller('TrendController', ['$http', '$scope', function($http, $scope) {
  $scope.trendData = {};
  $scope.images = [];
  $scope.badImages = [];
  $scope.getImage = function(index) {
    var randNum = Math.floor(Math.random() * $scope.trendData.response.artists[index].images.length);
    console.log($scope.trendData.response.artists[index].images[randNum].url);
    return $scope.trendData.response.artists[index].images[randNum].url;
  };
  $scope.makeCall = function() {
    var url = "http://developer.echonest.com/api/v4/artist/top_hottt?";
    var params = "api_key=KQHEOGU5MSXOACYMP&format=json&results=10&start=0";
    var buckets = "&bucket=images&bucket=news";
    var endpoint = url + params + buckets;
    var promise = $http.get(endpoint);
    promise.success(function(data) {
      console.log(data);
      $scope.trendData = data;
      for (var i = 0; i < $scope.trendData.response.artists.length; i++) {
        if ($scope.getImage(i).search(/last\.fm/)) {
          $scope.badImages[i] = $scope.getImage(i);
        } else {
          $scope.images[i] = $scope.getImage(i);
        };
      };
    });
  };
}]);
