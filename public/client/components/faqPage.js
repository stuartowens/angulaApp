angular.module('main-app')
.directive('faqPage', function() {
  return {
    scope: {},
    restrict: 'E',
    controller: function() {

    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/faq-page.html'
  };
});
