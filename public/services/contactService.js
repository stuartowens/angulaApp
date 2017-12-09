angular.module('main-app')

.service('contactService', function($http, $location) {
  this.submitForm = function(e) {
    console.log('this is submitting', e)
  }
})
