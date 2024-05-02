const defaultSQL = `
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario VARCHAR(256) NOT NULL,
    email_usuario VARCHAR(256) NOT NULL,
    senha_usuario VARCHAR(256) NOT NULL,
    diretoria_usuario BOOLEAN DEFAULT FALSE,
    permissao_usuario VARCHAR(256) NOT NULL,
    admin_usuario BOOLEAN DEFAULT FALSE,
    userPhoto VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS reunioes (
    id_reuniao INT AUTO_INCREMENT PRIMARY KEY,
    id_agendamento INT NOT NULL,
    tipo_reuniao VARCHAR(256) NOT NULL,
    titulo_reuniao VARCHAR(256) NOT NULL,
    datetime_inicio DATETIME NOT NULL, 
    datetime_final DATETIME NOT NULL,
    pauta_reuniao VARCHAR(256) NOT NULL,
    responsavel_reuniao VARCHAR(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS agendamentos (
    id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_sala INT NOT NULL,
    datetime_inicio DATETIME NOT NULL,
    datetime_final DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS participantes (
    id_participantes INT AUTO_INCREMENT PRIMARY KEY,
    id_reuniao INT NOT NULL,
    nome_participante VARCHAR(256) NOT NULL, 
    email_participante VARCHAR(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS salas (
    id_sala INT AUTO_INCREMENT PRIMARY KEY,
    nome_sala VARCHAR(256) NOT NULL,
    tipo_sala VARCHAR(256) NOT NULL,
    permissao_sala BOOLEAN NOT NULL, 
    link_sala VARCHAR(256),
    vagas_sala INT
);
`;

module.exports = defaultSQL;
