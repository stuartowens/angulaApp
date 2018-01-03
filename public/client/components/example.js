angular.module('main-app')
.directive('example', function() {
  return {
    scope: {
      user: '<',
      name: '<',
      profile: '<'
    },
    restrict: 'E',
    controller: function($scope, $rootScope, $http, $location) {
      this.submitProfile = function(){
        console.log($scope.vm, '$scope.profile')
        $http({
          method: 'PUT',
          url: 'https://bandcamp.cc/api/updateUser/',
          data: $scope.profile
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            return response;
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          }).then(function(res){
            console.log(res, 'profileData')
            $scope.profile = res
            console.log($scope.profile, "during callback")
          });
      }
    },
    controllerAs: 'vm',
    bindToController: true,
    replace: true,
    templateUrl: 'public/client/templates/example.html'
  };
});
