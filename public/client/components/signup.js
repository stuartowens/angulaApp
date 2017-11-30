angular.module('main-app')

.directive('signup', function() {
  return {
    restrict: 'E',
    controller: function($scope){
      // $scope.handleClick = this.handleClick
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/signup.html'
  };
});
