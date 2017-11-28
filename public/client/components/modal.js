angular.module('main-app')
.directive('modal', function() {
  return {
    // scope: {
    //   user: '<',
    // },
    restrict: 'E',
    controller: function($scope) {

    },
    controllerAs: 'ctrl',
    bindToController: true,
    replace: true,
    templateUrl: 'public/client/templates/modal.html'
  };
});
