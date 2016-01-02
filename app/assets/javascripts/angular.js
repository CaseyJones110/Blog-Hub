var app = angular.module('BlogHub', []);

app.controller("APIController", ['$http', '$scope', function($http, $scope) {
  $scope.data;
  $scope.searchParams = "";
  this.makeCall = function() {
    var url = "http://developer.echonest.com/api/v4/artist/blogs?api_key=KQHEOGU5MSXOACYMP";
    var urlParams = "&name=" + this.searchParams + "&format=json&results=3&start=0";
    var endpoint = url + urlParams;
    var promise = $http.get(endpoint);
    promise.success(function(data) {
      console.log(data);
      $scope.data = data;
      console.log($scope.data);
    });
    promise.error(function(err) {
      console.log("Call ERROR = " + err);
    });
  };
}]);
