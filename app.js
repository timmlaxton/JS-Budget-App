
// Budget Controller
let budgetController = (function() {
  
    let Expense = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };

    let Income = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };

    let allExpenses = [];
    let allIncomes = [];
    let totalExpenses = 0;

    let data = {
      allItems: {
        exp: [],
        inc: []

      },
      totals: {
        exp: 0,
        inc: 0
      }

      
      
    };
    

    return {
      addItem: function(type, des, val) {
        var newItem, ID;

        // Create new ID
        if (data.allItems[type].length > 0) {
          ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        } else {
          ID = 0;
        }

          // Create new item based on 'inc' or 'exp' type
          if (type === 'exp') {
            newItem = new Expense(ID, des, val);
          } else if (type === 'inc') {
            newItem = new Income(ID, des, val);
          }
          
          // Push it into our data structure
          data.allItems[type].push(newItem);

          // Return the new element
          return newItem;
      },

      testing: function() {
        console.log(data);
      
      }
    };

})();



// UI Controller
let UIController = (function(){

    let DOMstrings = {
      inputType: '.add__type',
      inputDescription: '.add__description',
      inputValue: '.add__value',
      inputBtn: '.add__btn',
      incomeContainer: '.income__list',
      expensesContainer: '.expenses__list',
    }

  return {
      getInput: function() {
          return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: parseFloat(document.querySelector(DOMstrings.inputValue).value) 
          };
      },

      addListItem : function(obj, type) {
        let html, newHtml, element;
        // Create HTML string with placeholder text
        if (type === 'inc') {
          element = DOMstrings.incomeContainer;

          html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        } else if (type === 'exp') {
          element = DOMstrings.expensesContainer;

          html =  '<div class="item clearfix" id="expense-%id&"><divclass="item__description">%description%</divclass=><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';
        }                   
                           
                        
        // Replace the placeholder text with data
        newHtml = html.replace('%id%', obj.id)
        newHtml = newHtml.replace('%description%', obj.description)
        newHtml = newHtml.replace('%value%', obj.value)

        // Insert HTML into DOM
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
      },

      clearFields: function() {
        var fields, fieldsArr;

          fields = document.querySelectorAll(DOMstrings.inputDescription + ',  ' + DOMstrings.inputValue);

          var fieldsArr = Array.prototype.slice.call(fields);

          fieldsArr.forEach(function(current, index, array) {
              current.value = "";
          });

          fieldsArr[0].focus();
      },

      getDOMstrings: function() {
        return DOMstrings;
      }
  };

})();



// Global App controller
let controller = (function(budgetCtrl, UICtrl){

  let setupEventListeners = function() {
    let DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
   
    document.addEventListener('keypress', function(e) {
        
      if (e.keyCode === 13 ) {
          ctrlAddItem();
        }
      });
  };

  
    let updateBudget = function() {

      // 1. Calculate the budget
      
      // 2. Return the budget
      
      // 3. Display the budget on the UI

    }

    let ctrlAddItem = function() {
      let input, newItem

      // 1. Get the field input data
     input = UICtrl.getInput();
      
     if(input.description !== "" && !isNaN(input.value) && input.value > 0) {

       // 2 . Add the item to the budget controller
     newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      
     // 3 . Add the item to the UI
     UICtrl.addListItem(newItem, input.type);

     // 4 . Clear all fileds
     UICtrl.clearFields()
     
     // 5. Calculate and update budget
     updateBudget();
     
      }
     
    };

    return {
      init: function() {
          console.log('Application has started');
          setupEventListeners();
      }
    };

})(budgetController, UIController);

controller.init();