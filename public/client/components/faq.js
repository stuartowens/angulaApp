angular.module('main-app')
.directive('faq', function() {
  return {
    scope: {
      faq: '<',
      faqs: '<'
    },
    restrict: 'E',
    controller: function(faqService, $rootScope){
      faqService.dataCompile(this)
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/faq.html'
  };
});
