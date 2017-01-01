(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('admin', {
      absract: true,
      templateUrl: 'src/admin/admin.html'
    })
    .state('admin.signup', {
      url: '/signup',
      templateUrl: 'src/admin/signup/signup.html'
    })
    .state('admin.myinfo', {
      url: '/myinfo',
      templateUrl: 'src/admin/myinfo/myinfo.html',
      controller: 'MyInfoController',
      controllerAs: 'controller',
      resolve: {
        user: ['SignupService', function (SignupService) {
          return SignupService.user;
        }],
        useravailable: ['SignupService', function (SignupService) {
          return SignupService.useravailable;
        }]
      }
    });
}
})();
