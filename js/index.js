let loginBTN = document.getElementById("login-btn");
let userEmailInput = document.getElementById("login-account");
let userPasswordInput = document.getElementById("login-password");

let localStorageData = JSON.parse(localStorage.getItem("userData")) || [];

console.log(localStorageData);

loginBTN.addEventListener("click", function () {
  let loginData = {
    email: userEmailInput.value.trim(),
    password: userPasswordInput.value.trim(),
  };

  let user = localStorageData.find(function (acc) {
    return acc.email === loginData.email;
  });

  if (user) {
    if (user.password === loginData.password) {
      clearErrors();
      loginBTN.classList.add("d-none");
      document.getElementById("spinner").classList.remove("d-none");
      setTimeout(movingToLoginPage, 4000);

      localStorage.setItem("userName", user.name);
    } else {
      document.getElementById("passMessError").classList.remove("d-none");
    }
  } else {
    document.getElementById("emailMessError").classList.remove("d-none");
  }
});

function movingToLoginPage() {
  window.location.href = `${window.location.origin}/main.html`;
}

function clearErrors() {
  document.getElementById("passMessError").classList.add("d-none");
  document.getElementById("emailMessError").classList.add("d-none");
}