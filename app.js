var app = angular.module('plunker', ['ui.select', 'ngSanitize']);

app.controller('MainCtrl', function() {
  var vm = this;
  vm.name = 'World';
  vm.tables = [{
    id: 1,
    description: 'Front'
  }, {
    id: 2,
    description: 'Back'
  }];
  vm.drinksList = [ {
    id: 1,
    description: 'Cola'
  }, {
    id: 2,
    description: 'Water'
  }];
  vm.order = {};
  
  vm.refreshResults = refreshResults;
  vm.clear = clear;
  
  function refreshResults($select){
    var search = $select.search,
      list = angular.copy($select.items),
      FLAG = -1;
    //remove last user input
    list = list.filter(function(item) { 
      return item.id !== FLAG; 
    });
  
    if (!search) {
      //use the predefined list
      $select.items = list;
    }
    else {
      //manually add user input and set selection
      var userInputItem = {
        id: FLAG, 
        description: search
      };
      $select.items = [userInputItem].concat(list);
      $select.selected = userInputItem;
    }
  }
  
  function clear($event, $select){
    $event.stopPropagation(); 
    //to allow empty field, in order to force a selection remove the following line
    $select.selected = undefined;
    //reset search query
    $select.search = undefined;
    //focus and open dropdown
    $select.activate();
  }
});
