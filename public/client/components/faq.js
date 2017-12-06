angular.module('main-app')
.directive('faq', function() {
  return {
    scope: {
      faq: '<',
      faqs: '<'
    },
    restrict: 'E',
    controller: function(faqService, $rootScope){
      faqService.dataCompile(this);
      faqService.ngStyle = this.ngStyle;
      faqService.ngClick = this.ngClick;
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/faq.html'
  };
});
