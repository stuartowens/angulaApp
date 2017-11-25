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
        .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
})
