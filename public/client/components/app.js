angular.module('main-app')

// .controller('MainCtrl', function($scope) {
//   $scope.user =
//       { name: '',
//         email: '',
//         signedIn: false,
//         groupTotal: 0,
//         studentTotal: 0,
//         rvCampers: 0,
//         cabinCampers: 0,
//         chaperoneLunches: 0,
//         total: 0
//       }
// })
.directive('app', function() {
  return {
    scope: {},
    restrict: 'E',
    controller: 'MainCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/app.html'
  };
});
