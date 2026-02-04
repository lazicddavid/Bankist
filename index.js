const DOM = {
  loginBtn: document.querySelector("login-btn"),
  navBar: document.querySelector(".nav-bar"),
  dashboard: document.querySelector(".layout-dashboard"),
};

DOM.loginBtn.addEventListener("click", () => {
  e.preventDefault();
  DOM.navBar.classlist.add("hidden");
  DOM.dashboard.classlist.add("hidden");
});
