angular.module('main-app')
.directive('profile', function() {
  return {
    scope: {
      profile: '<'
    },
    restrict: 'E',
    controller: function($scope, $rootScope, $http, $location) {
      $scope.dataId = "#" + "" + $scope.$id + "";
      $scope.submitProfile = function(){
        $http({
          method: 'PUT',
          url: 'https://bandcamp.cc/api/updateProfile/',
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
            // console.log(res, 'profileData')
            $scope.profile = res
            // console.log($scope.profile, "during callback")
          });
      }.bind(this)
    },
    controllerAs: 'vm',
    bindToController: true,
    replace: true,
    templateUrl: 'public/client/templates/profile.html'
  };
});
