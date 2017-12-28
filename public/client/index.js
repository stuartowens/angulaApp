contactInfo = {
  firstName: 'Stuart',
  lastName: 'Owens',
  city: 'Austin',
  state: 'Texas',
  email: 'functionfiddler@gmail.com',
  phone: '999-999-0000',
  comments: 'get a better UI mofo'
}
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
var roles = {
  unpaidUser: 0,
  paidUser: 1,
  admin: 2
}

var unauthorizedAccessRoute = ' /UnauthorizedAccess';

angular.module('main-app', ['ngRoute', 'ngResource'])
.controller('MainCtrl', function($scope, $rootScope, $http, faqService) {
  console.log($rootScope, 'rootScope~~~~~~~~~~');
  // $http({
  //   method: 'GET',
  //   url: '/getUser'
  // }).then(function successCallback(response) {
  //     // this callback will be called asynchronously
  //     // when the response is available
  //      console.log(response, 'userData')
  //      $rootScope.user = response
  //      console.log($rootScope.user, "during callback")
  //   }, function errorCallback(response) {
  //     // called asynchronously if an error occurs
  //     // or server returns response with an error status.
  //   });

    // this.faqs = faqServive.dataCompile()
    // this.faqs = faqData;

  // console.log($rootScope.user, "after callback")
})

.config(function ($locationProvider, $routeProvider) {

    $routeProvider
        .when('/', {
          controller: function($scope) {
          },
          templateUrl: 'public/client/templates/app.html',
          controllerAs: 'ctrl'
          // hideMenus: true
        })
        .when('/lodging', {
          controller: function() {
          },
          templateUrl: 'public/client/templates/lodging.html',
          controllerAs: 'ctrl'
          // hideMenus: true
        })
        .when('/faq', {
          controller: function(faqService) {
            this.faqs = faqService.dataCompile()
          },
          templateUrl: 'public/client/templates/faq-page.html',
          controllerAs: 'ctrl'
          // hideMenus: true
        })
        .when('/instructors', {
          controller: function() {
            // this.faqs = faqService.dataCompile()
          },
          templateUrl: 'public/client/templates/instructors.html',
          controllerAs: 'ctrl'
          // hideMenus: true
        })
        .when('/contact', {
          controller: function(contactService, $scope) {
            Object.assign($scope, {
              firstName: '',
              lastName: '',
              city: '',
              state: '',
              email: '',
              phone: '',
              comments: ''
            })
            this.formChange = contactService.formChange()
           //using this insted of form change but i think instead of using local scope i might use the rootscope instead because thb $scope keeps reseting more than likely due to the prevent default not eworking vorrectly
            this.onChange = function(eventValue, id) {
              Object.assign($scope, {
                id: eventValue,
              })
              // console.log('something is changing!!', eventValue, id, $scope.id)
            }
            $scope.submitForm = function($event) {
              $event.preventDefault()
              contactService.submitForm($scope);
            }
          },
          templateUrl: 'public/client/templates/contact.html',
          controllerAs: 'ctrl'
          // hideMenus: true
        })
        .when('/signin', {
          // controller: 'MainCtrl',
          controller: function($scope) {
            $scope.user = userData;
            $scope.handleClick = function() {
              console.log("You made it!", $scope.user)
            }
          },
          templateUrl: 'public/client/templates/signin.html',
          controllerAs: 'ctrl'
          // hideMenus: true
        })
        .when('/auth/google', {
          controller: function($scope, $route, $window) {
            // $onInit = function() {
            // $route.reload()
            $window.location.reload();
              console.log('on init!!!!')
            // }
          },
          templateUrl: 'public/client/templates/google.html',
          controllerAs: 'ctrl'
        })
        .when('/registration', {
          controller: function($scope, $http, $rootScope) {
            $scope.handleSave = function() {
              console.log("You saved it!", $scope.user)
              $scope.user.total = $scope.user.studentTotal * 379 + $scope.user.rvCampers * 279 + $scope.user.cabinCampers * 199 + $scope.user.tentCampers * 150 + $scope.user.chaperoneLunches*50
            }
            $scope.handleCheckout = function () {
              $http({
                method: 'PUT',
                url: '/updateUser',
                data: $scope.user
              }).then(function successCallback(response) {
                  // this callback will be called asynchronously
                  // when the response is available

                }, function errorCallback(response) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
                }).then(function afterCallback(response){
                  console.log(response, 'userData')
                  $rootScope.user = response.data
                  console.log($rootScope.user, "during callback")
                });
            }
          },
          templateUrl: 'public/client/templates/registration.html',
          controllerAs: 'ctrl',
          resolve: {
            permission: function(authorizationService, $route) {
              return authorizationService.permissionCheck([roles.unpaidUser, roles.paidUser, roles.admin])
            }
          },
          secure: 'true'
          // hideMenus: true
        })
        .when('/profile', {
          controller: function($scope){
            console.log($scope.user)
          },
          templateUrl: 'public/client/templates/profile-container.html',
          controllerAs: 'ctrl',
          resolve: {
            permission: function(authorizationService, $route) {
              return authorizationService.permissionCheck([roles.unpaidUser, roles.paidUser, roles.admin])
            }
          },
          secure: 'true'
          // hideMenus: true
        })
        .when('/unauthorizedAccess', {
          controller: 'MainCtrl',
          templateUrl: 'public/client/templates/unauthorized.html',
          controllerAs: 'ctrl'
        })
        .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
})
