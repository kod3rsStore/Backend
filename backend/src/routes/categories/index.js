const store = require('../../store/mysql');
const ctrlCategories = require('./controller');
/**
 * dependencies injection
 */
module.exports = ctrlCategories(store);