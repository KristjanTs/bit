var myApp = angular.module("myApp", ["ngRoute"])
.config(function($routeProvider, $locationProvider){
  $locationProvider.hashPrefix('');
  $routeProvider
  .when("/register", {
    templateUrl: "templates/register.html",
    controller: "AppCtrl"
  })
  .when("/users", {
    templateUrl: "templates/users.html",
    controller: "AppCtrl"
  });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

myApp.controller("AppCtrl", ["$scope", "$http", function($scope, $http) {

  $scope.sortType = 'ettevotteNimi';
  $scope.sortReverse = false;

  var refresh = function() {
    $http.get("/userList").then(successCallback, failCallback);

    function successCallback(res){
      $scope.userList=res.data;
      $scope.user = {};
    };

    function failCallback(err){
      console.log(err.message);
    };
  };

  refresh();

  $scope.addUser = function() {
    $http.post("/userList", $scope.user).then(function(success){
    });
    refresh();
  };

  $scope.removeUser = function(id) {
    console.log(id);
    $http.delete("/userList" + id).then(successCallback, failCallback);

    function successCallback(res){
      console.log("lol");
    };

    function failCallback(err){
      console.log("lo2l");
    };

    refresh();
  };


  $(".for-companies").hide();

  $("#company").click(function(){
    if($(this).is(":checked")) {
      $(".for-companies").show();
      $(".for-companies").find("input").attr("required", true);
    }
    else {
      $(".for-companies").hide();
      $(".for-companies").find("input").attr("required", false);
    }
  });
}]);

function sliderChange(val) {
  $("#range-slider-number").html(val);
}
