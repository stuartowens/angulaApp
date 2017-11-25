angular.module('main-app')
.directive('faq', function() {
  return {
    scope: {},
    restrict: 'E',
    controller: function() {
      
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/faq.html'
  };
});
