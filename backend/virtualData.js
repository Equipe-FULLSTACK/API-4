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
	
	//DADOS GENÉRICOS PROCESSOS
	var sql = `INSERT INTO processes (active, status, name, created, deadline, description) VALUES 
	(1, 'Atrasada', 'Processo 1', NOW(), '2023-12-31', 'Criação sistema documentação para departamento de vendas.'),
	(1, 'Andamento', 'Processo 2', NOW(), '2023-11-15', 'Implementação de novas políticas de segurança da informação.'),
	(0, 'Concluida', 'Processo 3', NOW(), '2023-10-20', 'Treinamento de novos funcionários para a equipe de suporte técnico.'),
	(1, 'Atrasada', 'Processo 4', NOW(), '2023-09-30', 'Desenvolvimento de um aplicativo móvel para clientes.'),
	(1, 'Andamento', 'Processo 5', NOW(), '2023-11-10', 'Planejamento e organização de um evento corporativo.'),
	(0, 'Concluida', 'Processo 6', NOW(), '2023-08-25', 'Revisão e atualização da política de privacidade da empresa.'),
	(1, 'Atrasada', 'Processo 7', NOW(), '2023-09-15', 'Implementação de um sistema de gerenciamento de projetos.'),
	(1, 'Andamento', 'Processo 8', NOW(), '2023-11-05', 'Desenvolvimento de um novo produto para o mercado.'),
	(0, 'Concluida', 'Processo 9', NOW(), '2023-10-05', 'Análise de mercado para identificação de oportunidades de negócios.'),
	(1, 'Atrasada', 'Processo 10', NOW(), '2023-12-05', 'Elaboração de um plano estratégico para o próximo ano.');`;

	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Inserido dados processos genéricos para aplicação.");
	});


	//DADOS DE ROLES
	var sql =`INSERT INTO roles (id, name, editroles, editusers, editprocesses, edittasks, edittemplates, editevidences, viewprocesses, viewtasks, viewevidences) VALUES 
	('1', 'admin', '1', '1', '1', '1', '1', '1', '1', '1', '1'),
	('2', 'gerente', '0', '0', '1', '1', '1', '1', '1', '1', '1'),
	('3', 'desenvolvedor', '0', '0', '0', '1', '1', '1', '1', '1', '1'),
	('4', 'c-level', '0', '0', '0', '0', '0', '0', '1', '1', '1');`;

	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Inserido dados de roles para aplicação.");
	});


	// CREATE DEFAULT USERS
	var sql = `INSERT INTO users (admin, name, nickname, password, phone, email, image, role) VALUES 
	(1, "admin", "admin", "admin", "129999-9999", "admin@admin.com.br", "https://avatars.githubusercontent.com/u/127335772?v=4", 1),
	(1, "leo", "leo", "leo", "123-456", "leo@leo.com", "", 3),
	(1, "pedro", "pedro", "pedro", "654-321", "pedro@pedro.com", "", 2),
	(1, "thiago", "thiago", "thiago", "456-123", "thiago@thiago.com", "", 3),
	(1, "juliano", "juliano", "juliano", "123-456", "juliano@juliano.com", "", 2);`;
	
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Criado usuários padrão");
	});

	//DADOS GENÉRICOS TASKS
	var sql = `INSERT INTO tasks (process, active, status, name, created, deadline, description) VALUES 
	(1, 1, 'Andamento', 'Task 1: Revisar requisitos', NOW(), '2023-11-10', 'Revisão dos requisitos para o sistema de documentação de vendas');`
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Inserido dados tarefas genéricos para aplicação.");
	});
});
