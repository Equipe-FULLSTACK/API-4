const createTableQueries = {
    usuarios: `
        CREATE TABLE IF NOT EXISTS usuarios (
            id_usuario INT PRIMARY KEY AUTO_INCREMENT,
            nome_usuario VARCHAR(256) NOT NULL,
            email_usuario VARCHAR(256) NOT NULL,
            senha_usuario VARCHAR(256) NOT NULL,
            diretoria_usuario BOOLEAN DEFAULT FALSE,
            permissao_usuario VARCHAR(256) NOT NULL,
            admin_usuario BOOLEAN DEFAULT FALSE,
            userPhoto VARCHAR(256)
        );
    `,
    reunioes: `
        CREATE TABLE IF NOT EXISTS reunioes (
            id_reuniao INT PRIMARY KEY AUTO_INCREMENT,
            id_agendamento INT NOT NULL,
            tipo_reuniao VARCHAR(256) NOT NULL,
            titulo_reuniao VARCHAR(256) NOT NULL,
            datetime_inicio DATETIME NOT NULL, 
            datetime_final DATETIME NOT NULL,
            pauta_reuniao VARCHAR(256) NOT NULL,
            responsavel_reuniao VARCHAR(256) NOT NULL
        );
    `,
    agendamentos: `
        CREATE TABLE IF NOT EXISTS agendamentos (
            id_agendamento INT PRIMARY KEY AUTO_INCREMENT,
            id_usuario INT NOT NULL,
            id_sala INT NOT NULL,
            datetime_inicio DATETIME NOT NULL,
            datetime_final DATETIME NOT NULL
        );
    `,
    participantes: `
        CREATE TABLE IF NOT EXISTS participantes (
            id_participantes INT PRIMARY KEY AUTO_INCREMENT,
            id_reuniao INT NOT NULL,
            nome_participante VARCHAR(256) NOT NULL, 
            email_participante VARCHAR(256) NOT NULL
        );
    `,
    salas: `
        CREATE TABLE IF NOT EXISTS salas (
            id_sala INT PRIMARY KEY AUTO_INCREMENT,
            nome_sala VARCHAR(256) NOT NULL,
            tipo_sala VARCHAR(256) NOT NULL,
            permissao_sala BOOLEAN NOT NULL, 
            link_sala VARCHAR(256),
            vagas_sala INT
        );
    `
};

module.exports = createTableQueries;
