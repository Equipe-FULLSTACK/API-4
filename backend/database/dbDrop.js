var mysql = require('mysql2');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "fatec",
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Conectado");
	
	var sql = "DROP DATABASE api4";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Database api4 deletada");
		
		con.end();
	});	
});
