const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "api4"
});

module.exports = con;
