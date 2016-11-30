(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.food = "";
  $scope.isTooMuchFoodMsg = "";

  $scope.checkIfTooMuch = function () {
    //var foodTrim = $scope.food.trim();
    if($scope.food != ""){
      var foodSplited = $scope.food.split(",");
      if(foodSplited.length <= 3){
        $scope.isTooMuchFoodMsg = "Enjoy!";
      }else{
        $scope.isTooMuchFoodMsg = "Too much!";
      }
    }else{
      $scope.isTooMuchFoodMsg = "Please enter data first";
    }
  };

}

})();
