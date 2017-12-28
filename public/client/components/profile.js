angular.module('main-app')
.directive('profile', function() {
  return {
    // scope: {
    //   user: '<',
    // },
    restrict: 'E',
    controller: function($scope, $rootScope) {
      // $scope.user={
      //   name: "you know who"
      // }
      // console.log($rootScope.user.participant_profiles[0].displayName, 'profile rootScope~~~~~')
    },
    controllerAs: 'ctrl',
    bindToController: true,
    replace: true,
    templateUrl: 'public/client/templates/profile.html'
  };
});
