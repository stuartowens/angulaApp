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

angular.module('main-app', ['ngRoute', 'ngResource', 'angularPayments'])
// .run(['$log', '$rootScope', '$route', function ($log, $rootScope, $route, angular.noop) {
//   // nothing
// })
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
.config(function ($locationProvider, $routeProvider, $windowProvider) {
    var $window = $windowProvider.$get();
    $window.Stripe.setPublishableKey('pk_test_lbTK16cxnGSUtbaZD38raLTR');
    $routeProvider.eagerInstantiationEnabled(true);
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
            this.name = "stu";
            this.profile = {
              instruments: 'Violin',
              Genres: 'Blues'
            }
            // this.faqs = faqService.dataCompile()
          },
          templateUrl: 'public/client/templates/instructors.html',
          controllerAs: 'ctrl',
          bindToController: true
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
        .when('/api/auth/google', {
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
            this.user = $rootScope.user;
            $rootScope.handleSave = function() {
              // console.log("You saved it!", $rootScope.user)
              this.user = $rootScope.user;
              $rootScope.user.total = $rootScope.user.studentTotal * 379 + $rootScope.user.rvCampers * 279 + $rootScope.user.cabinCampers * 199 + $rootScope.user.tentCampers * 150 + $rootScope.user.chaperoneLunches*50
            }
            $rootScope.handleCheckout = function (address, token) {
              $rootScope.user.address = address;
              $rootScope.user.id = token;
              $http({
                method: 'PUT',
                url: 'https://bandcamp.cc/api/updateUser/',
                data: $rootScope.user
              }).then(function successCallback(response) {
                  // this callback will be called asynchronously
                  // when the response is available
                  return response;
                }, function errorCallback(response) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
                }).then(function(res){
                  // console.log(res, 'userData')
                  $rootScope.user = res
                  // console.log($rootScope.user, "during callback")
                });
            }
          },
          templateUrl: 'public/client/templates/registration.html',
          controllerAs: 'regCtrl',
          bindToController: true,
          resolve: {
            permission: function(authorizationService, $route) {
              return authorizationService.permissionCheck([roles.unpaidUser, roles.paidUser, roles.admin])
            }
          },
          secure: 'true'
          // hideMenus: true
        })
        .when('/profile', {
          controller: function($scope, $http, $rootScope){
            $http({
              method: 'GET',
              url: 'https://bandcamp.cc/api/getProfiles/'
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                 $rootScope.user.participant_profiles = response.data
              }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(response, 'error in the response of profiles')
              });

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
    // $locationProvider.hashPrefix('#');

})
