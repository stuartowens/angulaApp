angular.module('main-app')
.directive('app', function() {
  return {
    scope: {

    },
    restrict: 'E',
    controller: function(){
      console.log('this is group directive')
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/app.html'
  };
});
