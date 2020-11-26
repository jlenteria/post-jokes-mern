const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.gender = !isEmpty(data.gender) ? data.gender : '';
  data.username = !isEmpty(data.username) ? data.username : '';
  data.status = !isEmpty(data.status) ? data.status : '';

  if (validator.isEmpty(data.username)) {
    errors.username = 'Username is required';
  } else if (!validator.isLength(data.username, { min: 2, max: 40 })) {
    errors.username = 'Invalid name';
  }

  if (validator.isEmpty(data.gender) || data.gender === '---') {
    errors.gender = 'Gender field is required';
  }
  if (validator.isEmpty(data.status) || data.status === '---') {
    errors.status = 'Status field is required';
  }
  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.github)) {
    if (!validator.isURL(data.github)) {
      errors.github = 'Not a valid URL';
    }
  }

  //social media
  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
