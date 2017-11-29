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
      this.handleClick = () => {
        console.log("You made it!")
      }
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/signup.html'
  };
});
