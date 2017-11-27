userData =
          { name: 'no name',
            email: 'no email',
            signedIn: false,
            groupTotal: 0,
            studentTotal: 0,
            rvCampers: 0,
            cabinCampers: 0,
            chaperoneLunches: 0,
            total: 0
          }

angular.module('main-app')


.directive('registration', function($scope) {
  return {
    scope: {},
    restrict: 'E',
    controller: function($scope) {
      $scope.user = userData;
    },
    controllerAs: 'ctrl',
    bindToController: true,
    // templateUrl: 'public/client/templates/registration.html'
    templateUrl:`
      <h1>{{$scope.user.name}}</h1>
    `
  };
});
