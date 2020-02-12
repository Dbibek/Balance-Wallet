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
const clear = document.querySelector(".clear");
// const deleteButton=document.querySelector('.delete')
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
//arrays that have arguments
let incomes = [
  {
    description: "salary",
    amount: 10000,
    date: currentDate()
  }
];
let expenses = [
  {
    description: "Rent",
    amount: 700,
    date: currentDate()
  }
];

//===============CREATING FUNCTION THAT HAVE THE DESIRED DATE FORMAT e.g Feb 11, 2020 19:20===
function currentDate() {
  const now = new Date();
  const year = now.getFullYear(); // return year
  const mnth = months[now.getMonth()]; // return month(0 - 11) //here now.getMonth() gives you the current date in number as incex for the month
  const date = now.getDate(); // return date (1 - 31)
  const hours = now.getHours(); // return number (0 - 23)
  const minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes(); // return number (0 -59)

  const time = `${mnth} ${date}, ${year} ${hours}:${minutes}`;
  return time;
}
//=============PURE FUNCTION THAT TAKES ARRAY,DESCRIPTION AND AMOUNT========

// let addTransaction = (arr, description, amount) => {
//   arr.push({
//     description,
//     amount
//   });
// };

//========LOCALSTORAGE===============

const getAccount1 = JSON.parse(localStorage.getItem("incomeInfo"));
const getAccount2 = JSON.parse(localStorage.getItem("expenseInfo"));

if (!getAccount1) {
  localStorage.setItem("incomeInfo", JSON.stringify(incomes)); //get items if getAccount is empty
} else {
  const getAccount1 = JSON.parse(localStorage.getItem("incomeInfo"));
  incomes = getAccount1;
}

if (!getAccount2) {
  localStorage.setItem("expenseInfo", JSON.stringify(expenses)); //get items if getAccount is empty
} else {
  const getAccount2 = JSON.parse(localStorage.getItem("expenseInfo")); //if not empty it gets from local storage
  expenses = getAccount2;
}

//===================gives initial data to the DOM===============
function initial() {
  for (const element of incomes) {
    //checks all the incomes and display
    //for getting the incomes element
    const list = document.createElement("li");
    list.innerHTML += `<div class='list-div'>
    <div class="trans-description">${element.description}</div>
        <div class="trans-amount">${element.amount.toLocaleString()}€</div>
        <div class="trans-date">${element.date}</div>
        <span onclick="this.parentNode.style.display = 'none';" class="closebtn"><i class="far fa-trash-alt delete-icon"></i></span>
         </div> `;
    transactionIncomeDiv.appendChild(list);
  }
  for (const element of expenses) {
    //checks all the expense and display
    // for getting the expences element
    const list = document.createElement("li");
    list.innerHTML += `<div class='list-div'>
    <div class="trans-description">${element.description}</div>
    <div class="trans-amount">${element.amount.toLocaleString()}€</div>
    <div class="trans-date">${element.date}</div>
    <span onclick="this.parentNode.style.display = 'none';" class="closebtn"><i class="far fa-trash-alt delete-icon"></i></span>
    </div> `;

    transactionExpenseDiv.appendChild(list);
  }
  accountBalance(); // display account balance initally form the default income and expenses
  balanceDiv.innerHTML = "";
  balanceDiv.innerHTML += `<h2>your account Balance is ${accountBalance()}€</h2>`;
}
initial();

// ================FUNCTION  FOR THE MATHEMATICAL CALCULATION================================

function totalIncome() {
  //FUNCTION THAT CALCULATES ALL THE INCOMES
  const total = incomes.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
  return total;
}

function totalExpense() {
  //FUNCTION THAT CALCULATES ALL THE EXPENSE
  let expTotal = expenses.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
  return expTotal;
}
function accountBalance() {
  //CALCULATE THE BALANCE i.e INCOMES -EXPENSES
  const balance = totalIncome() - totalExpense();
  return balance;
}
accountBalance();

//==============FOR DESPLYING DEFULT ARRAY ITEMS IN INCOMES AND EXPENSE ARRAY====

addButton.addEventListener("click", () => {
  let description = descriptionInput.value;
  let amount = parseInt(amountInput.value);
  //   addTransaction(incomes, description, amount); USED IF THE PURE FUNCTION WAS USED

  if (description && amount && selection.value == "income") {
    //addTransaction(incomes, description, amount);
    incomes.push({ description, amount, date: currentDate() }); //PUSHING IT TO THE ARRAY
    localStorage.setItem("incomeInfo", JSON.stringify(incomes)); //PUSHING IT TO LOCALSTORAGE
    transactionIncomeDiv.innerHTML = "";
    console.log(incomes);
    for (const element of incomes) {
      const list = document.createElement("li");
      list.innerHTML += `<div class='list-div'>
      <div class="trans-description">${element.description}</div>
      
      <div class="trans-amount">${element.amount.toLocaleString()}€</div>
      <div class="trans-date">${element.date}</div>
      <span onclick="this.parentNode.style.display = 'none';" class="closebtn"><i class="far fa-trash-alt delete-icon"></i></span>
      </div> `;

      transactionIncomeDiv.appendChild(list);
    }
  } else if (description && amount && selection.value == "expense") {
    //addTransaction(expenses, description, amount);
    expenses.push({ description, amount, date: currentDate() }); //PUSHING IT TO THE ARRAY
    localStorage.setItem("expenseInfo", JSON.stringify(expenses)); //PUSHING IT TO LOCALSTORAGE
    transactionExpenseDiv.innerHTML = "";
    for (const element of expenses) {
      const list = document.createElement("li");
      list.innerHTML += `<div class='list-div'>
      <div class="trans-description">${element.description}</div>
      <div class="trans-amount">${element.amount.toLocaleString()}€</div>
      <div class="trans-date">${element.date}</div>
      <span onclick="this.parentNode.style.display = 'none';" class="closebtn"><i class="far fa-trash-alt delete-icon"></i></span>
      </div>
       `;
      transactionExpenseDiv.appendChild(list);
    }
  } else {
    inputSection.innerHTML += `<h1>please enter correct description and ammount</h1>`;
  }

  accountBalance();
  balanceDiv.innerHTML = "";
  balanceDiv.innerHTML += `<h2>your account Balance is ${accountBalance()}€</h2>`;
});

///=========EVENTLISTNERS FOR CLEAR LOCALSTORAGE=============

clear.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

