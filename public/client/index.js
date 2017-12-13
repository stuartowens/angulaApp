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
        .when('/pricing', {
          controller: function(faqService) {
            // $('.collapse').on('show.bs.collapse', function() {
            //   console.log('collapsed')
            //   myStyle={color:'red'}
            // })
            // this.faqs = faqData;
            this.faqs = faqService.dataCompile()
          },
          templateUrl: 'public/client/templates/pricing.html',
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
              firstName: 'empty.value',
              lastName: 'empty.avlue',
              city: 'empty',
              state: 'empty',
              email: 'empty',
              phone: 'empty',
              comments: 'empty'
            })
            this.formChange = contactService.formChange()
           //using this insted of form change but i think instead of using local scope i might use the rootscope instead because thb $scope keeps reseting more than likely due to the prevent default not eworking vorrectly
            this.onChange = function(eventValue, id) {
              Object.assign($scope, {
                id: eventValue,
              })
              console.log('something is changing!!', eventValue, id, $scope.id)
            }
            this.submitForm = contactService.submitForm($scope);
          },
          templateUrl: 'public/client/templates/contact.html',
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
