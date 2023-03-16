var totalPrice = 0;
var maxToppings = 3;

const pizzaForm = document.querySelector('#form-pizza');
const amountBox = document.querySelector("#total_amt");
const crustRB = document.querySelectorAll('input[name="crust"]');
const sizeRB = document.querySelectorAll('input[name="size"]');
const sauceRB = document.querySelectorAll('input[name="sauce"]');
const cheeseCB = document.querySelector('#cheese');
const toppingsCB = document.querySelectorAll('input[name="toppings"]');

crustRB.forEach(radio => radio.addEventListener('change', () => getTotal()));
sizeRB.forEach(radio => radio.addEventListener('change', () => getTotal()));
sauceRB.forEach(radio => radio.addEventListener('change', () => getTotal()));
cheeseCB.addEventListener('change', function() { getTotal() });
toppingsCB.forEach(checkbox => checkbox.addEventListener('change', () => {
  checkToppingNum(maxToppings);
  getTotal();
}));
pizzaForm.addEventListener('submit', event => {
  if (getCrustPrice() && getSizePrice() && getSaucePrice())
    OrderMessage("Your yummy pizza is on the way!")
  else
  {
    event.preventDefault();
    OrderMessage("Your pizza is not complete!");
  }
});

amountBox.value = 0;

function getCrustPrice() {
  let selectedCrust;
  for (const rb of crustRB) {
    if (rb.checked) {
      selectedCrust = rb.value;
      break;
    }
  }
  let price = 0;
  if (selectedCrust === "thin") 
    price = 5;
  else if (selectedCrust === "regular")
    price = 6;
  else if(selectedCrust === "deep")
    price = 7;
  else
    price = 0;
  return price;
}

function getSizePrice() {
  let selectedSize;
  for (const rb of sizeRB) {
    if (rb.checked) {
      selectedSize = rb.value;
      break;
    }
  }
  let price = 0;
  if (selectedSize === "small") 
    price = 3;
  else if (selectedSize === "medium")
    price = 4;
  else if(selectedSize === "large")
    price = 5;
  else
    price = 0;
  return price;
}

function getSaucePrice() {
  let selectedSauce;
  for (const rb of sauceRB) {
    if (rb.checked) {
      selectedSauce = rb.value;
      break;
    }
  }
  let price = 0;
  if (selectedSauce === "red") 
    price = 1;
  else if (selectedSauce === "white")
    price = 2;
  else if(selectedSauce === "green")
    price = 3;
  else
    price = 0;
  return price;
}

function getCheesePrice() {
  let price = 0;
  if (cheeseCB.checked) 
    price = 2;
  return price;
}

function checkToppingNum(num) {
  let count = 0
  for (const cb of toppingsCB) {
    if (cb.checked) {
      count += 1;
    }
  }
  if (count === num) {
    for (const cb of toppingsCB) {
      if (cb.checked === false) {
        cb.disabled = true;
      }
    }
  }
  else {
    for (const cb of toppingsCB) {
      cb.disabled = false;
    }
  }
}

function getToppingPrice() {
  let price = 0;
  for (const cb of toppingsCB) {
    if (cb.checked) {
      price += 1;
    }
  }
  return price;
}

function getTotal() {
  total = getCrustPrice() + getSizePrice() + getSaucePrice() + getCheesePrice() + getToppingPrice();
  amountBox.value = total;
}

function OrderMessage(str) {
  alert(str);
}