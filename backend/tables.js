var mysql = require('mysql2');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "fatec",
	database: "db"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Conectado");
	
	/*
	//ROLES
	var sql = `CREATE TABLE roles (
		id INT NOT NULL AUTO_INCREMENT,
		name VARCHAR(128),
		description TEXT,
		editroles BOOL DEFAULT 0,
		editusers BOOL DEFAULT 0,
		editprocesses BOOL DEFAULT 0,
		edittasks BOOL DEFAULT 0,
		edittemplates BOOL DEFAULT 0,
		editevidences BOOL DEFAULT 0,
		viewprocesses BOOL DEFAULT 0,
		viewtasks BOOL DEFAULT 0,
		viewevidences BOOL DEFAULT 0,
		PRIMARY KEY (id)
	)`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Tabela ROLES criada");
	});
	
	//USERS
	var sql = `CREATE TABLE users (
		id INT NOT NULL AUTO_INCREMENT,
		admin BOOLEAN DEFAULT 0, 
		name VARCHAR(128),
		nickname VARCHAR(128),
		password VARCHAR(64),
		phone VARCHAR(32),
		email VARCHAR(256),
		image TEXT,
		role INT DEFAULT NULL,
		PRIMARY KEY (id),
		FOREIGN KEY (role) REFERENCES roles(id)
	)`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Tabela USERS criada");
	});
	
	
	//PROCESSES
	var sql = `CREATE TABLE processes (
		id INT NOT NULL AUTO_INCREMENT,
		active BOOL DEFAULT 1,
		status VARCHAR(64),
		name VARCHAR(128),
		created DATETIME DEFAULT NOW(),
		deadline DATETIME,
		description TEXT,
		PRIMARY KEY (id)
	)`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Tabela PROCESSES criada");
	});
	
	//TASKS
	var sql = `CREATE TABLE tasks (
		id INT NOT NULL AUTO_INCREMENT,
		process INT NOT NULL,
		active BOOL DEFAULT 1,
		status VARCHAR(64), 
		name VARCHAR(128),
		created DATETIME DEFAULT NOW(),
		deadline DATETIME,
		description TEXT,
		PRIMARY KEY (id),
		FOREIGN KEY (process) REFERENCES processes(id)
	)`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Tabela TASKS criada");
	});
	
	//EVIDENCES
	var sql = `CREATE TABLE evidences (
		id INT NOT NULL AUTO_INCREMENT,
		task INT NOT NULL,
		active BOOL DEFAULT 1,
		status VARCHAR(64), 
		name VARCHAR(128),
		created DATETIME,
		description TEXT,
		type VARCHAR(64),
		url TEXT,
		PRIMARY KEY (id),
		FOREIGN KEY (task) REFERENCES tasks(id)
	)`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Tabela EVIDENCES criada");
	});
	
	
	
	//TEMPLATE_PROCESSES
	var sql = `CREATE TABLE template_processes (
		id INT NOT NULL AUTO_INCREMENT,
		name VARCHAR(128),
		description TEXT,
		PRIMARY KEY (id)
	)`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Tabela TEMPLATE_PROCESSES criada");
	});
	
	
	//TEMPLATE_TASKS
	var sql = `CREATE TABLE template_tasks (
		id INT NOT NULL AUTO_INCREMENT,
		process INT NOT NULL,
		name VARCHAR(128),
		description TEXT,
		PRIMARY KEY (id),
		FOREIGN KEY (process) REFERENCES template_processes(id)
	)`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Tabela TEMPLATE_TASKS criada");
	});
	
	//TEMPLATE_EVIDENCES
	var sql = `CREATE TABLE template_evidences (
		id INT NOT NULL AUTO_INCREMENT,
		task INT NOT NULL,
		name VARCHAR(128),
		description TEXT,
		type VARCHAR(64),
		PRIMARY KEY (id),
		FOREIGN KEY (task) REFERENCES template_tasks(id)
	)`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Tabela TEMPLATE_EVIDENCES criada");
	});
	
	
	
	//REQUIREMENTS
	var sql = `CREATE TABLE requirements (
		id INT NOT NULL AUTO_INCREMENT,
		task INT NOT NULL,
		requires INT NOT NULL, 
		PRIMARY KEY (id),
		FOREIGN KEY (task) REFERENCES tasks(id),
		FOREIGN KEY (requires) REFERENCES tasks(id)
	)`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Tabela REQUIREMENTS criada");
	});
	
	//RESPONSIBLES, PROCESS, TASK, EVIDENCE
	var sql = `CREATE TABLE responsibles (
		id INT NOT NULL AUTO_INCREMENT,
		user INT NOT NULL,
		type VARCHAR(64) NOT NULL, 
		typeid INT NOT NULL,
		PRIMARY KEY (id),
		FOREIGN KEY (user) REFERENCES users(id)
	)`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Tabela RESPONSIBLES criada");
	});
	
	
	
	//LOGS
	
	//LOG_ROLES
	var sql = `CREATE TABLE log_roles (
		id INT NOT NULL AUTO_INCREMENT,
		originalid INT,
		changetime DATETIME,
		name VARCHAR(128),
		description TEXT,
		editroles BOOL DEFAULT 0,
		editusers BOOL DEFAULT 0,
		editprocesses BOOL DEFAULT 0,
		edittasks BOOL DEFAULT 0,
		edittemplates BOOL DEFAULT 0,
		editevidences BOOL DEFAULT 0,
		viewprocesses BOOL DEFAULT 0,
		viewtasks BOOL DEFAULT 0,
		viewevidences BOOL DEFAULT 0,
		PRIMARY KEY (id)
	)`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Tabela LOG_ROLES criada");
	});
	
	//LOG_USERS
	var sql = `CREATE TABLE log_users (
		id INT NOT NULL AUTO_INCREMENT,
		originalid INT,
		changetime DATETIME,
		admin BOOLEAN DEFAULT 0, 
		name VARCHAR(128),
		nickname VARCHAR(128),
		password VARCHAR(64),
		phone VARCHAR(32),
		email VARCHAR(256),
		image TEXT,
		role INT DEFAULT NULL,
		PRIMARY KEY (id)
	)`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Tabela LOG_USERS criada");
	});
	


	
	
	
	//LOG_PROCESSES
	var sql = `CREATE TABLE log_processes (
		id INT NOT NULL AUTO_INCREMENT,
		originalid INT,
		changetime DATETIME,
		active BOOL DEFAULT 1,
		status VARCHAR(64),
		name VARCHAR(128),
		created DATETIME DEFAULT NOW(),
		deadline DATETIME,
		description TEXT,
		PRIMARY KEY (id)
	)`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Tabela LOG_PROCESSES criada");
	});
	
	//LOG_TASKS
	var sql = `CREATE TABLE log_tasks (
		id INT NOT NULL AUTO_INCREMENT,
		originalid INT,
		changetime DATETIME,
		process INT NOT NULL,
		active BOOL DEFAULT 1,
		status VARCHAR(64), 
		name VARCHAR(128),
		created DATETIME DEFAULT NOW(),
		deadline DATETIME,
		description TEXT,
		PRIMARY KEY (id)
	)`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Tabela LOG_TASKS criada");
	});
	
	//LOG_EVIDENCES
	var sql = `CREATE TABLE log_evidences (
		id INT NOT NULL AUTO_INCREMENT,
		originalid INT,
		changetime DATETIME,
		task INT NOT NULL,
		active BOOL DEFAULT 1,
		status VARCHAR(64), 
		name VARCHAR(128),
		created DATETIME,
		description TEXT,
		type VARCHAR(64),
		url TEXT,
		PRIMARY KEY (id)
	)`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Tabela LOG_EVIDENCES criada");
	});
	
	
	
	//LOG_TEMPLATE_PROCESSES
	var sql = `CREATE TABLE log_template_processes (
		id INT NOT NULL AUTO_INCREMENT,
		originalid INT,
		changetime DATETIME,
		name VARCHAR(128),
		description TEXT,
		PRIMARY KEY (id)
	)`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Tabela LOG_TEMPLATE_PROCESSES criada");
	});
	
	
	//LOG_TEMPLATE_TASKS
	var sql = `CREATE TABLE log_template_tasks (
		id INT NOT NULL AUTO_INCREMENT,
		originalid INT,
		changetime DATETIME,
		process INT NOT NULL,
		name VARCHAR(128),
		description TEXT,
		PRIMARY KEY (id)
	)`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Tabela LOG_TEMPLATE_TASKS criada");
	});
	
	//LOG_TEMPLATE_EVIDENCES
	var sql = `CREATE TABLE log_template_evidences (
		id INT NOT NULL AUTO_INCREMENT,
		originalid INT,
		changetime DATETIME,
		task INT NOT NULL,
		name VARCHAR(128),
		description TEXT,
		type VARCHAR(64),
		PRIMARY KEY (id)
	)`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Tabela LOG_TEMPLATE_EVIDENCES criada");
	});
	
	
	
	//LOG_REQUIREMENTS
	var sql = `CREATE TABLE log_requirements (
		id INT NOT NULL AUTO_INCREMENT,
		originalid INT,
		changetime DATETIME,
		task INT NOT NULL,
		requires INT NOT NULL, 
		PRIMARY KEY (id)
	)`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Tabela LOG_REQUIREMENTS criada");
	});
	
	//LOG_RESPONSIBLES, PROCESS, TASK, EVIDENCE
	var sql = `CREATE TABLE log_responsibles (
		id INT NOT NULL AUTO_INCREMENT,
		originalid INT,
		changetime DATETIME,
		user INT NOT NULL,
		type VARCHAR(64) NOT NULL, 
		typeid INT NOT NULL,
		PRIMARY KEY (id)
	)`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Tabela LOG_RESPONSIBLES criada");
	});
});

*/
