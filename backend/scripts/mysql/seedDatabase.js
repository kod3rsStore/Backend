// DEBUG=app:* node scripts/mongo/seedApiKeys.js
require('dotenv').config({path: '../../.env'})

const chalk = require('chalk');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { nanoid } = require('nanoid');
const debug = require('debug')('app:scripts:seed');
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
        pass= await bcrypt.hash(config.defaultAdminPassword, 5);
    }else{
        pass = await bcrypt.hash(config.defaultUserPassword, 5);
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
debug(chalk.green(`Inserting Users`)); 
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

    return await store.insert('Security_levels', data);
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

/*
*Procesing the products Mock
*
*/
const products = require('../mocks/products')
//Saving states table
products.forEach(async (item) => {
    return await store.insert('Products', item);
})
debug(chalk.green(`Inserting Products`)); 
/*
*Procesing the albums Mock
*
*/
const albums = require('../mocks/albums')
//Saving states table
albums.forEach(async (item) => {
    return await store.insert('Albums', item);
})
debug(chalk.green(`Inserting Albums`)); 

/*
*Procesing the product_photos Mock
*
*/
const product_photos = require('../mocks/product_photos')
//Saving states table
product_photos.forEach(async (item) => {
    return await store.insert('Product_photos', item);
})
debug(chalk.green(`Inserting Product_photos`)); 

/*
*Procesing the categories Mock
*
*/
const categories = require('../mocks/categories')
//Saving states table
categories.forEach(async (item) => {
    return await store.insert('Categories', item);
})
debug(chalk.green(`Inserting Categories`)); 
/*
*Procesing the module_access Mock
*
*/
const module_access = require('../mocks/module_access')
//Saving states table
module_access.forEach(async (item) => {

    const data = {
        id_module_access:  nanoid(),
        module:item.module,
        endpoint: item.endpoint,
        id_security_levels: item.id_security_levels
    }

    //console.log(data);
    return await store.insert('Module_access', data);
})
debug(chalk.green(`Inserting Module_access`)); 

/*
*Procesing the directions Mock
*
*/
const directions = require('../mocks/directions')
//Saving states table
directions.forEach(async (item) => {
    return await store.insert('Directions', item);
})
debug(chalk.green(`Inserting Directions`)); 

/*
*Procesing the currencies Mock
*
*/
const currencies = require('../mocks/currencies')
//Saving states table
currencies.forEach(async (item) => {
    return await store.insert('Currencies', item);
})
debug(chalk.green(`Inserting Currencies`)); 
/*
*Procesing the countries_catalog Mock
*
*/
const countries_catalog = require('../mocks/countries_catalog')
//Saving states table
countries_catalog.forEach(async (item) => {
    return await store.insert('Countries_catalog', item);
})
debug(chalk.green(`Inserting Countries_catalog`)); 

/*
*Procesing the cities_catalog Mock
*
*/
debug(chalk.green(`Inserting Cities_catalog`)); 
const cities_catalog = require('../mocks/cities_catalog')
//Saving states table
let i=0;
cities_catalog.forEach(async (item) => {
    //debug(chalk.green(`Inserting City number ${i++}`)); 
    return await store.insert('Cities_catalog', item);
})




