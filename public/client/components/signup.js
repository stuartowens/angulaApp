// name: '<',
// email: '<',
// signedIn: '<',
// groupTotal: '<',
// studentTotal: '<',
// rvCampers: '<',
// cabinCampers: '<',
// chaperoneLunches: '<',
// total: '<',

angular.module('main-app')

.directive('signup', function() {
  return {
    restrict: 'E',
    controller: function($scope){
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/signup.html'
  };
});
