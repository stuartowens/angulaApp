angular.module('main-app')
.directive('checkout', function() {
  return {
    scope: {
      // user: '<',
    },
    restrict: 'E',
    controller: function($scope, $rootScope, $http, stripe) {
      $scope.charge = function charge () {
        console.log(stripe.card.createToken($scope.payment.card))
      }

      // $scope.user={
      //   name: "you know who"
      // }
      // console.log($rootScope.user.participant_profiles[0].displayName, 'profile rootScope~~~~~')
    },
    controllerAs: 'ctrl',
    bindToController: true,
    replace: true,
    templateUrl: 'public/client/templates/checkout.html'
  };
});
