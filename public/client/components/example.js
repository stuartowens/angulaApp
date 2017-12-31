angular.module('main-app')
.directive('example', function() {
  return {
    scope: {
      user: '<',
      name: '<',
      profile: '<'
    },
    restrict: 'E',
    controller: function($scope, $rootScope, $http, $location) {
      this.submitProfile = function(){
        console.log($scope.vm, '$scope.profile')
        console.log(e, 'event')
      }
    },
    controllerAs: 'vm',
    bindToController: true,
    replace: true,
    templateUrl: 'public/client/templates/example.html'
  };
});
