var multer = require('multer');

var session = require('express-session');
var cookieParser = require('cookie-parser');

var mysql = require('mysql2');
var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");

/* var cors = require('cors'); */
var app = express();
var server = http.createServer(app);

const cors = require('cors');

const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 200 // limit each IP to 100 requests per windowMs
});

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "fatec",
	database: "db"
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './')));
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(cors({
	origin: 'http://localhost:5173',
	methods: ['POST', 'GET','PUT', 'DELETE'],
	credentials: true
}));

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({
	secret: 'secret', //Chave gerada para o cookie de sessão
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false,
		maxAge: 1000 * 60 * 60 * 24 //Tempo em milisegundos que o cookie vai durar
	}
}))


// FUNÇÃO PARA RECEBER OS JSON DOS PROCESSOS GERAIS NA ROTA localhost:3000/

app.get("/", (req, res) => {
	con.connect(function (err) {
		if (err) throw err;
		console.log("Conectado");

		var sql = 'SELECT id, status, name, DATE_FORMAT(created, "%y-%m-%d %H:%i:%S") AS created, DATE_FORMAT(deadline, "%y-%m-%d %H:%i:%S") AS deadline, description FROM processes';
		console.log(`rodando`)
		con.query(sql, function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});



///// ROTA PARA COLETA DAS LOGS

app.get("/logProcess", (req, res) => {
	con.connect(function (err) {
		if (err) throw err;
		console.log("Dados solicitados para tabela de processos");

		var sql = 'SELECT * FROM log_processes';
		con.query(sql, req.url.substring(4), function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});

app.get("/logTask", (req, res) => {
	con.connect(function (err) {
		if (err) throw err;
		console.log("Dados solicitados para tabela de log test");

		var sql = 'SELECT * FROM log_tasks';
		con.query(sql, req.url.substring(4), function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});

app.get("/log_users", (req, res) => {
	con.connect(function (err) {
		if (err) throw err;
		console.log("Dados solicitados para tabela log usuários");

		var sql = 'SELECT * FROM log_users';
		con.query(sql, req.url.substring(4), function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});

app.get("/log_roles", (req, res) => {
	con.connect(function (err) {
		if (err) throw err;
		console.log("Dados solicitados para tabela log usuários");

		var sql = 'SELECT * FROM log_roles';
		con.query(sql, req.url.substring(4), function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});

app.get("/log_evidences", (req, res) => {
	con.connect(function (err) {
		if (err) throw err;
		console.log("Dados solicitados para tabela log usuários");

		var sql = 'SELECT * FROM log_evidences';
		con.query(sql, req.url.substring(4), function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});

app.get("/log_template_processes", (req, res) => {
	con.connect(function (err) {
		if (err) throw err;
		console.log("Dados solicitados para tabela log usuários");

		var sql = 'SELECT * FROM log_template_processes';
		con.query(sql, req.url.substring(4), function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});

app.get("/log_template_processes", (req, res) => {
	con.connect(function (err) {
		if (err) throw err;
		console.log("Dados solicitados para tabela log usuários");

		var sql = 'SELECT * FROM log_template_processes';
		con.query(sql, req.url.substring(4), function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});

app.get("/log_template_evidences", (req, res) => {
	con.connect(function (err) {
		if (err) throw err;
		console.log("Dados solicitados para tabela log usuários");

		var sql = 'SELECT * FROM log_template_evidences';
		con.query(sql, req.url.substring(4), function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});





// FUNÇÃO PARA CRIAR NOVAS TAREFAS NO BANCO DE DADOS
app.post('/t', function (req, res) {
	const process = req.body.process;
	const active = req.body.active;
	const status = req.body.status;
	const name = req.body.name;
	const deadline = req.body.deadline;
	const description = req.body.description;

	const { authorization } = true;

	if (authorization) {
		con.connect(function (err) {
			if (err) throw err;
			console.log("Inserindo tarefas no banco de dados");

			var sql = `INSERT INTO tasks (process, active, status, name, created, deadline, description) VALUES (${process}, ${active}, ${status}, ${name}, NOW(), ${deadline}, ${description})`
			con.query(sql, [task.name, task.deadline, task.description], function (err, result) {
				if (err) throw err;
				res.status(200).send({ message: "Tarefa criada com sucesso!" });
			});
		});
	} else {
		res.status(400).send({ message: "Falha de autenticação verificar credenciais" });
	}
});




app.put('/t/:id', function (req, res) {
	const taskId = req.params.id;
	const updatedTaskData = req.body;
	const { process, active, status, name, deadline, description } = updatedTaskData;
	const { authorization } = req.headers;



	if (authorization) {
		con.connect(function (err) {
			if (err) throw err;
			console.log("Atualizando tarefa no banco de dados");

			var sql = `UPDATE tasks SET process = ?, active = ?, status = ?, name = ?, deadline = ?, description = ? WHERE id = ?`;
			con.query(sql, [process, active, status, name, deadline, description, taskId], function (err, result) {
				if (err) throw err;

				res.status(200).send({ message: "Tarefa atualizada com sucesso!" });
			});
		});
	} else {
		res.status(400).send({ message: "O nome e o prazo são obrigatórios!" });
	}
});



// FUNÇÃO PARA RECEBER OS JSON DOS USUARIOS NA ROTA localhost:3000/us

app.get("/us", (req, res) => {
	con.connect(function (err) {
		if (err) throw err;
		console.log("Conectado Usuarios");

		var sql = 'SELECT id, admin, name, email, role FROM users';
		con.query(sql, function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});

app.get("/roles", (req, res) => {
	con.connect(function (err) {
		if (err) throw err;
		console.log("Conectado Roles");

		var sql = 'SELECT id, name FROM roles';
		con.query(sql, function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});


// FUNÇÃO QUE FAZ O CADASTRO DE NOVOS USUÁRIOS NO BANCO DE DADOS
app.post('/register', function (req, res) {
	const { login, apelido, email, senha, tel } = req.body;
	console.log(`recebidos os dados: ${login}, ${apelido}, ${email}, ${senha}, ${tel}`)
	if (login != "" && apelido != "" && email != "" && senha != "" && tel != "") {
		con.connect(function (err) {
			if (err) throw err;
			console.log("Inserindo");
			var sql = 'INSERT INTO users (admin, name, nickname, password, phone, email, image, role) VALUES (0, ?, ?, ?, ?, ?, "", 4)';
			con.query(sql, [login, apelido, senha, tel, email ], function (err, result) {
				if (err) throw err;
			});
			console.log("usuario cadastrado com sucesso")
		});
	} else {
		console.log("Erro");
	}
});


// FUNÇÃO QUE CHECA SE O USUÁRIO E SUA SENHA CONSTAM NO BANCO DE DADOS PARA FAZER O LOGIN
app.post('/login', function (req, res) {
	const { username, senha } = req.body; // Use req.body para acessar os valores enviados no corpo da solicitação

	con.connect(function (err) {
		if (err) throw err;

		console.log("Verificando Cadastro");
		const sql = 'SELECT * FROM users WHERE name = ? AND password = ?';
		con.query(sql, [username, senha], (err, result) => {
			if (err) return res.json({ Message: "Erro no servidor" });
			if (result.length > 0) {
				console.log(username);
				req.session.username = result[0].name;
				req.session.admin = result[0].admin;
				req.session.role = result[0].role; 

				console.log(req.session.username, 'username', 'Admin: ', req.session.admin,' Role: ', req.session.role)
				return res.json({ Login: true, username: req.session.username, admin: req.session.admin, role:req.session.role });
			} else {
				console.log('Usuário não encontrado', username, senha);
				return res.json({ Login: false });
			}
		});
	});
});


//FUNÇÃO PARA A CHECAGEM DE COOKIES DE USUARIO
app.get("/ck", (req, res) => {
	con.connect(function (err) {
		if (err) throw err;
		console.log("Buscando Cookies");

		if (req.session.username) {
			console.log('Achei')
			return res.json({ valid: true, username: req.session.username, admin:req.session.admin, role: req.session.role })
		} else {
			console.log('Não achei')
			return res.json({ valid: false })
		}
	});
});

//FUNÇÃO PARA ATUALIZAR A ROLE DE USUARIO
app.put('/atualizarRole/:userId', (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;

	console.log('Recebido PUT request:', req.params, req.body);

    // Execute a consulta SQL para atualizar o campo 'role' para o usuário com o userId.
    var sql = 'UPDATE users SET role = ? WHERE id = ?';

    con.query(sql, [role, userId], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar a role:', err);
            res.status(500).json({ message: 'Erro ao atualizar a role' });
        } else {
			console.log('Atualização efetuada')
            res.json({ message: 'Role atualizada com sucesso' });
        }
    });
});


////// FUNÇÕES ORIGINAIS
//FUNÇÕES DE INSERT
// FUNÇÃO PARA CRIAR NOVOS PROCESSOS NO BANCO DE DADOS

app.post('/createprocess', function (req, res) {
    console.log(req.body);
    const { active, status, name, description } = req.body;

    // Executa a consulta SQL para criar um novo processo incluindo active
    const sql = 'INSERT INTO processes (active, status, name, created, deadline, description) VALUES (?, ?, ?, NOW(), NOW(), ?)';
    con.query(sql, [active, status, name, description], function (err, result) {
        if (err) {
            console.error('Erro ao criar processo:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }

        console.log('Processo criado com sucesso');
        return res.status(201).json({ message: 'Processo criado com sucesso', processId: result.insertId });
    });
});

// FUNÇÃO PARA CRIAR NOVAS TASKS NO BANCO DE DADOS
app.post('/createtask', function (req, res) {
	console.log(req.body);
	const { process, active, status, name, description } = req.body;

	// Executa a consulta SQL para criar uma nova tarefa incluindo process e active
	const sql = 'INSERT INTO tasks (process, active, status, name, deadline, description) VALUES (?, ?, ?, ?, NOW(), ?)';
	con.query(sql, [process, active, status, name, description], function (err, result) {
	  if (err) {
		console.error('Erro ao criar tarefa:', err);
		return res.status(500).json({ error: 'Erro interno do servidor' });
	  }
  
	  console.log('Tarefa criada com sucesso');
	  return res.status(201).json({ message: 'Tarefa criada com sucesso', taskId: result.insertId });
	});
  });

// FUNÇÃO PARA CRIAR NOVAS EVIDENCIAS NO BANCO DE DADOS
app.post('/evidence', function (req, res) {
	const { task, name, deadline, url } = req.body;
	const { authorization } = req.headers;
	if (name != "" && deadline != "") {
		con.connect(function (err) {
			if (err) throw err;
			console.log("Inserindo");
			var sql = 'INSERT INTO evidences (task, status, name, created, deadline, type, url) VALUES (?, 0, ?, NOW(), ?, "TEXT", ?)';
			con.query(sql, [task, name, deadline, url], function (err, result) {
				if (err) throw err;
			});
		});
	} else {
		console.log("Erro");
	}
	return res.redirect('http://localhost:5173/processos');
});

// FUNÇÕES DE UPDATE
// FUNÇÃO PARA ATUALIZAR PROCESSOS NO BANCO DE DADOS
app.post('/updateprocess', function (req, res) {
	const { status, name, deadline, id } = req.body;
	const { authorization } = req.headers;
	if (name != "" && deadline != "") {
		con.connect(function (err) {
			if (err) throw err;
			console.log("Atualizando");
			var sql = 'UPDATE processes SET status = ?, name = ?, deadline = ? WHERE id = ?';
			con.query(sql, [status, name, deadline, id], function (err, result) {
				if (err) throw err;
			});
		});
	} else {
		console.log("Erro");
	}
	return res.redirect('http://localhost:5173/processos');
});

// FUNÇÃO PARA ATUALIZAR TASKS NO BANCO DE DADOS
app.post('/updatetask/:id', function (req, res) {
    const taskId = req.params.id;
    const { status, name, deadline, description } = req.body;

    // Convertendo a data para o formato correto (YYYY-MM-DD)
    const formattedDeadline = deadline ? deadline.split('/').reverse().join('-') : null;

    const sql = 'UPDATE tasks SET status = ?, name = ?, deadline = STR_TO_DATE(?, "%Y-%m-%d"), description = ? WHERE id = ?';

    // Adicionando console.log para verificar o comando SQL
    console.log('Comando SQL:', sql);
    console.log('Parâmetros:', [status, name, formattedDeadline, description, taskId]);

    con.query(sql, [status, name, formattedDeadline, description, taskId], function (err, result) {
        if (err) {
            console.error('Erro ao atualizar tarefa:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }

        console.log('Tarefa atualizada com sucesso');
        return res.status(200).json({ message: 'Tarefa atualizada com sucesso' });
    });
});


// FUNÇÃO PARA ATUALIZAR EVIDENCIAS NO BANCO DE DADOS
app.post('/updateevidence', function (req, res) {
	const { status, name, url, id } = req.body;
	const { authorization } = req.headers;
	if (name != "" && deadline != "") {
		con.connect(function (err) {
			if (err) throw err;
			console.log("Atualizando");
			var sql = 'UPDATE evidences SET status = ?, name = ?, url = ? WHERE id = ?)';
			con.query(sql, [status, name, url, id], function (err, result) {
				if (err) throw err;
			});
		});
	} else {
		console.log("Erro");
	}
	return res.redirect('http://localhost:5173/processos');
});

// FUNÇÕES DE DELETE
// FUNÇÃO PARA DELETAR PROCESSOS NO BANCO DE DADOS
app.post('/deleteprocess', function (req, res) {
	const { id } = req.body;
	const { authorization } = req.headers;
	if (name != "" && deadline != "") {
		con.connect(function (err) {
			if (err) throw err;
			console.log("Deletando");
			var sql = 'DELERE FROM processes WHERE id = ?';
			con.query(sql, id, function (err, result) {
				if (err) throw err;
			});
		});
	} else {
		console.log("Erro");
	}
	return res.redirect('http://localhost:5173/processos');
});

app.post('/deletetask/:id', function (req, res) {
	const taskId = req.params.id;
  
	const sql = 'DELETE FROM tasks WHERE id = ?';
	con.query(sql, taskId, function (err, result) {
	  if (err) {
		console.error('Erro ao excluir tarefa:', err);
		return res.status(500).json({ error: 'Erro interno do servidor' });
	  }
  
	  console.log('Tarefa excluída com sucesso');
	  return res.status(200).json({ message: 'Tarefa excluída com sucesso' });
	});
  });


// FUNÇÃO PARA DELETAR EVIDENCIAS NO BANCO DE DADOS
app.post('/deleteevidence', function (req, res) {
	const { id } = req.body;
	const { authorization } = req.headers;
	if (name != "" && deadline != "") {
		con.connect(function (err) {
			if (err) throw err;
			console.log("Deletando");
			var sql = 'DELERE FROM evidences WHERE id = ?';
			con.query(sql, id, function (err, result) {
				if (err) throw err;
			});
		});
	} else {
		console.log("Erro");
	}
	return res.redirect('http://localhost:5173/processos');
});

//UPLOAD DE ARQUIVOS
var location = "";
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		location = "";
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname);
		location = Date.now() + '-' + file.originalname;
	}
});
const upload = multer({ storage: storage });

module.exports = upload;

//UPLOAD DE ARQUIVOS
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: location });
});

app.listen(PORT, () => {
	console.log(`Servidor recebendo dados no port ${PORT}`);
});

