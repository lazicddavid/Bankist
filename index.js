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
  transferTo: "",
  transferAmount: 0,

  getBalance: function () {
    if (!this.currentAccount) return 0;

    return this.currentAccount.movements.reduce(function (
      totalBalance,
      movement
    ) {
      return totalBalance + movement;
    }, 0);
  },
};



//pozdrav poruka.
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

  userState.currentAccount.movements.forEach(function (movement, index) {
    const type = movement > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movement">
        <div class="movement-type ${type}">
 ${userState.currentAccount.movements.length - index} ${type}
        </div>
        <div class="movement-date">12/03/2020</div>
        <div class="movement-amount">${movement} €</div>
      </div>
    `;
    //od 37 do 40 u poseban fajl.
    DOM.transactionList.insertAdjacentHTML("afterbegin", html);
  });
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

    DOM.welcomeMessage.textContent =
 renderGreeting();
renderCurrentDateTime();


    renderTransactions();
    renderBalance();
  }

  DOM.inputUser.value = "";
  DOM.inputPin.value = "";
});

// TRANSFER INPUT LISTENERI
DOM.transferTo.addEventListener("input", function (event) {
  userState.transferReceiver = event.target.value;
});

DOM.transferAmount.addEventListener("input", function (event) {
  userState.transferAmount = Number(event.target.value);
});

//transf. novca
DOM.transferBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (!userState.currentAccount) return;

  const receiverAccount = accounts.find(function (account) {
    return account.username === userState.transferReceiver;
  });

  if (
    receiverAccount &&
    receiverAccount.username !== userState.currentAccount.username &&
    userState.transferAmount > 0 &&
    userState.transferAmount <= 10000 &&
    userState.getBalance() >= userState.transferAmount
  ) {
    userState.currentAccount.movements.push(-userState.transferAmount);

    receiverAccount.movements.push(userState.transferAmount);

    renderTransactions();
    renderBalance();
  }

  DOM.transferTo.value = "";
  DOM.transferAmount.value = "";

  userState.transferReceiver = "";
  userState.transferAmount = 0;
});

















function renderCurrentDateTime() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const formattedDateTime =
    day +
    "/" +
    month +
    "/" +
    year +
    ", " +
    hours +
    ":" +
    minutes;

  DOM.currentDate.textContent =
    "As of " + formattedDateTime;








function renderCurrentDateTime() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const formattedDateTime =
    day +
    "/" +
    month +
    "/" +
    year +
    ", " +
    hours +
    ":" +
    minutes;

  DOM.currentDate.textContent =
    "As of " + formattedDateTime;



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

  currentAccount = null;
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
  }

  DOM.loanAmount.value = "";
});

// LOGOUT
DOM.logoutBtn.addEventListener("click", function () {
  userState.currentAccount = null;
  userState.transferReceiver = "";
  userState.transferAmount = 0;

  DOM.dashboard.classList.add("hidden");
  DOM.navBar.classList.remove("hidden");
});
