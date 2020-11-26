const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.loication = !isEmpty(data.loication) ? data.loication : '';
  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  } else if (!validator.isLength(data.company, { min: 2 })) {
    errors.company = 'Invalid company name';
  }
  if (validator.isEmpty(data.location)) {
    errors.location = 'Location field is required';
  } else if (!validator.isLength(data.location, { min: 2 })) {
    errors.location = 'Invalid location address';
  }
  if (validator.isEmpty(data.title)) {
    errors.title = 'Job title field is required';
  } else if (!validator.isLength(data.title, { min: 2 })) {
    errors.title = 'Invalid job title';
  }
  if (validator.isEmpty(data.from)) {
    errors.from = 'Required field';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
