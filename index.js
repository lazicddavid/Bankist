console.log("JS radi");

const DOM = {
  loginBtn: document.querySelector(".login-btn"),
  navBar: document.querySelector(".nav-bar"),
  dashboard: document.querySelector(".layout-dashboard"),
};

DOM.loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  DOM.navBar.classList.add("hidden");
  DOM.dashboard.classList.remove("hidden");
});
