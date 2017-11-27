angular.module('main-app')
.directive('modal', function() {
  return {
    scope: {
      user: '<'
    },
    restrict: 'E',
    controller: function($scope) {

    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/modal.html'
  };
});
