const store = require('../../store/mysql');
const ctrlAddresses = require('./controller');
/**
 * dependencies injection
 */
module.exports = ctrlAddresses(store);