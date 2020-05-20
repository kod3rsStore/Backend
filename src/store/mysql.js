const mysql = require('mysql');
const config = require('../config/index');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let connection;

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

module.exports = {
    insert,
}