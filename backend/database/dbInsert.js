const { reunioes, observacao, preferencias_usuario } = require("./dbDefault");

const initialInserts = {
    usuario: `
        INSERT INTO usuario (nome_usuario, email_usuario, senha_usuario, diretoria_usuario, permissao_usuario, admin_usuario, userPhoto) VALUES 
            ("admin", "admin@api.com", "123456789", 0, "4", 1, "https://images.unsplash.com/photo-1583957723119-330fc2738e64?q=80&w=2157&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
            ("Juliano", "juliano@gmail.com", "123456789", 0, "2", 0, "https://raw.githubusercontent.com/Equipe-FULLSTACK/API-4/main/readme/juliano.png"),
            ("Thiago", "thiago@gmail.com", "123456789", 0, "3", 0, "https://raw.githubusercontent.com/Equipe-FULLSTACK/API-4/main/readme/thiago.png"),
            ("Leonardo", "leo@gmail.com", "123456789", 0, "3", 0, "https://raw.githubusercontent.com/Equipe-FULLSTACK/API-4/main/readme/leo.jpg"),
            ("Willians", "will@gmail.com", "123456789", 0, "2", 0, "https://raw.githubusercontent.com/Equipe-FULLSTACK/API-4/main/readme/will.png"),
            ("Pedro", "pedro@gmail.com", "123456789", 0, "3", 0, "https://raw.githubusercontent.com/Equipe-FULLSTACK/API-4/main/readme/pedro.png"),
            ("usuario07", "user07@gmail.com", "123456789", 0, "3", 0, "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
            ("usuario08", "user08@gmail.com", "123456789", 0, "2", 0, "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
            ("usuario09", "user09@gmail.com", "123456789", 0, "2", 0, "https://plus.unsplash.com/premium_photo-1675130119373-61ada6685d63?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
            ("usuario10", "user10@gmail.com", "123456789", 0, "1", 0, "https://images.unsplash.com/photo-1615813967515-e1838c1c5116?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
            ("usuario11", "user11@gmail.com", "123456789", 1, "1", 0, "https://https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
            ("usuario12", "user12@gmail.com", "123456789", 1, "1", 0, "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");`
    ,
    
    
    salaPresencial:`
        INSERT INTO salaPresencial (nome, tamanho, vagas, permissao_sala) VALUES
            ('Sala Presencial 1', 'Pequena', 10, '1'),
            ('Sala Presencial 2', 'Pequena', 4, '1'),
            ('Sala Presencial 3', 'Média', 15, '2'),
            ('Sala Presencial 4', 'Média', 20, '2'),
            ('Sala Presencial 5', 'Grande', 15, '3'),
            ('Sala Presencial 6', 'Grande', 20, '3'),
            ('Sala Presencial 7', 'Grande', 25, '3'),
            ('Sala Presencial 8', 'Auditório', 150, '4'),
            ('Sala Presencial 9', 'Auditório', 200, '4'),
            ('Sala Presencial 10', 'Auditório', 100, '4');`
        ,

    salaOnline:`
        INSERT INTO salaOnline (nome, link) VALUES
        ('Sala Online 1', 'https://salaonline1.com'),
        ('Sala Online 2', 'https://salaonline2.com'),
        ('Sala Online 3', 'https://salaonline3.com'),
        ('Sala Online 4', 'https://salaonline4.com'),
        ('Sala Online 5', 'https://salaonline5.com');
        `
        ,

    reunioesPresenciais:`
        INSERT INTO reuniao (titulo, descricao, data_inicio, data_final, tipo, sala_presencial_id, organizador_id)
            VALUES
            ('Reunião Presencial 1', 'Discussão sobre o novo projeto', '2024-05-20 09:00:00', '2024-05-20 11:00:00', 'Presencial', 1, 1),
            ('Reunião Presencial 2', 'Apresentação de resultados do trimestre', '2024-05-22 14:00:00', '2024-05-22 16:00:00', 'Presencial', 2, 2),
            ('Reunião Presencial 3', 'Planejamento estratégico para o próximo ano', '2024-05-25 10:00:00', '2024-05-25 12:00:00', 'Presencial', 3, 3),
            ('Reunião Presencial 4', 'Avaliação de desempenho dos colaboradores', '2024-05-28 15:00:00', '2024-05-28 17:00:00', 'Presencial', 4, 4),
            ('Reunião Presencial 5', 'Brainstorming de ideias para campanha de marketing', '2024-05-30 11:00:00', '2024-05-30 13:00:00', 'Presencial', 5, 5);
        `
        ,

    reunioesHibridas:`
        INSERT INTO reuniao (titulo, descricao, data_inicio, data_final, tipo, sala_presencial_id, sala_online_id, organizador_id)
            VALUES
            ('Reunião Hibrido 1', 'Discussão sobre o novo projeto', '2024-05-21 09:00:00', '2024-05-21 11:00:00', 'Hibrido', 1, 1, 1),
            ('Reunião Hibrido 2', 'Apresentação de resultados do trimestre', '2024-05-23 14:00:00', '2024-05-23 16:00:00', 'Hibrido', 2, 2, 2),
            ('Reunião Hibrido 3', 'Planejamento estratégico para o próximo ano', '2024-05-26 10:00:00', '2024-05-26 12:00:00', 'Hibrido', 3, 3, 3),
            ('Reunião Hibrido 4', 'Avaliação de desempenho dos colaboradores', '2024-05-29 15:00:00', '2024-05-29 17:00:00', 'Hibrido', 4, 4, 4),
            ('Reunião Hibrido 5', 'Brainstorming de ideias para campanha de marketing', '2024-05-31 11:00:00', '2024-05-31 13:00:00', 'Hibrido', 5, 5, 5);
        `
        ,

    reunioesOnline:`
    INSERT INTO reuniao (titulo, descricao, data_inicio, data_final, tipo, sala_online_id, organizador_id)
        VALUES
        ('Reunião Online 1', 'Discussão sobre o novo projeto', '2024-05-21 09:00:00', '2024-05-21 11:00:00', 'Online', 1, 1),
        ('Reunião Online 2', 'Apresentação de resultados do trimestre', '2024-05-23 14:00:00', '2024-05-23 16:00:00', 'Online', 2, 2),
        ('Reunião Online 3', 'Planejamento estratégico para o próximo ano', '2024-05-26 10:00:00', '2024-05-26 12:00:00', 'Online', 3, 3),
        ('Reunião Online 4', 'Avaliação de desempenho dos colaboradores', '2024-05-29 15:00:00', '2024-05-29 17:00:00', 'Online', 4, 4),
        ('Reunião Online 5', 'Brainstorming de ideias para campanha de marketing', '2024-05-31 11:00:00', '2024-05-31 13:00:00', 'Online', 5, 5);
    `
    ,
    anexo:`
        INSERT INTO anexo (reuniao_id, anexo) 
            VALUES 
            (1, 'anexo1.pdf'),
            (2, 'anexo2.pdf'),
            (3, 'anexo3.pdf'),
            (4, 'anexo4.pdf'),
            (5, 'anexo5.pdf'),
            (6, 'anexo6.pdf'),
            (7, 'anexo7.pdf'),
            (8, 'anexo8.pdf'),
            (9, 'anexo9.pdf'),
            (10, 'anexo10.pdf'),
            (11, 'anexo11.pdf'),
            (12, 'anexo12.pdf'),
            (13, 'anexo13.pdf'),
            (14, 'anexo14.pdf'),
            (15, 'anexo15.pdf');
        `
        ,
    observacao: `
        INSERT INTO observacao (reuniao_id, observacao) 
        VALUES
            (1, 'Observação 1'), 
            (1, 'Observação 2'), 
            (1, 'Observação 3'), 
            (1, 'Observação 4'),
            (2, 'Observação 1'), 
            (2, 'Observação 2'), 
            (2, 'Observação 3'), 
            (2, 'Observação 4'),
            (3, 'Observação 1'), 
            (3, 'Observação 2'), 
            (3, 'Observação 3'), 
            (3, 'Observação 4'),
            (4, 'Observação 1'), 
            (4, 'Observação 2'), 
            (4, 'Observação 3'), 
            (4, 'Observação 4'),
            (5, 'Observação 1'), 
            (5, 'Observação 2'), 
            (5, 'Observação 3'), 
            (5, 'Observação 4'),
            (6, 'Observação 1'), 
            (6, 'Observação 2'), 
            (6, 'Observação 3'), 
            (6, 'Observação 4'),
            (7, 'Observação 1'), 
            (7, 'Observação 2'), 
            (7, 'Observação 3'), 
            (7, 'Observação 4'),
            (8, 'Observação 1'), 
            (8, 'Observação 2'), 
            (8, 'Observação 3'), 
            (8, 'Observação 4'),
            (9, 'Observação 1'), 
            (9, 'Observação 2'), 
            (9, 'Observação 3'), 
            (9, 'Observação 4'),
            (10, 'Observação 1'),
            (10, 'Observação 2'), 
            (10, 'Observação 3'),
            (10, 'Observação 4'),
            (11, 'Observação 1'),
            (11, 'Observação 2'),
            (11, 'Observação 3'),
            (11, 'Observação 4'),
            (12, 'Observação 1'),
            (12, 'Observação 2'),
            (12, 'Observação 3'),
            (12, 'Observação 4'),
            (13, 'Observação 1'),
            (13, 'Observação 2'),
            (13, 'Observação 3'),
            (13, 'Observação 4'),
            (14, 'Observação 1'),
            (14, 'Observação 2'),
            (14, 'Observação 3'),
            (14, 'Observação 4'),
            (15, 'Observação 1'),
            (15, 'Observação 2'),
            (15, 'Observação 3'),
            (15, 'Observação 4');
    `
    ,
    participantes: `
    INSERT INTO participante_reuniao (usuario_id, reuniao_id)
        VALUES
            (1, 1), (2, 1), (3, 1), (1, 2), (2, 2), (1, 3), (4, 3), (5, 3), (1, 4), 
            (2, 4), (1, 5), (2, 5), (3, 5), (1, 6), (1, 7), (2, 7), (3, 7), (1, 8),
            (2, 8), (1, 9), (2, 9), (1, 10), (2, 10),(3, 10), (1, 11), (2, 11), (1, 12),
            (2, 12), (1, 13), (2, 13), (3, 13), (1, 14), (2, 14), (1, 15), (2, 15), (3, 15);
            `
    ,
    preferencias_usuario:`
        INSERT INTO preferencias_usuario (usuario_id, tema, idioma, notificacoes_ativadas, notificacoes_email, notificacoes_sms, notificacoes_whatsapp)
            VALUES
            (1, 'Dark', 'Português', true, true, false, true),
            (2, 'Light', 'Inglês', true, true, true, false),
            (3, 'Compatibilidade', 'Espanhol', false, false, false, false),
            (4, 'Dark', 'Português', true, true, true, true),
            (5, 'Light', 'Português', true, false, true, true);
        `

    }
module.exports = initialInserts;