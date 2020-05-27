const store = require('../../store/mysql');
const ctrlShoppingCart = require('./controller');
/**
 * dependencies injection
 */
module.exports = ctrlShoppingCart(store);