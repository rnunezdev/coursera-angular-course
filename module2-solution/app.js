(function () {
'use strict';

angular.module('ControllerAsApp', [])
.controller('BuyListController', BuyListController)
.controller('BoughtListController', BoughtListController)
.service('ShoppingListService', ShoppingListService);

// LIST #1 - controller
BuyListController.$inject = ['ShoppingListService'];
function BuyListController(ShoppingListService) {
  var buyList = this;
  var service = ShoppingListService;

  buyList.items = service.getShoppingItems();
  buyList.checkOffItem = function (itemIndex) {
    service.checkOffItem(itemIndex);
  }


}

// LIST #2 - controller
BoughtListController.$inject = ['ShoppingListService'];
function BoughtListController(ShoppingListService) {
  var boughtList = this;
  var service = ShoppingListService;

  boughtList.items = service.getBoughtItems();
}


function ShoppingListService() {
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

  service.getShoppingItems = function () {
    return shoppingItems;
  };
  service.getBoughtItems = function () {
    return boughtItems;
  };


}


})();
