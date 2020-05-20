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