/** 
 *Module for create/read/update/delete information of a data base MySQL. 
 *@module mysql
*/
const mysql = require('mysql');
const config = require('../config/index');
/**
 * Fetch the environment variables to connect to a data base MySQL.
 */
const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let connection;
/**
 * Handle the connection to a database MySQL.
 */
function handleCon(){
    connection = mysql.createConnection(dbconf);
    connection.connect( (err) => {
        if(err){
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        }else{
            console.log('DB connected');
        }
    });
}

handleCon();

/**
 * Insert data into the target table
 * @param {string} table - The target table 
 * @param {object} data - Data to insert into table
 * @returns {promise} result of data insertion
 */
function insert(table, data){
    return new Promise( (resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if(err){
                return reject(err);
            }
            resolve(result);
        })
    })
}

/**
 * Update tuples with a customized query in the target table and id target.
 * @param {string} query - The customized query to UPDATE data
 * @param {Object} data - The data to update
 * @returns {Promise} - result of the update operation.
 */
function update(query, data){
    return new Promise( (resolve, reject) => {
        connection.query(query,data, (err, result) => {
            if(err){
                return reject(err);
            }
            resolve(result);
        })
    })
}
/**
 * List all tuples from the target table
 * @param {String} table - The target table 
 * @returns {Promise<object[]>} - array of objects with query results.
 */
function list(table){
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err){
                return reject(err);
            }
            resolve(data);
        })
    })
}

/**
 * Fetch tuples with a customized query from the target table.
 * @param {string} query - The customized query 
 * @returns {Promise} - array of objects with query results.
 */
function get(query){
    return new Promise( (resolve, reject) => {
        connection.query(query, (err, data) => {
            if (err){
                return reject(err);
            }
            resolve(data || null);
        })
    })
}

/**
 * delete method. Be carefully - yo can delete the whole content of table
 * @param {string} query - The customized query 
 * @returns {Promise} - results from Dada base delete operation.
 */
function remove(query){
    return new Promise( (resolve, reject) => {
        connection.query(query, (err, data) => {
            if (err){
                return reject(err);
            }
            resolve(data || null);
        })
    })
}
module.exports = {
    insert,
    update,
    list,
    get,
    remove,
}