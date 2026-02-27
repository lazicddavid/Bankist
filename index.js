import accounts from "./account/accounts.js";
//DOM elements pomereni u poseban fajl.
import DOM from "./constants.js";

accounts.forEach(function (account) {
  const initials = account.owner.toLowerCase().split(" ");
  let username = "";

  initials.forEach(function (word) {
    username += word[0];
  });

  account.username = username;
});

//napravljen state.

let userState = {
  currentAccount: null,
  isSortedAscending: false,
  getBalance: function () {
    if (!this.currentAccount) return 0;

    return this.currentAccount.movements.reduce(function (
      totalBalance,
      movement,
    ) {
      return totalBalance + movement;
    }, 0);
  },
};

//pozdrav poruka.u hederu
function renderGreeting() {
  if (!userState.currentAccount) return;

  const currentHour = new Date().getHours();
  let greetingText = "";

  if (currentHour < 12) {
    greetingText = "Good morning";
  } else if (currentHour < 18) {
    greetingText = "Good afternoon";
  } else {
    greetingText = "Good evening";
  }

  DOM.welcomeMessage.textContent =
    greetingText + ", " + userState.currentAccount.owner;
}

function renderBalance() {
  DOM.totalBalance.textContent = userState.getBalance() + " €";
}

function renderTransactions() {
  if (!userState.currentAccount) return;

  DOM.transactionList.innerHTML = "";

  let movements = userState.currentAccount.movements.slice();

  if (userState.isSortedAscending) {
    movements.sort(function (a, b) {
      return a - b;
    });
  } else {
    movements.sort(function (a, b) {
      return b - a;
    });
  }
  movements.forEach(function (movement, index) {
    const type = movement > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movement">
        <div class="movement-type ${type}">
          ${movements.length - index} ${type}
        </div>
        <div class="movement-date">12/03/2020</div>
        <div class="movement-amount">${movement} €</div>
      </div>
    `;
    DOM.transactionList.insertAdjacentHTML("beforeend", html);
  });
}

function renderSummary() {
  if (!userState.currentAccount) return;

  const movements = userState.currentAccount.movements;

  const moneyIn = movements
    .filter(function (movement) {
      return movement > 0;
    })
    .reduce(function (total, movement) {
      return total + movement;
    }, 0);

  const moneyOut = movements
    .filter(function (movement) {
      return movement < 0;
    })
    .reduce(function (total, movement) {
      return total + movement;
    }, 0);

  DOM.moneyIn.textContent = moneyIn + " €";
  DOM.moneyOut.textContent = Math.abs(moneyOut) + " €";
}

//login //listener
DOM.loginBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const enteredUsername = DOM.inputUser.value.toLowerCase();
  const enteredPin = Number(DOM.inputPin.value);

  userState.currentAccount = accounts.find(function (account) {
    return (
      account.username === enteredUsername &&
      account.pin === enteredPin &&
      !account.disabled
    );
  });

  if (userState.currentAccount) {
    DOM.navBar.classList.add("hidden");
    DOM.dashboard.classList.remove("hidden");

    renderGreeting();
    renderCurrentDateTime();

    renderTransactions();
    renderBalance();
    renderSummary();
  }

  DOM.inputUser.value = "";
  DOM.inputPin.value = "";
});

//transf. novca
DOM.transferBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (!userState.currentAccount) return;

  const receiverUsername = DOM.transferTo.value.toLowerCase();
  const transferAmount = Number(DOM.transferAmount.value);

  const receiverAccount = accounts.find(function (account) {
    return account.username === receiverUsername;
  });

  if (
    receiverAccount &&
    receiverAccount.username !== userState.currentAccount.username &&
    transferAmount > 0 &&
    transferAmount <= 10000 &&
    userState.getBalance() >= transferAmount
  ) {
    userState.currentAccount.movements.push(-transferAmount);

    receiverAccount.movements.push(transferAmount);

    renderTransactions();
    renderBalance();
    renderSummary();
  }

  DOM.transferTo.value = "";
  DOM.transferAmount.value = "";
});

function renderCurrentDateTime() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const formattedDateTime =
    day + "/" + month + "/" + year + ", " + hours + ":" + minutes;

  DOM.currentDate.textContent = "As of " + formattedDateTime;
}

DOM.closeBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (!userState.currentAccount) return;

  const enteredUser = DOM.closeUser.value;
  const enteredPin = Number(DOM.closePin.value);

  if (
    enteredUser === userState.currentAccount.username &&
    enteredPin === userState.currentAccount.pin
  ) {
    DOM.modal.classList.remove("hidden");
  }

  DOM.closeUser.value = "";
  DOM.closePin.value = "";
});

DOM.confirmYes.addEventListener("click", function () {
  if (!userState.currentAccount) return;

  // kad obrisem account - izbrisan je iz array

  const index = accounts.findIndex(function (account) {
    return account.username === userState.currentAccount.username;
  });

  accounts.splice(index, 1);

  DOM.modal.classList.add("hidden");
  DOM.dashboard.classList.add("hidden");
  DOM.navBar.classList.remove("hidden");
  userState.currentAccount = null;
});

//loan , do 10,000$
DOM.loanBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (!userState.currentAccount) return;

  const enteredAmount = Number(DOM.loanAmount.value);

  if (enteredAmount > 0 && enteredAmount <= 10000) {
    userState.currentAccount.movements.push(enteredAmount);

    renderTransactions();
    renderBalance();
    renderSummary();
  }

  DOM.loanAmount.value = "";
});

DOM.lowestBtn.addEventListener("click", function () {
  userState.isSortedAscending = true;
  renderTransactions();
});

DOM.highestBtn.addEventListener("click", function () {
  userState.isSortedAscending = false;
  renderTransactions();
});

DOM.logoutBtn.addEventListener("click", function () {
  userState.currentAccount = null;
  userState.isSortedAscending = false;

  DOM.dashboard.classList.add("hidden");
  DOM.navBar.classList.remove("hidden");
});

const acc = accounts[0];
console.log("acc", acc);
console.log("accounts", accounts);

acc.owner = "David Lazic";
console.log("--------------");
console.log("acc", acc);
console.log("accounts", accounts);

//napravi da se pojavljuju notifikacije u sledecem slucaju:
//error notifikacija ako je pogresan username ili password (invalid credentials)
//error nofitifkacija ako je username ne postoji (accounnt not found)
//error nofitifikacija ako stavim transfer ka accoun-u koji ne postoji (account not found)
//error nofitifikacija ako radim transfer vise nego sto imam para(can not make transfer)
//uspesna notifikacija kad uspesno posaljem transfer
//uspesna notifikacija kad uspesno uzmem kredit
//error notifikacija ako uzimam vise od 10,000 $
