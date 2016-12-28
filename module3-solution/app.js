(function () {
'use strict';
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('URL', 'https://davids-restaurant.herokuapp.com/menu_items.json');

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var narrowItDown = this;
  narrowItDown.nothingFoundMessage = "Nothing found";

  narrowItDown.search = function () {
    if (narrowItDown.searchTerm === undefined || !narrowItDown.searchTerm){
      narrowItDown.nothingFoundMessage = "Nothing found";
      narrowItDown.showNothingFoundMessage = true;
      narrowItDown.found = [];
      return;
    }
    var premise = MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm);

    premise.then(function (response) {
      narrowItDown.found = response;
      if (narrowItDown.found.length>0){
        narrowItDown.showNothingFoundMessage = false;
      } else {
        narrowItDown.showNothingFoundMessage = true;
      }
    }).catch(function (response) {
      narrowItDown.showNothingFoundMessage = true;
    });
  }

  narrowItDown.remove = function (index) {
    narrowItDown.found.splice(index,1);
  }
};

MenuSearchService.$inject = ['$http', 'URL', '$q'];
function MenuSearchService($http, URL, $q) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      url: URL
    }).then(function (response) {
      var allDataList = response.data.menu_items;
      var resultantList = [];
      var deferred = $q.defer();

      for (var i = 0; i < allDataList.length; i++) {
        if (allDataList[i].description.length !== 0 && allDataList[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
          resultantList.push(allDataList[i]);
        }
      };
      deferred.resolve(resultantList);
      return deferred.promise;
    });
  };
}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: NarrowItDownDirectiveController,
    bindToController: true,
    controllerAs: 'narrowItDown'    
  }
  return ddo;
};

function NarrowItDownDirectiveController() {
  var narrowItDown = this;
}


})();
