const store = require('../../store/mysql');
const ctrlProduct = require('./controller');
/**
 * dependencies injection
 */
module.exports = ctrlProduct(store);