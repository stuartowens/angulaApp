angular.module('main-app')
.directive('checkout', function() {
  return {
    scope: {
      // card: '<',
    },
    restrict: 'E',
    controller: function($scope, $rootScope, $http) {
      $scope.stripeCallback = function (code, result) {
        if (result.error) {
          window.alert('it failed! error: ' + result.error.message);
        } else {
          window.alert('success! token: ' + result.id);
          $http({
              method: 'POST',
              url: '/charge',
              data: {
                email: 'homerowen@yahoo.com',
                stripeToken: result.id
              }
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(response, 'charge response~~~~~~~~~')
              }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              })
          }
      };
    },
    controllerAs: 'ctrl',
    bindToController: true,
    replace: true,
    templateUrl: 'public/client/templates/checkout.html'
  };
});
