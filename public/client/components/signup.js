angular.module('main-app')

.directive('signup', function() {
  return {
    restrict: 'E',
    controller: function($scope, $http, $window){
      this.onClick = function(){
        console.log('clicked the onClick')
        $http.get('/api/auth/google')
          .then(function successCallback(response) {
            console.log(response, 'response from axios');
            // $window.location.reload();

          })
          .catch(function errorCallback(error) {
            console.log(error, 'error from axios');
          });
      }
    },
    controllerAs: 'signupCtrl',
    bindToController: true,
    templateUrl: 'public/client/templates/signup.html'
  };
});
