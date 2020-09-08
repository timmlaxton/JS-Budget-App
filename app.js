
// Budget Controller
let budgetController = (function() {
  

})();


// UI Controller
let UIController = (function(){

    let DOMstrings = {
      inputType: '.add__type',
      inputDescription: '.add__description',
      inputValue: '.add__value',
      inputBtn: '.add__btn'
    }

  return {
      getInput: function() {
          return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value
          };
      },

      getDOMstrings: function() {
        return DOMstrings;
      }
  };

})();



// Global App controller
let controller = (function(budgetCtrl, UICtrl){

  let DOM = UICtrl.getDOMstrings();

    let ctrlAddItem = function() {

  // 1. Get the field input data
  let input = UICtrl.getInput();
  console.log(input);
  // 2 . Add the item to the budget controller
  // 3 . Add the item to the UI
  // 4 . Calulate the budget
  // 5 . Display the budget on the UI

      

    }

      document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
   
      document.addEventListener('keypress', function(e) {
          
        if (e.keyCode === 13 ) {
            ctrlAddItem();
          }
    });

  

})(budgetController, UIController);