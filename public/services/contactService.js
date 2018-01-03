angular.module('main-app')

.service('contactService', function($http, $location) {
  this.formChange = function () {
    // console.log('Form is changing')
  }
  this.submitForm = function(params) {
    // console.log('Params', params)
    $http({
      method: 'GET',
      url: 'https://bandcamp.cc/api/send/',
      params: {
        firstName: params.firstName,
        lastName: params.lastName,
        city: params.city,
        state: params.state,
        email: params.email,
        phone: params.phone,
        comments: params.comments
        }
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
         // console.log(response, 'response')
         alert('Your contact form has been submitted')
         $location.path('/')
        //  $scope.user = response.data[0]
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert(response)
      });
  }
})
