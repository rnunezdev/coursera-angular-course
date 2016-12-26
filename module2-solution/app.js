(function () {
'use strict';

angular.module('ControllerAsApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// LIST #1 - controller
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buyList = this;

  buyList.items = ShoppingListCheckOffService.getToBuyItems();  
  buyList.checkOffItem = function (itemIndex) {
    ShoppingListCheckOffService.checkOffItem(itemIndex);
  }}

// LIST #2 - controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;
  boughtList.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var shoppingItems = [{name:'Chips',quantity:5},
                      {name:'Coca', quantity:10},
                      {name:'Beer', quantity:20},
                      {name:'Pizza', quantity:1},
                      {name:'Nachos', quantity:2} ];
  // List of bought items
  var boughtItems = [];

  service.checkOffItem = function (itemIndex) {
      var item = shoppingItems[itemIndex];
      boughtItems.push(item);
      service.removeItem(itemIndex);
  };

  service.removeItem = function (itemIndex) {
    shoppingItems.splice(itemIndex, 1);
  };

  service.getToBuyItems = function () {
    return shoppingItems;
  };
  service.getBoughtItems = function () {
    return boughtItems;
  };


}


})();
