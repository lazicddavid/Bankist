import accounts from "./account/accounts.js";

const DOM = {
  loginBtn: document.querySelector(".login-btn"),
  navBar: document.querySelector(".nav-bar"),
  dashboard: document.querySelector(".layout-dashboard"),
  inputUser: document.querySelector(".login-user"),
  inputPin: document.querySelector(".login-pin"),
};

accounts.forEach((account) => {
  const initials = account.owner.toLowerCase().split(" ");
  let username = "";

  initials.forEach((word) => {
    username += word[0];
  });

  account.username = username;
});

DOM.loginBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const enteredUser = DOM.inputUser.value;
  const enteredPin = Number(DOM.inputPin.value);

  const activeUser = accounts.find(
    (account) => account.username === enteredUser && account.pin === enteredPin,
  );

  DOM.inputUser.value = "";
  DOM.inputPin.value = "";
});
