angular.module('main-app')

.service('stripeService', function($scope, $http, $rootScope, $location, signinService) {
  this.handleCheckout = function (address, token) {
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
            lastName: "Amount charged: $" + res.data.amt_paid,
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
             alert('Your payment has been processed, please fill out the camper profiles for each participant')
            //  $scope.user = response.data[0]
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert(response)
          });
        // console.log($rootScope.user, "during callback")
      });
  }
})
