const form = document.querySelector("form");
const fullName = document.querySelector("#full-name");
const nameError = document.querySelector("#name-error");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subject-error");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const message = document.querySelector("#message");
const messageError = document.querySelector("#message-error");
const characterCount = document.querySelector("#character-count");
const button = document.querySelector(".send_button");
const sendSuccess = document.querySelector(".send-success");

const stylesToChange = (elementName, errorName, border, color, errorDisplay) => {
  successMessage.style.display = "none";
  elementName.style.border = border;
  elementName.style.borderBottom = `4px ${color} solid`;
  errorName.style.display = errorDisplay;
};

//Check input is the required length
const checkRequiredLength = (userInput, maxMin, requiredLength) => {
  if (maxMin === "min") {
    if (userInput.trim().length >= requiredLength) {
      return true;
    } else {
      return false;
    }
  } else if (maxMin === "max") {
    if (userInput.trim().length <= requiredLength) {
      return true;
    } else {
      return false;
    }
  }
};

//Check email is formated like an email
const emailRegEx = /\S+@\S+\.\S+/;
const validateEmail = (userInput, regEx) => {
  const checkInput = regEx.test(userInput);
  return checkInput;
};

//validate form
const validateForm = () => {
  if (subject) {
    if (
      checkRequiredLength(fullName.value, "min", 5) &&
      validateEmail(email.value, emailRegEx) &&
      checkRequiredLength(subject.value, "min", 15) &&
      checkRequiredLength(message.value, "max", 500) &&
      checkRequiredLength(message.value, "min", 25)
    ) {
      button.disabled = false;
      return true;
    } else {
      button.disabled = true;
      return false;
    }
  } else {
    if (
      checkRequiredLength(fullName.value, "min", 5) &&
      validateEmail(email.value, emailRegEx) &&
      checkRequiredLength(message.value, "max", 500) &&
      checkRequiredLength(message.value, "min", 25)
    ) {
      button.disabled = false;
      return true;
    } else {
      button.disabled = true;
      return false;
    }
  }
};

//Check inputs of the form are valid before sending
const handleSubmit = (e) => {
  e.preventDefault();

  if (validateForm()) {
    button.disabled = true;
    characterCount.innerHTML = 500;
    sendSuccess.style.display = "block";
    stylesToChange(fullName, nameError, "none", "var(--light-color)", "none");
    if (subject) {
      stylesToChange(subject, subjectError, "none", "var(--light-color)", "none");
    }
    stylesToChange(email, emailError, "none", "var(--light-color)", "none");
    message.style.border = "4px var(--light-color) solid";
    messageError.style.display = "none";
    sendSuccess.style.display = "block";
  } else {
    if (!checkRequiredLength(fullName.value, "min", 5)) {
      fullName.style.border = "4px var(--error-color) solid";
      nameError.style.display = "block";
    }
    if (subject && !checkRequiredLength(subject.value, "min", 15)) {
      subject.style.border = "4px var(--error-color) solid";
      subjectError.style.display = "block";
    }
    if (!validateEmail(email.value, emailRegEx)) {
      email.style.border = "4px var(--error-color) solid";
      emailError.style.display = "block";
    }
    if (
      !checkRequiredLength(message.value, "max", 500) &&
      !checkRequiredLength(message.value, "min", 25)
    ) {
      message.style.border = "4px var(--error-color) solid";
      messageError.style.display = "block";
    }
  }
};

form.addEventListener("submit", handleSubmit);

//Check character count of message
let characterLimit = 500;
message.addEventListener("keyup", function () {
  characterLimit = 500 - message.value.trim().length;
  characterCount.innerHTML = characterLimit;
});

const successMessage = document.querySelector(".send-success");

const handleKeyUpName = () => {
  successMessage.style.display = "none";
  if (checkRequiredLength(fullName.value, "min", 5)) {
    stylesToChange(fullName, nameError, "none", "var(--color-1)", "none");
  }
  validateForm();
};

const handleFocusOutName = () => {
  if (checkRequiredLength(fullName.value, "min", 5)) {
    stylesToChange(fullName, nameError, "none", "var(--color-1)", "none");
  }
  if (!checkRequiredLength(fullName.value, "min", 5)) {
    fullName.style.border = "4px var(--error-color) solid";
    nameError.style.display = "block";
  }
  validateForm();
};

const handleKeyUpSubject = () => {
  successMessage.style.display = "none";
  if (checkRequiredLength(subject.value, "min", 15)) {
    stylesToChange(subject, subjectError, "none", "var(--color-1)", "none");
  }
  validateForm();
};

const handleFocusOutSubject = () => {
  if (checkRequiredLength(subject.value, "min", 15)) {
    stylesToChange(subject, subjectError, "none", "var(--color-1)", "none");
  }
  if (!checkRequiredLength(subject.value, "min", 15)) {
    subject.style.border = "4px var(--error-color) solid";
    subjectError.style.display = "block";
  }
  validateForm();
};

const handleKeyUpEmail = () => {
  successMessage.style.display = "none";
  if (validateEmail(email.value, emailRegEx)) {
    stylesToChange(email, emailError, "none", "var(--color-1)", "none");
  }
  validateForm();
};

const handleFocusOutEmail = () => {
  if (validateEmail(email.value, emailRegEx)) {
    stylesToChange(email, emailError, "none", "var(--color-1)", "none");
  }
  if (!validateEmail(email.value, emailRegEx)) {
    email.style.border = "4px var(--error-color) solid";
    emailError.style.display = "block";
  }
  validateForm();
};

const handleKeyUpMessage = () => {
  successMessage.style.display = "none";
  if (
    checkRequiredLength(message.value, "max", 500) &&
    checkRequiredLength(message.value, "min", 25)
  ) {
    message.style.border = "4px var(--color-1) solid";
    messageError.style.display = "none";
  }
  validateForm();
};
const handleFocusOutMessage = () => {
  if (
    checkRequiredLength(message.value, "max", 500) &&
    checkRequiredLength(message.value, "min", 25)
  ) {
    message.style.border = "4px var(--color-1) solid";
    messageError.style.display = "none";
  }
  if (
    !checkRequiredLength(message.value, "max", 500) ||
    !checkRequiredLength(message.value, "min", 25)
  ) {
    message.style.border = "4px var(--error-color) solid";
    messageError.style.display = "block";
  }
  validateForm();
};

fullName.addEventListener("keyup", handleKeyUpName);
email.addEventListener("keyup", handleKeyUpEmail);
message.addEventListener("keyup", handleKeyUpMessage);
fullName.addEventListener("focus", handleKeyUpName);
email.addEventListener("focus", handleKeyUpEmail);
message.addEventListener("focus", handleKeyUpMessage);
fullName.addEventListener("focusout", handleFocusOutName);
email.addEventListener("focusout", handleFocusOutEmail);
message.addEventListener("focusout", handleFocusOutMessage);

if (subject) {
  subject.addEventListener("keyup", handleKeyUpSubject);
  subject.addEventListener("focus", handleKeyUpSubject);
  subject.addEventListener("focusout", handleFocusOutSubject);
}
