// Helpers para Handlebars...
const helpers = {};

helpers.istrue = (value) => {
  return value !== false
};

module.exports = helpers;