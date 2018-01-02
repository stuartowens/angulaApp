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
            $window.reload();
          })
          .catch(function errorCallback(error) {
            console.log(error, 'error from axios');
            $window.location.replace('https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3010%2Fapi%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=383698803465-o0645lph6b5dv86625e86c3a133imjf4.apps.googleusercontent.com');

          });
      }
    },
    controllerAs: 'signupCtrl',
    bindToController: true,
    templateUrl: 'public/client/templates/signup.html'
  };
});
