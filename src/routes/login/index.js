const store = require('../../store/mysql');
const ctrlLogin = require('./controller');

module.exports = ctrlLogin(store);