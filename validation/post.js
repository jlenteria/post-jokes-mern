const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePost(data) {
  let validationText = [];
  data.text = !isEmpty(data.text) ? data.text : '';

  if (validator.isEmpty(data.text)) {
    validationText.error = 'Please input some text';
  } else if (!validator.isLength(data.text, { min: 20 })) {
    validationText.error = 'Text must be a minimum of 20 characters';
  }
  return {
    validationText,
    isValid: isEmpty(validationText),
  };
};
