
var roles = {
  unpaidUser: 0,
  paidUser: 1,
  admin: 2
}

var unauthorizedAccessRoute = ' /UnauthorizedAccess';

angular.module('main-app', ['ngRoute', 'ngResource', 'angularPayments'])
.controller('MainCtrl', function($scope, $rootScope, $http, faqService) {
  // console.log($rootScope, 'rootScope~~~~~~~~~~');
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
          controller: 'MainCtrl',
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
        })
        .when('/signin', {
          controller: function($scope) {
            // $scope.user = userData;
            $scope.handleClick = function() {
              // console.log("You made it!", $scope.user)
            }
          },
          templateUrl: 'public/client/templates/signin.html',
          controllerAs: 'ctrl'
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
          controller: function($scope, $http, $rootScope, $location) {
            this.user = $rootScope.user;
            $rootScope.handleSave = function() {
              // console.log("You saved it!", $rootScope.user)
              // $('#registrationmodal').modal('hide');
              this.user = $rootScope.user;
              $rootScope.user.total = $rootScope.user.studentTotal * 379 + $rootScope.user.rvCampers * 279 + $rootScope.user.cabinCampers * 199 + $rootScope.user.tentCampers * 150 + $rootScope.user.chaperoneLunches*50 - $rootScope.user.amt_paid;
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
                  // console.log(res, 'userData from charge')
                  $rootScope.user = res.data
                  // console.log($rootScope.user, 'rootScope.user')
                  $location.path('/profile')
                  $http({
                    method: 'GET',
                    url: 'https://bandcamp.cc/api/send/',
                    params: {
                      firstName: res.data.address.name,
                      lastName: "amount charged: $" + res.data.amt_paid,
                      city: "Number of students: " + res.data.studentTotal,
                      state: "Number of tent campers: " + res.data.tentCampers,
                      email: res.data.email,
                      phone: "Number of cabin Campers: " + res.data.cabinCampers,
                      comments: "Number of rv Campers: " + res.data.rvCampers
                      }
                  }).then(function successCallback(response) {
                      // this callback will be called asynchronously
                      // when the response is available
                       // console.log(response, 'response')
                       // alert('Your contact form has been submitted')
                      //  $scope.user = response.data[0]
                    }, function errorCallback(response) {
                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
                      alert(response)
                    });
                  // console.log($rootScope.user, "during callback")
                });
            }
            this.stripeCallback = function (code, result) {
              if (result.error) {
                window.alert('Your card failed to process because: ' + result.error.message);
              } else {
                 // console.log($rootScope.user.total, '$rootScope.user.total~~~~~~~~~~')
                window.alert('Your card has been successfully charged  $' + $rootScope.user.total);
                $('#checkoutmodal').modal('hide');
                $http({
                    method: 'POST',
                    url: 'https://bandcamp.cc/api/charge/',
                    data: {
                      email: $rootScope.user.email,
                      stripeToken: result.id,
                      amount: $rootScope.user.total
                    }
                  }).then(function successCallback(response) {
                      // this callback will be called asynchronously
                      // when the response is available
                      // console.log(response, 'charge response~~~~~~~~~')
                      if (response.data.paid) {
                        $rootScope.handleCheckout(response.data.source, response.data.id)
                        // $location.path('/profile')
                      }
                    }, function errorCallback(response) {
                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
                    })
                }
            }.bind(this);
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

    // $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');

})
