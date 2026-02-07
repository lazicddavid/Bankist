import accounts from "./account/accounts.js";

// ---------------- DOM ----------------
const DOM = {
  loginBtn: document.querySelector(".login-btn"),
  navBar: document.querySelector(".nav-bar"),
  dashboard: document.querySelector(".layout-dashboard"),
  inputUser: document.querySelector(".login-user"),
  inputPin: document.querySelector(".login-pin"),
};

// ---------------- USERNAME (inicijali) ----------------
accounts.forEach((account) => {
  const parts = account.owner.toLowerCase().split(" ");
  let username = "";

  parts.forEach((word) => {
    username += word[0];
  });

  account.username = username;
});

// ---------------- LOGIN ----------------
DOM.loginBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const enteredUser = DOM.inputUser.value;
  const enteredPin = Number(DOM.inputPin.value);

  let isLoggedIn = false;

  accounts.forEach((account) => {
    if (account.username === enteredUser && account.pin === enteredPin) {
      isLoggedIn = true;

      DOM.navBar.classList.add("hidden");
      DOM.dashboard.classList.remove("hidden");

      console.log("Ulogovan:", account.owner);
    }
  });

  DOM.inputUser.value = "";
  DOM.inputPin.value = "";
});
