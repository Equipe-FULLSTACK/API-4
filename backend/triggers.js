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
	//LOG_ROLES
	var sql = `CREATE TRIGGER insert_roles AFTER INSERT ON roles FOR EACH ROW
  INSERT INTO log_roles (originalid, changetime, name, description, editroles, editusers, editprocesses, edittasks, edittemplates, editevidences, viewprocesses, viewtasks, viewevidences) 
VALUES (NEW.id, NOW(), NEW.name, NEW.description, NEW.editroles, NEW.editusers, NEW.editprocesses, NEW.edittasks, NEW.edittemplates, NEW.editevidences, NEW.viewprocesses, NEW.viewtasks, NEW.viewevidences);
`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("TRIGGERS LOG_ROLES criados");
	});
	var sql = `CREATE TRIGGER update_roles AFTER UPDATE ON roles FOR EACH ROW
  INSERT INTO log_roles (originalid, changetime, name, description, editroles, editusers, editprocesses, edittasks, edittemplates, editevidences, viewprocesses, viewtasks, viewevidences) 
VALUES (OLD.id, NOW(), OLD.name, OLD.description, OLD.editroles, OLD.editusers, OLD.editprocesses, OLD.edittasks, OLD.edittemplates, OLD.editevidences, OLD.viewprocesses, OLD.viewtasks, OLD.viewevidences);
	`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("TRIGGERS LOG_ROLES criados");
	});
	
	//LOG_USERS
	var sql = `CREATE TRIGGER insert_users AFTER INSERT ON users FOR EACH ROW
  INSERT INTO log_users (originalid, changetime, admin, name, nickname, password, phone, email, image, role) 
VALUES (NEW.id, NOW(), NEW.admin, NEW.name, NEW.nickname, NEW.password, NEW.phone, NEW.email, NEW.image, NEW.role);
`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("TRIGGERS LOG_ROLES criados");
	});
	var sql = `CREATE TRIGGER update_users AFTER UPDATE ON users FOR EACH ROW
  INSERT INTO log_users (originalid, changetime, admin, name, nickname, password, phone, email, image, role) 
VALUES (OLD.id, NOW(), OLD.admin, OLD.name, OLD.nickname, OLD.password, OLD.phone, OLD.email, OLD.image, OLD.role);
	`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("TRIGGERS LOG_USERS criados");
	});
	
	
	
	//LOG_PROCESSES
	var sql = `CREATE TRIGGER insert_processes AFTER INSERT ON processes FOR EACH ROW
  INSERT INTO log_processes (originalid, changetime, active, status, name, created, deadline, description) 
VALUES (NEW.id, NOW(), NEW.active, NEW.status, NEW.name, NEW.created, NEW.deadline, NEW.description);
`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("TRIGGERS LOG_ROLES criados");
	});
	var sql = `CREATE TRIGGER update_processes AFTER UPDATE ON processes FOR EACH ROW
  INSERT INTO log_processes (originalid, changetime, active, status, name, created, deadline, description) 
VALUES (OLD.id, NOW(), OLD.active, NEW.status, OLD.name, OLD.created, OLD.deadline, OLD.description);
	`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("TRIGGERS LOG_PROCESSES criados");
	});
	
	//LOG_TASKS
	var sql = `CREATE TRIGGER insert_tasks AFTER INSERT ON tasks FOR EACH ROW
  INSERT INTO log_tasks (originalid, changetime, process, active, status, name, created, deadline, description) 
VALUES (NEW.id, NOW(), NEW.process, NEW.active, NEW.status, NEW.name, NEW.created, NEW.deadline, NEW.description);
`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("TRIGGERS LOG_ROLES criados");
	});
	var sql = `CREATE TRIGGER update_tasks AFTER UPDATE ON tasks FOR EACH ROW
  INSERT INTO log_tasks (originalid, changetime, process, active, status, name, created, deadline, description) 
VALUES (OLD.id, NOW(), OLD.process, OLD.active, OLD.status, OLD.name, OLD.created, OLD.deadline, OLD.description);
	`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("TRIGGERS LOG_TASKS criados");
	});
	
	//LOG_EVIDENCES
	var sql = `CREATE TRIGGER insert_evidences AFTER INSERT ON evidences FOR EACH ROW
  INSERT INTO log_evidences (originalid, changetime, task, active, status, name, created, description, type, url) 
VALUES (NEW.id, NOW(), NEW.task, NEW.active, NEW.status, NEW.name, NEW.created, NEW.description, NEW.type, NEW.url);
`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("TRIGGERS LOG_ROLES criados");
	});
	var sql = `CREATE TRIGGER update_evidences AFTER UPDATE ON evidences FOR EACH ROW
  INSERT INTO log_evidences (originalid, changetime, task, active, status, name, created, description, type, url) 
VALUES (NEW.id, NOW(), OLD.task, OLD.active, OLD.status, OLD.name, OLD.created, OLD.description, OLD.type, OLD.url);
	`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("TRIGGERS LOG_EVIDENCES criados");
	});
	
	
	
	//LOG_TEMPLATE_PROCESSES
	var sql = `CREATE TRIGGER insert_template_processes AFTER INSERT ON template_processes FOR EACH ROW
  INSERT INTO log_template_processes (originalid, changetime, name, description) 
VALUES (NEW.id, NOW(), NEW.name, NEW.description);
`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("TRIGGERS LOG_ROLES criados");
	});
	var sql = `CREATE TRIGGER update_template_processes AFTER UPDATE ON template_processes FOR EACH ROW
  INSERT INTO log_template_processes (originalid, changetime, name, description) 
VALUES (NEW.id, NOW(), OLD.name, OLD.description);
	`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("TRIGGERS LOG_TEMPLATE_PROCESSES criados");
	});
	
	
	//LOG_TEMPLATE_TASKS
	var sql = `CREATE TRIGGER insert_template_tasks AFTER INSERT ON template_tasks FOR EACH ROW
  INSERT INTO log_template_tasks (originalid, changetime, process, name, description) 
VALUES (NEW.id, NOW(), NEW.process, NEW.name, NEW.description);
`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("TRIGGERS LOG_ROLES criados");
	});
	var sql = `CREATE TRIGGER update_template_tasks AFTER UPDATE ON template_tasks FOR EACH ROW
  INSERT INTO log_template_tasks (originalid, changetime, process, name, description) 
VALUES (NEW.id, NOW(), OLD.process, OLD.name, OLD.description);
	`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("TRIGGERS LOG_TEMPLATE_TASKS criados");
	});
	
	//LOG_TEMPLATE_EVIDENCES
	var sql = `CREATE TRIGGER insert_template_evidences AFTER INSERT ON template_evidences FOR EACH ROW
  INSERT INTO log_template_evidences (originalid, changetime, task, name, type, description) 
VALUES (NEW.id, NOW(), NEW.task, NEW.name, NEW.type, NEW.description);
`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("TRIGGERS LOG_ROLES criados");
	});
	var sql = `CREATE TRIGGER update_template_evidences AFTER UPDATE ON template_evidences FOR EACH ROW
  INSERT INTO log_template_evidences (originalid, changetime, task, name, type, description) 
VALUES (NEW.id, NOW(), OLD.task, OLD.name, OLD.type, OLD.description);
	`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("TRIGGERS LOG_TEMPLATE_EVIDENCES criados");
	});
	
	
	
	//LOG_REQUIREMENTS
	var sql = `CREATE TRIGGER insert_requirements AFTER INSERT ON requirements FOR EACH ROW
  INSERT INTO log_requirements (originalid, changetime, task, requires) 
VALUES (NEW.id, NOW(), NEW.task, NEW.requires);
`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("TRIGGERS LOG_ROLES criados");
	});
	var sql = `CREATE TRIGGER update_requirements AFTER UPDATE ON requirements FOR EACH ROW
  INSERT INTO log_requirements (originalid, changetime, task, requires) 
VALUES (NEW.id, NOW(), OLD.task, OLD.requires);
	`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("TRIGGERS LOG_REQUIREMENTS criados");
	});
	
	//LOG_RESPONSIBLES, PROCESS, TASK, EVIDENCE
	var sql = `CREATE TRIGGER insert_responsibles AFTER INSERT ON responsibles FOR EACH ROW
  INSERT INTO log_responsibles (originalid, changetime, user, type, typeid) 
VALUES (NEW.id, NOW(), NEW.user, NEW.type, NEW.typeid);
`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("TRIGGERS LOG_ROLES criados");
	});
	var sql = `CREATE TRIGGER responsibles AFTER UPDATE ON responsibles FOR EACH ROW
  INSERT INTO responsibles (originalid, changetime, user, type, typeid) 
VALUES (NEW.id, NOW(), OLD.user, OLD.type, OLD.typeid);
	`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("TRIGGERS LOG_RESPONSIBLES criados");
	});
});

*/