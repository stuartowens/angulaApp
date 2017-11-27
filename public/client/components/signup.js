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
    // scope: {
    //   user: '<',
    // },
    restrict: 'E',
    controller: function(){
    },
    controllerAs: 'ctrl',
    bindToController: true,
    // templateUrl: 'public/client/templates/signup.html'
    templateUrl: `
      <div><h1>Hey hey You asshole</h1></div>
    `
  };
});
