const con = require('./database');
const defaultSQL = require('./databaseDefault');

con.query("CREATE DATABASE IF NOT EXISTS api4", function (err, result) {
    if (err) throw err;
    console.log("Banco de dados 'api4' criado ou já existente");

    con.query("USE api4", function (err, result) {
        if (err) throw err;

        // Verifica se as tabelas existem e estão conforme o padrão default
        con.query("SHOW TABLES", function (err, result) {
            if (err) throw err;
            const tables = result.map(row => row['Tables_in_api4']);
            if (tables.length === 0) {
                con.query(defaultSQL, function (err, result) {
                    if (err) throw err;
                    console.log("Estrutura padrão do banco de dados criada");
                });
            } else {
                console.log("Banco de dados 'api4' já possui tabelas");
            }
        });
    });
});
