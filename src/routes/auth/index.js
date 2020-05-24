const store = require('../../store/mysql');
const ctrlUser = require('./controller');
/**
 * dependencies injection
 */
module.exports = ctrlUser(store);