const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.location = !isEmpty(data.location) ? data.location : '';

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (validator.isEmpty(data.school)) {
    errors.school = 'School name field is required';
  } else if (!validator.isLength(data.school, { min: 2 })) {
    errors.school = 'Invalid School Name';
  }
  if (validator.isEmpty(data.location)) {
    errors.location = 'Location field is required';
  } else if (!validator.isLength(data.location, { min: 2 })) {
    errors.location = 'Invalid location address';
  }
  if (validator.isEmpty(data.degree)) {
    errors.degree = 'degree field is required';
  } else if (!validator.isLength(data.degree, { min: 2 })) {
    errors.degree = 'Invalid degree';
  }
  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Field of study field is required';
  } else if (!validator.isLength(data.fieldofstudy, { min: 2 })) {
    errors.fieldofstudy = 'Invalid field of study';
  }
  if (validator.isEmpty(data.from)) {
    errors.from = 'Required field';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
