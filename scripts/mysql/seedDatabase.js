// DEBUG=app:* node scripts/mongo/seedApiKeys.js
require('dotenv').config({path: '../../.env'})

const chalk = require('chalk');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const debug = require('debug')('app:scripts:api-keys');
const config = require('../../src/config');
const store = require('../../src/store/mysql');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

//console.log(config);
const users = require('../mocks/users')

//Saving user table
users.forEach(async (item) => {
    let pass;
    if(item.security_code==1){
        pass= await bcrypt.hash(config.defaultAdminPassword, 10);
    }else{
        pass = await bcrypt.hash(config.defaultUserPassword, 10);
    }
    const data = {
    id_users: item.id_users,
    login: item.login,
    password: pass,
    first_name: item.first_name,
    last_name: item.last_name,
    email: item.email,
    photo: item.photo,
    security_code: item.security_code,
    creation_date: item.creation_date,
    score: item.score,
    available: item.available
    }
    return await store.insert('Users', data);
})


