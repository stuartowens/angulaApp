angular.module('main-app')

.service('contactService', function($http, $location) {
  this.formChange = function (e) {
    console.log('Form is changing', e)
  }
  this.submitForm = function(params) {
    console.log('Form is submitting', email)
    $http({
      method: 'GET',
      url: '/send',
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
         console.log(response, 'response')
        //  $scope.user = response.data[0]
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert(response)
      });
  }
})
