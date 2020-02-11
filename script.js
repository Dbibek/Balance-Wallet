const descriptionInput = document.querySelector(".description");
const amountInput = document.querySelector(".amount");
const selection = document.querySelector(".selection");
const addButton = document.querySelector(".add-button");
const account = document.querySelector(".account");
const incomeDiv = document.querySelector(".incomeDiv");
const transactionIncomeDiv = document.querySelector(".transaction-income");
const expenseDiv = document.querySelector(".expenseDiv");
const transactionExpenseDiv = document.querySelector(".transaction-expense");
const inputSection = document.querySelector(".input-section");
const balanceDiv = document.querySelector(".balance");

let incomes = [{
    description:'salary',
    amount:10000
}];
let expenses = [{
    description:'Rent',
    amount:700
}];

//=============PURE FUNCTION THAT TAKES ARRAY,DESCRIPTION AND AMOUNT========

let addTransaction = (arr, description, amount) => {
  arr.push({
    description,
    amount
  });
};
console.log(incomes);

//===================EVENTlISTNER WITH ADD BUTTON THAT TAKES INCOME AND EXPENSE AS THE ARRAY AND TAKES THE INPUT VALUE
//DESCRIPTION AND AMOUNT
addButton.addEventListener("click", () => {
  let description = descriptionInput.value;
  let amount = parseInt(amountInput.value);
  //   addTransaction(incomes, description, amount);
  console.log(incomeDiv);

  console.log(incomes);
  if (description && amount && selection.value == "income") {
    addTransaction(incomes, description, amount);
    transactionIncomeDiv.innerHTML = "";
    for (const element of incomes) {
      const list = document.createElement("li");
      list.innerHTML += `<div class='list-div'>'<div class="trans-description">${
        element.description
      }</div>
      <div class="trans-amount">${element.amount.toLocaleString()}€</div>
      <div class="trans-date">${currentDate()}</div> </div> `;

      transactionIncomeDiv.appendChild(list);
    }
  } else if (description && amount && selection.value == "expense") {
    addTransaction(expenses, description, amount);
    transactionExpenseDiv.innerHTML = "";
    for (const element of expenses) {
      const list = document.createElement("li");
      list.innerHTML += `<div class='list-div'><div class="trans-description">${
        element.description
      }</div>
      <div class="trans-amount">${element.amount.toLocaleString()}€</div>
      <div class="trans-date">${currentDate()}</div></div> `;

      transactionExpenseDiv.appendChild(list);
    }
  } else {
    inputSection.innerHTML += `<h1>please enter correct description and ammount</h1>`;
  }
  
  accountBalance()
  balanceDiv.innerHTML=''
  balanceDiv.innerHTML += `<h2>your account Balance is ${accountBalance()}€</h2>`
});

//===============CREATING FUNCTION THAT HAVE THE DESIRED DATE FORMAT e.g Feb 11, 2020 19:20===
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
function currentDate() {
  const now = new Date();
  const year = now.getFullYear(); // return year
  const mnth = months[now.getMonth()]; // return month(0 - 11) //here now.getMonth() gives you the current date in number as incex for the month
  const date = now.getDate(); // return date (1 - 31)
  const hours = now.getHours(); // return number (0 - 23)
  const minutes = now.getMinutes(); // return number (0 -59)

  const time = `${mnth} ${date}, ${year} ${hours}:${minutes}`;
  return time;
}


function totalIncome() {
  const total=incomes.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0)
   return total
}
console.log(totalIncome());

function totalExpense() {
  let expTotal=expenses.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
  return expTotal
}
console.log(totalExpense());
function accountBalance() {
    const balance = totalIncome() - totalExpense();
    return balance;
    ;
  }
//==============FOR DESPLYING DEFULT ARRAY ITEMS IN INCOMES AND EXPENSE ARRAY====

  function initial(){
    for (const element of incomes) {    //for getting the incomes element
        const list = document.createElement("li");
        list.innerHTML += `<div class='list-div'>'<div class="trans-description">${
          element.description
        }</div>
        <div class="trans-amount">${element.amount.toLocaleString()}€</div>
        <div class="trans-date">${currentDate()}</div> </div> `;
        transactionIncomeDiv.appendChild(list);
  }
  for (const element of expenses) {     // for getting the expences element
    const list = document.createElement("li");
    list.innerHTML += `<div class='list-div'><div class="trans-description">${
      element.description
    }</div>
    <div class="trans-amount">${element.amount.toLocaleString()}€</div>
    <div class="trans-date">${currentDate()}</div></div> `;

    transactionExpenseDiv.appendChild(list);
  }
}
  initial()
