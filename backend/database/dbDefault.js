const createTableQueries = {
    usuarios: `
        CREATE TABLE IF NOT EXISTS usuario (
            id_usuario INT PRIMARY KEY AUTO_INCREMENT,
            nome_usuario VARCHAR(256) NOT NULL,
            email_usuario VARCHAR(256) NOT NULL,
            senha_usuario VARCHAR(256) NOT NULL,
            diretoria_usuario BOOLEAN DEFAULT FALSE,
            permissao_usuario VARCHAR(1) NOT NULL DEFAULT '1',
            admin_usuario BOOLEAN DEFAULT FALSE,
            userPhoto VARCHAR(512)
        );
    `,
    salaPresencial: `
        CREATE TABLE salaPresencial (
            id_sala_presencial INT PRIMARY KEY AUTO_INCREMENT,
            nome VARCHAR(100) NOT NULL,
            tamanho ENUM('Pequena', 'Média', 'Grande','Auditório') NOT NULL DEFAULT 'Pequena', 
            vagas INT,
            permissao_sala VARCHAR(1) NOT NULL DEFAULT '1'
        );
    `,
    salaOnline: `
        CREATE TABLE salaOnline (
            id_sala_online INT PRIMARY KEY AUTO_INCREMENT,
            nome VARCHAR(100) NOT NULL,
            link VARCHAR(256)
        );
    `,
    reuniao: `
        CREATE TABLE reuniao (
            id_reuniao INT PRIMARY KEY AUTO_INCREMENT,
            meeting_id VARCHAR(20),
            meeting_link VARCHAR(150),
            titulo VARCHAR(100) NOT NULL,
            descricao TEXT,
            data_inicio DATETIME NOT NULL,
            data_final DATETIME,
            duracao INT,
            tipo ENUM('Presencial', 'Hibrido', 'Online') NOT NULL DEFAULT 'Presencial', 
            sala_presencial_id INT,
            sala_online_id INT,
            organizador_id INT,
            FOREIGN KEY (sala_presencial_id) REFERENCES salaPresencial(id_sala_presencial) ON DELETE CASCADE,
            FOREIGN KEY (sala_online_id) REFERENCES salaOnline(id_sala_online) ON DELETE CASCADE,
            FOREIGN KEY (organizador_id) REFERENCES usuario(id_usuario) ON DELETE CASCADE
        );
    `,
    anexo: `
        CREATE TABLE anexo (
            id_anexo INT PRIMARY KEY AUTO_INCREMENT,
            reuniao_id INT,
            anexo VARCHAR(256),
            FOREIGN KEY (reuniao_id) REFERENCES reuniao(id_reuniao) ON DELETE CASCADE
        );
    `,
    observacao: `
        CREATE TABLE observacao (
            id_observacao INT PRIMARY KEY AUTO_INCREMENT,
            reuniao_id INT,
            observacao TEXT,
            FOREIGN KEY (reuniao_id) REFERENCES reuniao(id_reuniao) ON DELETE CASCADE
        );
    `,
    participante_reuniao: `
        CREATE TABLE participante_reuniao (
    usuario_id INT,
    reuniao_id INT,
    id_participanteReuniao INT,
    PRIMARY KEY (usuario_id, reuniao_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (reuniao_id) REFERENCES reuniao(id_reuniao) ON DELETE CASCADE
    );
    `,
    notificacao_reuniao: `
        CREATE TABLE notificacao_reuniao (
            id_notificacao INT PRIMARY KEY AUTO_INCREMENT,
            mensagem VARCHAR(256),
            reuniao_id INT,
            lida BOOLEAN DEFAULT FALSE,
            data_notificacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (reuniao_id) REFERENCES reuniao(id_reuniao) ON DELETE CASCADE
        );
    `,
    preferencias_usuario: `
        CREATE TABLE preferencias_usuario (
            id_preferencias INT PRIMARY KEY AUTO_INCREMENT,
            usuario_id INT UNIQUE,
            tema ENUM('Dark', 'Light', 'Compatibilidade') NOT NULL DEFAULT 'Dark',
            idioma ENUM('Português', 'Inglês', 'Espanhol') NOT NULL DEFAULT 'Português',
            notificacoes_ativadas BOOLEAN DEFAULT TRUE,
            notificacoes_email BOOLEAN DEFAULT TRUE,
            notificacoes_sms BOOLEAN DEFAULT FALSE,
            notificacoes_whatsapp BOOLEAN DEFAULT FALSE,
            FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario) ON DELETE CASCADE
        );
    `,
    triggerAfterReuniaoInsert: `
    CREATE TRIGGER after_reuniao_insert
    AFTER INSERT ON reuniao
    FOR EACH ROW
        BEGIN
            INSERT INTO notificacao_reuniao (mensagem, reuniao_id, lida)
            VALUES (CONCAT('Nova reunião agendada: ', NEW.titulo), NEW.id_reuniao, FALSE);
        END 
    `
};

module.exports = createTableQueries;
