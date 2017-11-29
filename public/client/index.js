userData =
          { name: 'no name',
            email: 'no email',
            signedIn: false,
            groupTotal: 0,
            studentTotal: 0,
            rvCampers: 0,
            cabinCampers: 0,
            chaperoneLunches: 0,
            total: 0
          }
angular.module('main-app', ['ngRoute'])

.config(function ($locationProvider, $routeProvider) {

    $routeProvider
        .when('/home', {
          controller: 'MainCtrl',
          templateUrl: 'public/client/templates/app.html',
          controllerAs: 'ctrl'
          // hideMenus: true
        })
        .when('/faq', {
          controller: 'MainCtrl',
          templateUrl: 'public/client/templates/faq.html',
          controllerAs: 'ctrl'
          // hideMenus: true
        })
        .when('/registration', {
          controller: function($scope) {
            $scope.user = userData;
            $scope.handleClick = function() {
              console.log("You made it!")
            }
          },
          templateUrl: 'public/client/templates/registration.html',
          controllerAs: 'ctrl'
          // hideMenus: true
        })
        .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
})
