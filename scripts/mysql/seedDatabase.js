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

/*
* Function to create security tokens
*/

function generateRandomToken() {
    const buffer = crypto.randomBytes(32);
    return buffer.toString('hex');
  }


/*
*Procesing the users Mock
*
*/
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
    //return await store.insert('Users', data);
})
debug(chalk.green(`Inserting Users`)); // prettier-ignore
/*
*Procesing the security_levels Mock
*
*/
const security_levels = require('../mocks/security_levels')

//Saving user table
security_levels.forEach(async (item) => {
    let token="";
    //getting the token from dotenv
    switch (item.security_code) {
        case '1':
            if(config.adminApiKeyToken){
            token=config.adminApiKeyToken;
            }else {
            token=generateRandomToken(); 
            }
            break;
        case '2':
            if(config.userApiKeyToken){
                token=config.userApiKeyToken;
            }else {
                token=generateRandomToken(); 
            }
            break;
        case '3':
            if(config.sellerApiKeyToken){
                token=config.sellerApiKeyToken;
            }else {
                token=generateRandomToken(); 
            }
            break;
        case '4':
            if(config.publicApiKeyToken){
                token=config.publicApiKeyToken;
            }else {
                token=generateRandomToken(); 
            }
            break;       
        default:
            token=generateRandomToken(); 
            break;
      }

    
    const data = {
        id_security_levels: item.id_security_levels,
        security_level_description: item.security_level_description,
        security_code: item.security_code,
        available: item.available,
        creation_date: item.creation_date,
        token,
    }

    //return await store.insert('Security_levels', data);
})
debug(chalk.green(`Inserting Security_levels`)); 

/*
*Procesing the states Mock
*
*/
const states = require('../mocks/states')
//Saving states table
states.forEach(async (item) => {
    return await store.insert('States_catalog', item);
})
debug(chalk.green(`Inserting States`)); 


