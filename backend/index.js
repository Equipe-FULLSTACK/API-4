require('dotenv').config();
var multer = require('multer');
const axios = require('axios');
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

const token = process.env.TOKEN;
const apiKey = process.env.ZOOM_API_KEY;


const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 200 // limit each IP to 100 requests per windowMs
});

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "api4"
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


/* -------------------------------- INTEGRAÇÃO API ZOOM -------------------------------- */

global.token = "";


app.get("/auth", (req, res) => {
	res.redirect("https://zoom.us/oauth/authorize?client_id=" + process.env.ZOOM_API_KEY + "&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Ftoken")
});


app.get('/token', async (req,res)=>{
    const code = req.query.code;

    try{
        const response = await axios.post(
            'https://zoom.us/oauth/token',
            null,
            {
                params:{
                    grant_type: 'authorization_code',
                    code:code,
                    redirect_uri: process.env.REDIRECT_URI
                },
                headers:{
                    'Authorization':`Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`
                }
            }
        );

		global.token = response.data.access_token;
		console.log(`Valor do Token de Acesso: ${global.token} \n`);
        res.send(response.data.access_token);
    }catch(error){
        console.log('Erro',error);
        res.send('ERRO');
    }

});
    

async function createMeeting(topic, start_time, type, duration, timezone, agenda){
    try{
        const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
            topic,
            type,
            start_time,
            duration,
            timezone,
            agenda,
            settings:{
                host_video:true,
                participant_video:true,
                join_before_host:true,
                mute_upon_entry:true,
                watermark:false,
                use_pmi:false,
                approval_type:0,
                audio:'both',
                auto_recording:'none'
            }
        }, {
            headers:{
                'Authorization': `Bearer ${global.token}`
            }
        });
        const body = response.data;

    }catch(error){
        console.log('Error',error)
    }
}


app.post('/criar_reuniao', async (req, res) => {
    console.log('Request body:', req.body); // Log the request body

    const { topic, start_time, duration, agenda } = req.body;
    const timezone = 'UTC';
    const type = 2;

    try {
        const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
            topic,
            type,
            start_time,
            duration,
            timezone,
            agenda,
            settings: {
                host_video: true,
                participant_video: true,
                join_before_host: true,
                mute_upon_entry: true,
                watermark: false,
                use_pmi: false,
                approval_type: 0,
                audio: 'both',
                auto_recording: 'none'
            }
        }, {
            headers: {
                'Authorization': `Bearer ${global.token}`
            }
        });

        const createdMeeting = response.data;
        console.log('Meeting created:', createdMeeting);

        // Send a success response to the frontend
        res.status(200).json({ success: true, meeting: createdMeeting });
    } catch (error) {
        console.error('Error creating meeting:', error);

        // Send an error response to the frontend
        res.status(500).json({ success: false, error: 'Error creating meeting' });
    }
});

// Define getMeetings function to fetch meetings from Zoom API
async function getMeetings() {
    try {
        const response = await axios.get('https://api.zoom.us/v2/users/me/meetings', {
            headers: {
                'Authorization': `Bearer ${global.token}`
            }
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching meetings:', error);
        throw error; // Rethrow the error to handle it in the route handler
    }
}

// Define route to list meetings
app.get('/listar_reuniao', async (req, res) => {
    try {
        const meetings = await getMeetings();
        res.json({ success: true, meetings });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error fetching meetings' });
    }
});

/*
app.get('/criar_reuniao', async (req,res)=>{

    console.log(await getMeetings());
    console.log(await createMeeting(
    'Apresentação Sprint',
    '2024-5-15T9:00:00',
    2,
    30,
    'UTC',
    'Reunião da Apresentação da Sprint'
));
    console.log(await getMeetings());
});
*/

/* ----------------------------------------------------------------------------------------- */

/*
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
*/

/*
// FUNÇÃO PARA RECEBER OS JSON DAS SALAS
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
*/


// FUNÇÃO PARA RECEBER OS JSON DOS USUARIOS NA ROTA localhost:3000/us
app.get("/us", (req, res) => {
	con.connect(function (err) {
		if (err) throw err;
		console.log("Conectado Usuarios");

		var sql = 'SELECT * FROM usuarios';
		con.query(sql, function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});


// FUNÇÃO QUE FAZ O CADASTRO DE NOVOS USUÁRIOS NO BANCO DE DADOS
app.post('/register', function (req, res) {
	const { nome, email, diretoria, permissao, senha, admin } = req.body;
	console.log(`recebidos os dados: ${nome}, ${email}, ${diretoria}, ${permissao}, ${senha}, ${admin}`)
	if (nome != "" && email != "" && diretoria != "" && permissao != "" && senha != "") {
		con.connect(function (err) {
			if (err) throw err;
			console.log("Inserindo");
		var sql = 'INSERT INTO usuarios (nome, email, diretoria, permissao, senha, admin) VALUES (?, ?, ?, ?, ?, 0)';
			con.query(sql, [nome, email, diretoria, permissao, senha, admin], function (err, result) {
				if (err) throw err;
			});
			console.log("Usuario cadastrado com sucesso")
		});
	} else {
		console.log("Erro");
	}
});





/*
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
*/

/*
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
*/

app.listen(PORT, () => {
	console.log(`Servidor recebendo dados no port ${PORT}`);
});

