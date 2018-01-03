angular.module('main-app')
.directive('example', function() {
  return {
    scope: {
    },
    restrict: 'E',
    controller: function($scope, $rootScope, $http, $location) {
    },
    controllerAs: 'example',
    bindToController: true,
    replace: true,
    templateUrl: 'public/client/templates/example.html'
  };
});
