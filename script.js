const movementsArr = [];

const datesArr = [];

const descriptionsArr = [];

const receiverArr = [];

const balanceLabel = document.querySelector(".balance");

const transactionsList = document.querySelector(".recent-transactions-list");

const totalIncomeLabel = document.querySelector(".total-income");

const totalExpensesLabel = document.querySelector(".total-expenses");

const btnAddTransaction = document.querySelector(".add-transactions");

const amountInput = document.getElementById("amount");

const descrInput = document.getElementById("description");

const toWhoInput = document.getElementById("to-who");

const transactionTypeInput = document.querySelector(".transaction-type");

<<<<<<< HEAD
const hoverMenu = document.getElementById("hoverMenu");

function formatCurrency(amount) {
  return `${Math.abs(amount.toFixed(2))} лв`;
}

=======
const toggle = document.getElementById("dark-mode-toggle");
const hoverMenu = document.getElementById("hoverMenu");

if (localStorage.getItem("dark-mode") === "enabled") {
  document.body.classList.add("dark-mode");
  toggle.checked = true;
}

toggle.addEventListener("change", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("dark-mode", "enabled");
  } else {
    localStorage.setItem("dark-mode", "disabled");
  }
});

function formatCurrency(amount) {
  return `${Math.abs(amount.toFixed(2))} лв`;
}
>>>>>>> 8db306b643fbfc39dc2ea29c5e8abd1569c36762
function formatDate(dateString) {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return new Date(dateString).toLocaleDateString("de-DE", options);
}

function updateIncome() {
  const totalIncome = movementsArr
    .filter(function (mov) {
      return mov > 0;
    })
    .reduce(function (acc, mov) {
      return (acc += mov);
    }, 0);
  totalIncomeLabel.textContent = `Income: ${totalIncome.toFixed(2)} лв`;
<<<<<<< HEAD
  totalIncomeLabel.style.backgroundColor = "#256D36";
  totalIncomeLabel.style.borderRadius = "1rem";
  totalIncomeLabel.style.fontWeight = "bold";
  totalIncomeLabel.style.color = "white";
=======
  totalIncomeLabel.style.backgroundColor = "rgb(52, 143, 66, 50%)";
  totalIncomeLabel.style.borderRadius = "1rem";
  totalIncomeLabel.style.fontWeight = "bold";
>>>>>>> 8db306b643fbfc39dc2ea29c5e8abd1569c36762
}

function updateExpenses() {
  const totalExpenses = movementsArr
    .filter(function (mov) {
      return mov < 0;
    })
    .reduce(function (acc, mov) {
      return (acc += mov);
    }, 0);
  totalExpensesLabel.textContent = `Expenses: ${Math.abs(
    totalExpenses.toFixed(2)
  )} лв.`;
<<<<<<< HEAD

  totalExpensesLabel.style.backgroundColor = "#A73535";
  totalExpensesLabel.style.borderRadius = "1rem";
  totalExpensesLabel.style.fontWeight = "bold";
  totalExpensesLabel.style.color = "white";
=======
  // totalExpensesLabel.style.padding = "1rem";
  totalExpensesLabel.style.backgroundColor = "rgb(199,71,71, 50%)";
  totalExpensesLabel.style.borderRadius = "1rem";
  totalExpensesLabel.style.fontWeight = "bold";
>>>>>>> 8db306b643fbfc39dc2ea29c5e8abd1569c36762
}

function updateBalance() {
  const totalBal = movementsArr.reduce(function (acc, mov) {
    return (acc += mov);
  });
  balanceLabel.textContent = `Balance: ${totalBal.toFixed(2)} лв`;
<<<<<<< HEAD
  balanceLabel.style.borderRadius = "1rem";
  balanceLabel.style.backgroundColor = "#2A4F7C";
  balanceLabel.style.color = "white";
=======
>>>>>>> 8db306b643fbfc39dc2ea29c5e8abd1569c36762
}

function displayMovements() {
  transactionsList.innerHTML = "";

  const transactions = movementsArr.map((movement, index) => ({
    amount: movement,
    date: new Date(datesArr[index]),
    description: descriptionsArr[index],
    receiver: receiverArr[index],
  }));

  transactions.sort((b, a) => a.date - b.date);

  transactions.forEach(function (movement) {
    const listItem = document.createElement("li");
    listItem.textContent = `${formatDate(movement.date)} - ${
      movement.description
    } - ${movement.receiver} - ${formatCurrency(movement.amount)}`;

    listItem.style.padding = "1rem";
    listItem.style.margin = "1rem";
    listItem.style.borderRadius = "1rem";
    listItem.style.fontWeight = "bold";
    listItem.style.textAlign = "center";

    if (movement.amount < 0) {
<<<<<<< HEAD
      listItem.style.backgroundColor = "#A73535";

      listItem.style.color = "white";
    } else {
      listItem.style.backgroundColor = "#256D36";
=======
      listItem.style.backgroundColor = "rgb(199, 71, 71,85%)";

      listItem.style.color = "white";
    } else {
      listItem.style.backgroundColor = "rgb(52, 143, 66,75%)";
>>>>>>> 8db306b643fbfc39dc2ea29c5e8abd1569c36762
      listItem.style.color = "white";
    }

    transactionsList.appendChild(listItem);
  });
}

function saveToStorage() {
  localStorage.setItem("movementsArr", JSON.stringify(movementsArr));
  localStorage.setItem("datesArr", JSON.stringify(datesArr));
  localStorage.setItem("descriptionsArr", JSON.stringify(descriptionsArr));
  localStorage.setItem("receiverArr", JSON.stringify(receiverArr));
}

function loadFromStorage() {
  const savedMovements = JSON.parse(localStorage.getItem("movementsArr"));
  const savedDates = JSON.parse(localStorage.getItem("datesArr"));
  const savedDescriptions = JSON.parse(localStorage.getItem("descriptionsArr"));
  const savedReceivers = JSON.parse(localStorage.getItem("receiverArr"));

  if (savedMovements) {
    movementsArr.push(...savedMovements);
  }
  if (savedDates) {
    datesArr.push(...savedDates);
  }
  if (savedDescriptions) {
    descriptionsArr.push(...savedDescriptions);
  }
  if (savedReceivers) {
    receiverArr.push(...savedReceivers);
  }
}

loadFromStorage();

btnAddTransaction.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(amountInput.value);
  const description = descrInput.value;
  const toWho = toWhoInput.value;
  const now = new Date();
  const transactionType = transactionTypeInput.value;

  const adjustedAmount =
    transactionType === "expense" ? -Math.abs(amount) : Math.abs(amount);

  movementsArr.push(adjustedAmount);
  datesArr.push(now);
  descriptionsArr.push(description);
  receiverArr.push(toWho);
  saveToStorage();
  amountInput.value = "";
  descrInput.value = "";
  toWhoInput.value = "";
  updateUI();
});

function updateUI() {
  displayMovements();
  updateBalance();
  updateIncome();
  updateExpenses();
}

updateUI();
