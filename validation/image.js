const fs = require('fs');

module.exports = function validateImage(data) {
  let imageError = '';
  if (
    !data.mimetype.includes('jpeg') &&
    !data.mimetype.includes('png') &&
    !data.mimetype.includes('jpg')
  ) {
    //remove file
    fs.unlinkSync(data.path);
    imageError = 'File not support';
  }

  if (data.size > 1024 * 1024) {
    fs.unlinkSync(data.path);
    imageError = 'File is too large';
  }
  return {
    imageError,
  };
};
