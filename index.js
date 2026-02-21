import accounts from "./account/accounts.js";
//DOM elements pomereni u poseban fajl i exportovani.
let currentAccount;

accounts.forEach(function (account) {
  const initials = account.owner.toLowerCase().split(" ");
  let username = "";

  initials.forEach(function (word) {
    username += word[0];
  });

  account.username = username;
});

//napravi neki stejt user i u njega da imam balance, movements,

let userState = {
  balance: 0,
  movements: [],
};

function calculateBalance(account) {
  account.movements.forEach(function (movement) {
    total += movement;
  });

  return total;
}

function renderBalance() {
  const balance = calculateBalance(currentAccount);
  DOM.totalBalance.textContent = balance + " €";
}

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

//login //listener
DOM.loginBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const enteredUser = DOM.inputUser.value.toLowerCase();
  const enteredPin = Number(DOM.inputPin.value);

  const activeUser = accounts.find(function (account) {
    return (
      account.username === enteredUser &&
      account.pin === enteredPin &&
      !account.disabled
    );
  });

  if (activeUser) {
    currentAccount = activeUser;

    DOM.navBar.classList.add("hidden");
    DOM.dashboard.classList.remove("hidden");

    renderTransactions();
    renderBalance();
  } else {
    console.log("wrong username or pin");
  }

  DOM.inputUser.value = "";
  DOM.inputPin.value = "";
});
//transf. novca
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
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    renderTransactions();
    renderBalance();
  }

  DOM.transferTo.value = "";
  DOM.transferAmount.value = "";
});

DOM.closeBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (!currentAccount) return;

  const enteredUser = DOM.closeUser.value;
  const enteredPin = Number(DOM.closePin.value);

  if (
    enteredUser === currentAccount.username &&
    enteredPin === currentAccount.pin
  ) {
    DOM.modal.classList.remove("hidden");
  }

  DOM.closeUser.value = "";
  DOM.closePin.value = "";
});

DOM.confirmYes.addEventListener("click", function () {
  if (!currentAccount) return;
  //current account = null; kad obrisem account - izbrisan je iz array

  //loan , do 10,000$
  currentAccount.disabled = true;

  DOM.modal.classList.add("hidden");
  DOM.dashboard.classList.add("hidden");
  DOM.navBar.classList.remove("hidden");

  currentAccount = null;
});

DOM.confirmNo.addEventListener("click", function () {
  DOM.modal.classList.add("hidden");
});
