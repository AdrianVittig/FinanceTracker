const movementsArr = [250, 130, -500, 940, -80, 265, -1.39, 400];

const datesArr = [
  "2024-09-08",
  "2024-10-17",
  "2023-08-15",
  "2024-03-05",
  "2024-05-19",
  "2024-07-03",
  "2023-01-01",
  "2024-10-19",
  "2024-10-30",
];

const balanceLabel = document.querySelector(".balance");

const transactionsList = document.querySelector(".recent-transactions-list");

const totalIncomeLabel = document.querySelector(".total-income");

const totalExpensesLabel = document.querySelector(".total-expenses");

const btnAddTransaction = document.querySelector(".add-transactions");

function formatCurrency(amount) {
  return `${Math.abs(amount.toFixed(2))} лв`;
}
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("bg-BG", options);
}

function updateIncome() {
  const totalIncome = movementsArr
    .filter(function (mov) {
      return mov > 0;
    })
    .reduce(function (acc, mov) {
      return (acc += mov);
    });
  totalIncomeLabel.textContent = `Доходи: ${totalIncome.toFixed(2)} лв`;
}

function updateExpenses() {
  const totalExpenses = movementsArr
    .filter(function (mov) {
      return mov < 0;
    })
    .reduce(function (acc, mov) {
      return (acc += mov);
    });
  totalExpensesLabel.textContent = `Разходи: ${Math.abs(
    totalExpenses.toFixed(2)
  )} лв.`;
}

function updateBalance() {
  const totalBal = movementsArr.reduce(function (acc, mov) {
    return (acc += mov);
  });
  balanceLabel.textContent = `Баланс: ${totalBal.toFixed(2)} лв`;
}
function displayMovements() {
  transactionsList.innerHTML = "";

  const transactions = movementsArr.map((movement, index) => ({
    amount: movement,
    date: new Date(datesArr[index]),
  }));

  transactions.sort((a, b) => a.date - b.date);

  transactions.forEach(function (movement) {
    const listItem = document.createElement("li");
    listItem.textContent = `Дата: ${formatDate(
      movement.date
    )}; Сума: ${formatCurrency(movement.amount)}`;

    listItem.style.padding = "1rem";
    listItem.style.margin = "1rem";
    listItem.style.borderRadius = "1rem";
    listItem.style.fontWeight = "bold";
    listItem.style.textAlign = "center";
    if (movement < 0) {
      listItem.style.backgroundColor = "rgb(199, 71, 71)";

      listItem.style.color = "white";
    } else {
      listItem.style.backgroundColor = "rgb(52, 143, 66)";
      listItem.style.color = "white";
    }

    transactionsList.appendChild(listItem);
  });
}

btnAddTransaction.addEventListener("click", function (e) {
  e.preventDefault();
  const now = new Date();

  movementsArr.push(Math.trunc(Math.random() * 50));
  datesArr.push(now);
  updateUI();
});

function updateUI() {
  displayMovements();
  updateBalance();
  updateIncome();
  updateExpenses();
}

updateUI();
