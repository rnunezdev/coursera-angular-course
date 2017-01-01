(function () {
"use strict";

angular.module('admin')
.controller('SignupController', SignupController);

SignupController.$inject = ['$http', 'ApiPath', 'SignupService']
function SignupController($http, ApiPath, SignupService) {
  var controller = this;
  controller.showform = true;

  controller.submit = function () {
    return $http.get(ApiPath + '/menu_items/'+ controller.user.favoritedish + '.json').then(function (response) {
      controller.showform = false;
      controller.showsuccess = true;
      SignupService.save(controller.user);
      return response.data;
    }).catch(function () {
      controller.message = true;
    });
  }
}


})();
