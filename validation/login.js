const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let validationText = [];

  data.loginEmail = !isEmpty(data.loginEmail) ? data.loginEmail : "";
  data.loginPassword = !isEmpty(data.loginPassword) ? data.loginPassword : "";

  if (
    validator.isEmpty(data.loginEmail) ||
    validator.isEmpty(data.loginPassword)
  ) {
    validationText.error = "Please fill up all fields";
  } else if (!validator.isEmail(data.loginEmail)) {
    validationText.error = "Invalid email";
  }
  return {
    validationText,
    isValid: isEmpty(validationText),
  };
};
