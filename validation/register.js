const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let validationText = [];

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password1 = !isEmpty(data.password1) ? data.password1 : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (
    validator.isEmpty(data.firstName) ||
    validator.isEmpty(data.email) ||
    validator.isEmpty(data.password1) ||
    validator.isEmpty(data.password2) ||
    validator.isEmpty(data.lastName)
  ) {
    validationText.error = "Please fill up all fields";
  } else if (!validator.isLength(data.firstName, { min: 2, max: 30 })) {
    validationText.error = "Invalid first Name";
  } else if (!validator.isLength(data.lastName, { min: 2, max: 30 })) {
    validationText.error = "Invalid last name";
  } else if (!validator.isEmail(data.email)) {
    validationText.error = "Invalid email";
  } else if (!validator.isLength(data.password1, { min: 6 })) {
    validationText.error = "Password must be atleast 6 characters";
  } else if (!validator.equals(data.password1, data.password2)) {
    validationText.error = "Passwords doesn't match";
  }

  return {
    validationText,
    isValid: isEmpty(validationText),
  };
};
