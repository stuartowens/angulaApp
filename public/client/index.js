
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
faqData = [
  {
    question: 'Question 1',
    answer: 'Answer1',
    heading_id: "headingThree",
    collapse_id: "collapseThree",
    href_id: "#collapseThree",
    number: "Three"
  },
  {
    question: 'Question 2',
    answer: 'Answer2',
    _id: "Two",
    heading_id: "headingFour",
    collapse_id: "collapseFour",
    href_id: "#collapseFour",
    number: "Four"
  },
]

angular.module('main-app', ['ngRoute'])
.controller('MainCtrl', function($scope, $rootScope, $http, faqService) {
  $http({
    method: 'GET',
    url: '/getUser'
  }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
       console.log(response.data[0], 'userData')
       $scope.user = response.data[0]
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
    // this.faqs = faqServive.dataCompile()
    // this.faqs = faqData;

  console.log($scope.user)
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
        .when('/faq', {
          controller: function(faqService) {
            // $('.collapse').on('show.bs.collapse', function() {
            //   console.log('collapsed')
            //   myStyle={color:'red'}
            // })
            // this.faqs = faqData;
            this.faqs = faqService.dataCompile()
          },
          templateUrl: 'public/client/templates/faq-page.html',
          controllerAs: 'ctrl'
          // hideMenus: true
        })
        .when('/registration', {
          controller: function($scope) {
            $scope.user = userData;
            $scope.handleClick = function() {
              console.log("You made it!", $scope.user)
            }
          },
          templateUrl: 'public/client/templates/registration.html',
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
        .when('/profile', {
          controller: 'MainCtrl',
          templateUrl: 'public/client/templates/profile.html',
          controllerAs: 'ctrl',
          secure: 'true'
          // hideMenus: true
        })
        .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
})
