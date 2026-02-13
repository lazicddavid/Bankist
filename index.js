import accounts from "./account/accounts.js";

const DOM = {
  loginBtn: document.querySelector(".login-btn"),
  navBar: document.querySelector(".nav-bar"),
  dashboard: document.querySelector(".layout-dashboard"),
  inputUser: document.querySelector(".login-user"),
  inputPin: document.querySelector(".login-pin"),
};
let currentAccount;

accounts.find((account) => {
  const initials = account.owner.toLowerCase().split(" ");
  let username = "";

  initials.find((word) => {
    //find?
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

  if (activeUser) {
    console.log("ulogovan", activeUser);

    DOM.navBar.classList.add("hidden");
    DOM.dashboard.classList.remove("hidden");
  } else {
    console.log("pogresan user ili  pin");
  }

  DOM.inputUser.value = "";
  DOM.inputPin.value = "";
});
