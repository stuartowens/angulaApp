angular.module('main-app')
.directive('example', function() {
  return {
    scope: {
      user: '<',
      name: '<'
    },
    restrict: 'E',
    controller: function($scope, $rootScope, $http, $location) {
      console.log($scope, "scope")
      console.log($rootScope, "rootScope")
      $scope.stripeCallback = function (code, result) {
        if (result.error) {
          window.alert('Your card failed to process because: ' + result.error.message);
        } else {
          // console.log($rootScope.user.total, '$rootScope.user.total~~~~~~~~~~')
          window.alert('success! token: ' + result.id);
          $http({
              method: 'POST',
              url: '/charge',
              data: {
                email: 'homerowens@yahoo.com',
                stripeToken: result.id,
                amount: $rootScope.user.total
              }
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(response, 'charge response~~~~~~~~~')
                if (response.data.paid) {
                  $rootScope.handleCheckout(response.data.source, response.data.id)
                  $location.path('/profile')
                }
              }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              })
          }
      };
    },
    controllerAs: 'vm',
    bindToController: true,
    replace: true,
    templateUrl: 'public/client/templates/example.html'
  };
});
