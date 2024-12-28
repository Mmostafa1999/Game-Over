let userNameInput = document.getElementById("userName");
let userEmailInput = document.getElementById("userEmail");
let userPasswordInput = document.getElementById("userPassword");
let signupBTN = document.getElementById("signup-btn");

let localStorageData = JSON.parse(localStorage.getItem("userData")) || [];

// Attach onchange event listeners for validation
userNameInput.addEventListener("change", () => {
  validationInputs(userNameInput, "userNameMessage");
});

userEmailInput.addEventListener("change", () => {
  validationInputs(userEmailInput, "userEmailMessage");
});

userPasswordInput.addEventListener("change", () => {
  validationInputs(userPasswordInput, "userPasswordMessage");
});

// Fetching data and storing it in array
signupBTN.addEventListener("click", function () {
  let isValid =
    validationInputs(userNameInput, "userNameMessage") &&
    validationInputs(userEmailInput, "userEmailMessage") &&
    validationInputs(userPasswordInput, "userPasswordMessage");

  if (isValid) {
    let userData = {
      name: userNameInput.value.trim(),
      email: userEmailInput.value.trim(),
      password: userPasswordInput.value.trim(),
    };

    let isEmailExists = localStorageData.some(function (user) {
      return user.email === userData.email;
    });

    if (isEmailExists) {
      document.getElementById("errorMessage").classList.remove("d-none");
    } else {
      document.getElementById("signup-btn").classList.add("d-none");
      document.getElementById("spinner").classList.remove("d-none");
      clearInputs();
      localStorageData.push(userData);
      localStorage.setItem("userData", JSON.stringify(localStorageData));

      setTimeout(() => {
        showSpinner();
        showMessage();

        setTimeout(movingToLoginPage, 2000);
      }, 4000);
    }
  }
});

// Handle function for loading
function showSpinner() {
  document.getElementById("spinner").classList.add("d-none");
}

function showMessage() {
  document.getElementById("errorMessage").classList.add("d-none");
  document.getElementById("successMessage").classList.remove("d-none");
}

function movingToLoginPage() {
  window.location.href = `${window.location.origin}/index.html`;
}

// Handle function to clear inputs
function clearInputs() {
  userNameInput.value = "";
  userEmailInput.value = "";
  userPasswordInput.value = "";
  userNameInput.classList.remove("is-valid");
  userEmailInput.classList.remove("is-valid");
  userPasswordInput.classList.remove("is-valid");
}

// Handle function for validation
function validationInputs(element, messId) {
  let regex = {
    userName: /^[a-z0-9 _-]{3,15}$/i,
    userEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|eg)$/,
    userPassword: /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/,
  };

  let text = element.value;

  let textMessage = document.getElementById(messId);

  if (regex[element.id].test(text)) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    textMessage.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    textMessage.classList.remove("d-none");
    return false;
  }
}
