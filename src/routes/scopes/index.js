const store = require('../../store/mysql');
const ctrlScopes = require('./controller');
/**
 * dependencies injection
 */
module.exports = ctrlScopes(store);