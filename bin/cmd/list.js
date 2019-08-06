'use strict'
const table = require('../utils/table');

module.exports = () => {
  table(require('../../templates'));
  process.exit();
};
