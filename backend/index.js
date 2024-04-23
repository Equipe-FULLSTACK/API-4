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

const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 200 // limit each IP to 100 requests per windowMs
});

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "fatec",
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


app.listen(PORT, () => {
	console.log(`Servidor recebendo dados no port ${PORT}`);
});

//SELECT USUARIOS
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
//SELECT USUARIO
app.get("/us/:id", (req, res) => {
	con.connect(function (err) {
		const id_usuario = req.params.id;
		if (err) throw err;
		console.log("Conectado Usuario");

		var sql = 'SELECT * FROM usuarios WHERE id_usuario = ?';
		con.query(sql, id_usuario, function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});

//SELECT AGENDAMENTOS
app.get("/ag", (req, res) => {
	con.connect(function (err) {
		if (err) throw err;
		console.log("Conectado Agendamentos");

		var sql = 'SELECT * FROM agendamentos';
		con.query(sql, function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});
//SELECT AGENDAMENTOS DE UM USUARIO
app.get("/agus/:id", (req, res) => {
	const id_usuario = req.params.id;
	con.connect(function (err) {
		if (err) throw err;
		console.log("Conectado Agendamentos de Usuario");

		var sql = 'SELECT * FROM agendamentos WHERE id_usuario = ?';
		con.query(sql, id_usuario, function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});

//SELECT REUNIOES
app.get("/re", (req, res) => {
	con.connect(function (err) {
		if (err) throw err;
		console.log("Conectado Reunioes");

		var sql = 'SELECT * FROM reunioes';
		con.query(sql, function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});

//SELECT REUNIAO DE UM AGENDAMENTO
app.get("/reag/:id", (req, res) => {
	const id_agendamento = req.params.id;
	con.connect(function (err) {
		if (err) throw err;
		console.log("Conectado Reuniao");

		var sql = 'SELECT * FROM reunioes WHERE agendamento = ?';
		con.query(sql, id_agendamento, function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});

//SELECT PARTICIPANTES DE UMA REUNIAO
app.get("/pa/:id", (req, res) => {
	const id_reuniao = req.params.id;
	con.connect(function (err) {
		if (err) throw err;
		console.log("Conectado Participantes");

		var sql = 'SELECT * FROM reunioes WHERE id_reuniao = ?';
		con.query(sql, id_reuniao, function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});


//SELECT SALAS
app.get("/salas", (req, res) => {
	con.connect(function (err) {
		if (err) throw err;
		console.log("Conectado Salas");

		var sql = 'SELECT * FROM salas';
		con.query(sql, function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});
//SELECT SALAS FISICAS
app.get("/salasf", (req, res) => {
	con.connect(function (err) {
		if (err) throw err;
		console.log("Conectado Salas Fisicas");

		var sql = 'SELECT * FROM salas WHERE tipo_sala = "fisica"';
		con.query(sql, function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});
//SELECT SALAS HIBRIDAS
app.get("/salash", (req, res) => {
	con.connect(function (err) {
		if (err) throw err;
		console.log("Conectado Salas Hibridas");

		var sql = 'SELECT * FROM salas WHERE tipo_sala = "hibrida"';
		con.query(sql, function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});
//SELECT SALAS VIRTUAIS
app.get("/salasv", (req, res) => {
	con.connect(function (err) {
		if (err) throw err;
		console.log("Conectado Salas Virtuais");

		var sql = 'SELECT * FROM salas WHERE tipo_sala = "virtual"';
		con.query(sql, function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});
//SELECT SALA POR ID
app.get("/sala/:id", (req, res) => {
	const id_sala = req.params.id;
	con.connect(function (err) {
		if (err) throw err;
		console.log("Conectado Sala");

		var sql = 'SELECT * FROM salas WHERE id_sala = ?';
		con.query(sql, id_sala, function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});
});


app.get('/inus', function (req, res) {
    const { nome, email, senha, diretoria, permissao } = req.body;

    // Executa a consulta SQL para criar um novo processo incluindo active
    const sql = 'INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario, diretoria_usuario, permissao_usuario) VALUES (?, ?, ?, ?, ?)';
	con.query(sql, [nome, email, senha, diretoria, permissao], function (err, result) {
        if (err) {
            console.error('Erro ao inserir usuario:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }

        console.log('Usuario inserido');
        return res.status(201).json({ message: 'Usuario inserido'});
    });
});