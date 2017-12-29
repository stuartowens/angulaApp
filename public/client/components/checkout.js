angular.module('main-app')
// .config(function(stripeProvider){
//   stripeProvider.setPublishableKey('pk_test_LkOowhWWdMD6tjPkg3EicMLK')
// })
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
        }
      };
      // $scope.charge = function charge () {
      //   stripe = Stripe('pk_test_LkOowhWWdMD6tjPkg3EicMLK')
      //   elements = stripe.elements();
      //   console.log(stripe, 'stripe~~~~~~~~')
      //   console.log(elements, 'elements~~~~~~~~')
      //   $scope.card = elements.create('card')
      //   console.log($scope.card, 'card~~~~~~~~~')
      //   $scope.card.mount('#card-element')
      //   // console.log(stripe.card.createToken($scope.payment.card))
      // }
      // $scope.charge();
      // $scope.card.addEventListener('change', function(event) {
      //   var displayError = document.getElementById('card-errors');
      //   if (event.error) {
      //     displayError.textContent = event.error.message;
      //   } else {
      //     displayError.textContent = '';
      //   }
      // });
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
