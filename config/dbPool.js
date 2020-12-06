const mysql = require('mysql');
const MYSQL_CONFIG = require('./db');

let pools = {};

if (!pools.hasOwnProperty('data')) {
    pools['data'] = mysql.createPool(MYSQL_CONFIG);
}


const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        // init
        pools['data'].getConnection((err, connection) => {
            if (err) {
                console.log(err, 'failed connect to database');
            }
            else {
                console.log('successfully connected to database');
                // op
                connection.query(sql, values, (err, results) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve( {
                            status: 200,
                            results
                        })
                    }
                })
            }
        })
    })
}

module.exports = {query};