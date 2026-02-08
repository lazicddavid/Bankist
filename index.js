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

  let isLoggedIn = false;

  const activeUser = accounts.find(
    (account) => account.username === enteredUser && account.pin === enteredPin,
  );

  console.log(activeUser);
  /* accounts.find((account) => {
    return (account.username === enteredUser && account.pin === enteredPin) {
      isLoggedIn = true;

      DOM.navBar.classList.add("hidden");
      DOM.dashboard.classList.remove("hidden");
    }
  });
*/
  DOM.inputUser.value = "";
  DOM.inputPin.value = "";
});
