const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fatec",
    database: "api4"
});

module.exports = con;
