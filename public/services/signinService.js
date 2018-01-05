angular.module('main-app')

.service('signinService', function($http, $location) {
  this.logout = function() {
    $http({
      method: 'GET',
      url: 'https://bandcamp.cc/api/logout/'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
         console.log(response, 'response')
         alert('You have been signed out')
         // $location.path('/')
         console.log($rootScope.user, "rootscope.user")
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert(response)
      });
  }
})
