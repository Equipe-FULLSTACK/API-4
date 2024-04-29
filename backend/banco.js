var mysql = require('mysql2');
	
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "api4"
});
	
var sql = `create table  usuarios (
	id_usuario int primary key auto_increment,
    nome_usuario varchar(256) not null,
    email_usuario varchar(256) not null,
    senha_usuario varchar(256) not null,
    diretoria_usuario boolean default 0,
    permissao_usuario varchar(256) not null,
    admin_usuario boolean default 0,
    userPhoto varchar(256)
    );`;
con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("Table usuarios criada");
});
	
var sql = `create table reunioes (
	id_reuniao int primary key auto_increment,
    id_agendamento int not null,
    # foreign key (id_agendamento) references agendamentos (id_agendamentos),
    tipo_reuniao varchar(256) not null,
    titulo_reuniao varchar (256) not null,
    datetime_inicio datetime not null, 
    datetime_final datetime not null,
    pauta_reuniao varchar(256) not null,
    responsavel_reuniao varchar(256) not null 
    );`;
con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("Table reunioes criada");
});
	
var sql = `create table agendamentos (
	id_agendamento int primary key auto_increment,
    id_usuario int not null,
    # foreign key (id_usuario) references usuarios (id_usuario),
    id_sala int not null,
    # foreign key (id_sala) references salas (id_sala), 
    datetime_inicio datetime not null,
    datetime_final datetime not null
	);`;
con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("Table agendamentos criada");
});
	
var sql = `create table participantes (
	id_participantes int primary key auto_increment,
    id_reuniao int not null,
    nome_participante varchar(256) not null, 
    email_participante varchar (256) not null
	);`;
con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("Table participantes criada");
});
	
var sql = `create table salas (
	id_sala int primary key auto_increment not null,
    nome_sala VARCHAR(256) not null,
    tipo_sala varchar(256) not null,
    permissao_sala boolean not null, 
    link_sala VARCHAR(256),
    vagas_sala int
	);`;
con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("Table salas criada");
});