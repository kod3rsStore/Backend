const store = require('../../store/mysql');
const ctrlStripe = require('./controller');
/**
 * dependencies injection
 */
module.exports = ctrlStripe(store);