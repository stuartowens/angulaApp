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
      $scope.submitProfile = function(){
        console.log($scope.vm, '$scope')
        console.log(this.profile, 'this.profile')
        console.log(this, 'this')
        $http({
          method: 'PUT',
          url: 'https://bandcamp.cc/api/updateUser/',
          data: this.profile
        }).then(function successCallback(response) {
            $('#editProfile').modal('hide');
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
      }.bind(this)
    },
    controllerAs: 'vm',
    bindToController: true,
    replace: true,
    templateUrl: 'public/client/templates/example.html'
  };
});
