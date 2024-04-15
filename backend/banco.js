var mysql = require('mysql2');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Conectado");
	
	var sql = `create database api4 if not exists;`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Database api4 criada");
	});
	
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
    admin_usuario boolean default 0
    );`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Table usuarios criada");
	});
	
	var sql = `create table reunioes (
	id_reuniao int primary key auto_increment,
    id_agendamento int not null,
    # foreign key (id_agendamento) references agendamentos (id_agendamentos),
    id_participante int not null,
    # foreign key (id_participante) references participantes (id_participantes),
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
    id_reuniao int not null,
    # foreign key (id_reuniao) references reunioes (id_reuniao),
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
    nome_participante varchar(256) not null, 
    email_participante varchar (256) not null
	);`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Table participantes criada");
	});
	
	var sql = `create table salas (
	id_sala int primary key auto_increment not null,
    id_sala_fisica int not null,
    # foreign key (id_sala_fisica) references sala_fisica (id_sala_fisica), 
    id_sala_virtual int not null,
    # foreign key (id_sala_virtual) references sala_virtual (id_sala_virtual),
    id_sala_hibrida int not null,
    # foreign key (id_sala_hibrida) references sala_hibrida (id_sala_hibrida),
    permissao_sala boolean not null, 
    tipo_sala varchar(256) not null
	);`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Table salas criada");
	});
	
	var sql = `create table sala_fisica (
	id_sala_fisica int primary key not null,
    nome_sala_fisica varchar(256) not null,
    permissao_sala_fisica varchar(256) not null,
    vagas_sala_fisica int not null
	);`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Table sala_fisica criada");
	});
	
	var sql = `create table sala_virtual (
	id_sala_virtual int primary key not null,
    nome_sala_virtual varchar(256) not null,
    permissao_sala_virtual varchar(256) not null,
    link_sala_virtual varchar(256) not null
	);`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Table sala_virtual criada");
	});
	
	var sql = `create table sala_hibrida (
	id_sala_hibrida int primary key not null,
    id_sala_virtual int not null,
    # foreign key (id_sala_virtual) references sala_virtual (id_sala_virtual),
    id_sala_fisica int not null,
    # foreign key (id_sala_fisica) references sala_fisica (id_sala_fisica),
    nome_sala_hibrida varchar(256) not null
	);`;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Table sala_hibrida criada");
	});
});