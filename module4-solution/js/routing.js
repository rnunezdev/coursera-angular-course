(function () {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home',{
      url: '/',
      templateUrl: 'templates/home.template.html'
    })
    .state('categories',{
      url: '/categories',
      controller: 'CategoriesController as controller',
      templateUrl: 'templates/categories.template.html',
      resolve: {
         items: ['MenuDataService', function (MenuDataService) {
           return MenuDataService.getAllCategories();
         }]
       }
    })
    .state('details', {
      url: '/details/{itemId}',
      controller: 'ItemsController as itemscontroller',
      templateUrl: 'templates/details.template.html',
      resolve: {
        items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.itemId);
            }]
       }
    });
  }
})();
