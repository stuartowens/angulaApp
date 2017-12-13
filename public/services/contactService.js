angular.module('main-app')

.service('contactService', function($http, $location, $event) {
  //not using this form change to track changes in thr form, instewad using the controller in the index.jd
  this.formChange = function () {
    console.log('Form is changing')
  }
  //using this submit contact form but havi g trouble with the prevent default not preventing the page reload
  this.submitForm = function(params, event) {
    event.preventDefault();
    console.log('Event', event)
    console.log('Params', params)
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
