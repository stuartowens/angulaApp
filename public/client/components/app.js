angular.module('main-app')

.controller('MainCtrl', function() {
})
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
