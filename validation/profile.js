const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.Gender = !isEmpty(data.Gender) ? data.Gender : "";
  data.Status = !isEmpty(data.Status) ? data.Status : "";

  if (validator.isEmpty(data.Gender) || data.Gender === "---") {
    errors.gender = "Gender field is required";
  }
  if (validator.isEmpty(data.Status) || data.Status === "---") {
    errors.status = "Status field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
