import accounts from "./account/accounts.js";

const DOM = {
  loginBtn: document.querySelector(".login-btn"),
  navBar: document.querySelector(".nav-bar"),
  dashboard: document.querySelector(".layout-dashboard"),
  inputUser: document.querySelector(".login-user"),
  inputPin: document.querySelector(".login-pin"),
  transferBtn: document.querySelector(".transfer-btn"),
  transferTo: document.querySelector(".transfer-to"),
  transferAmount: document.querySelector(".transfer-amount"),
  transactionList: document.querySelector(".transactions"),
};
let currentAccount;

accounts.forEach(function (account) {
  const initials = account.owner.toLowerCase().split(" ");
  let username = "";

  initials.forEach(function (word) {
    username += word[0];
  });

  account.username = username;
});

function calculateBalance(account) {
  let total = 0;

  account.movements.forEach(function (movement) {
    total += movement;
  });

  return total;
}

//prikaz transakcija
function renderTransactions() {
  DOM.transactionList.innerHTML = "";

  currentAccount.movements.forEach(function (movement, index) {
    const type = movement > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movement">
        <div class="movement-type ${type}">
          ${currentAccount.movements.length - index} ${type}
        </div>
        <div class="movement-date">12/03/2020</div>
        <div class="movement-amount">${movement} €</div>
      </div>
    `;

    DOM.transactionList.insertAdjacentHTML("afterbegin", html);
  });
}

//lis.

DOM.loginBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const enteredUser = DOM.inputUser.value;
  const enteredPin = Number(DOM.inputPin.value);

  const activeUser = accounts.find(function (account) {
    return account.username === enteredUser && account.pin === enteredPin;
  });

  if (activeUser) {
    currentAccount = activeUser;

    DOM.navBar.classList.add("hidden");
    DOM.dashboard.classList.remove("hidden");

    renderTransactions();
  } else {
    console.log("wrong usernaem or pin");
  }

  DOM.inputUser.value = "";
  DOM.inputPin.value = "";
});

DOM.transferBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const receiverUsername = DOM.transferTo.value;
  const amount = Number(DOM.transferAmount.value);

  const receiverAccount = accounts.find(function (account) {
    return account.username === receiverUsername;
  });

  const currentBalance = calculateBalance(currentAccount);

  if (
    receiverAccount &&
    receiverAccount.username !== currentAccount.username &&
    amount > 0 &&
    amount <= 10000 &&
    currentBalance >= amount
  ) {
    // skini novac sa trenutnog naloga
    currentAccount.movements.push(-amount);

    // dodaj novac primaocu
    receiverAccount.movements.push(amount);

    renderTransactions();
  }

  DOM.transferTo.value = "";
  DOM.transferAmount.value = "";
});
