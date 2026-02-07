import accounts from "./account/accounts.js";

const DOM = {
  loginBtn: document.querySelector(".login-btn"),
  navBar: document.querySelector(".nav-bar"),
  dashboard: document.querySelector(".layout-dashboard"),
  inputUser: document.querySelector(".login-user"),
  inputPin: document.querySelector(".login-pin"),
};


accounts.forEach(account => {
  const parts = account.owner.toLowerCase().split(" ");
  let username = "";

  parts.forEach(word => {
    username += word[0];
  });



DOM.loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  DOM.navBar.classList.add("hidden");
  DOM.dashboard.classList.remove("hidden");
});
