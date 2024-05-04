const { reunioes } = require("./databaseDefault");

const initialInserts = {
    usuarios: `
        INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario, diretoria_usuario, permissao_usuario, admin_usuario, userPhoto) VALUES 
		("admin", "admin@api.com", "123456789", 0, "4", 1, "https://images.unsplash.com/photo-1583957723119-330fc2738e64?q=80&w=2157&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
		("Juliano", "juliano@gmail.com", "123456789", 0, "2", 0, "https://github.com/Equipe-FULLSTACK/API-4/blob/main/readme/juliano.png"),
		("Thiago", "thiago@gmail.com", "123456789", 0, "3", 0, "https://github.com/Equipe-FULLSTACK/API-4/blob/main/readme/thiago.png"),
		("Leonardo", "leo@gmail.com", "123456789", 0, "3", 0, "https://github.com/Equipe-FULLSTACK/API-4/blob/main/readme/leo.jpg"),
		("Willians", "will@gmail.com", "123456789", 0, "2", 0, "https://github.com/Equipe-FULLSTACK/API-4/blob/main/readme/will.png"),
		("Pedro", "pedro@gmail.com", "123456789", 0, "3", 0, "https://github.com/Equipe-FULLSTACK/API-4/blob/main/readme/pedro.png"),
		("usuario07", "user07@gmail.com", "123456789", 0, "3", 0, "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
		("usuario08", "user08@gmail.com", "123456789", 0, "2", 0, "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
		("usuario09", "user09@gmail.com", "123456789", 0, "2", 0, "https://plus.unsplash.com/premium_photo-1675130119373-61ada6685d63?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
		("usuario10", "user10@gmail.com", "123456789", 0, "1", 0, "https://images.unsplash.com/photo-1615813967515-e1838c1c5116?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
		("usuario11", "user11@gmail.com", "123456789", 1, "1", 0, "https://https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
		("usuario12", "user12@gmail.com", "123456789", 1, "1", 0, "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
        );
    `,

    salas: `
    INSERT INTO salas(nome_sala, tipo_sala, permissao_sala, link_sala, vagas_sala) VALUES
    ("sala01", "fisica", "4", NULL, 10),
    ("sala02", "fisica", "3", NULL, 10),
    ("sala03", "fisica", "2", NULL, 20),
    ("sala04", "fisica", "1", NULL, 40),
    ("sala05", "virtual", "4", "linkdasala.com", 55),
    ("sala06", "virtual", "3", "linkdasala.com", 55),
    ("sala07", "virtual", "2", "linkdasala.com", 55),
    ("sala08", "virtual", "1", "linkdasala.com", 55),
    ("sala09", "hibrida", "4", "linkdasala.com", 55),
    ("sala10", "hibrida", "3", "linkdasala.com", 55),
    ("sala11", "hibrida", "2", "linkdasala.com", 55),
    ("sala12", "hibrida", "1", "linkdasala.com", 55);
    `,

    reunioes: `INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(1, "Fisica", "Salário", '2024-05-05 12:00:00', '2024-05-05 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(2, "Fisica", "Metas", '2024-05-07 12:00:00', '2024-05-07 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(3, "Fisica", "Negócios", '2024-05-09 12:00:00', '2024-05-09 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(4, "Fisica", "Desempenho", '2024-05-11 12:00:00', '2024-05-11 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(5, "Virtual", "Salário", '2024-05-13 12:00:00', '2024-05-13 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(6, "Virtual", "Metas", '2024-05-15 12:00:00', '2024-05-15 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(7, "Virtual", "Negócios", '2024-05-17 12:00:00', '2024-05-17 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(8, "Virtual", "Desempenho", '2024-05-19 12:00:00', '2024-05-19 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(9, "Hibrida", "Salário", '2024-05-21 12:00:00', '2024-05-21 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(10, "Hibrida", "Metas", '2024-05-23 12:00:00', '2024-05-23 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(11, "Hibrida", "Negócios", '2024-05-25 12:00:00', '2024-05-25 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(12, "Hibrida", "Desempenho", '2024-05-27 12:00:00', '2024-05-27 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(13, "Fisica", "Salário", '2024-05-06 12:00:00', '2024-05-06 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(14, "Fisica", "Metas", '2024-05-08 12:00:00', '2024-05-08 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(15, "Fisica", "Negócios", '2024-05-10 12:00:00', '2024-05-10 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(16, "Fisica", "Desempenho", '2024-05-12 12:00:00', '2024-05-12 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(17, "Virtual", "Salário", '2024-05-14 12:00:00', '2024-05-14 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(18, "Virtual", "Metas", '2024-05-16 12:00:00', '2024-05-16 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(19, "Virtual", "Negócios", '2024-05-18 12:00:00', '2024-05-18 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(20, "Virtual", "Desempenho", '2024-05-20 12:00:00', '2024-05-20 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(21, "Hibrida", "Salário", '2024-05-22 12:00:00', '2024-05-22 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(22, "Hibrida", "Metas", '2024-05-24 12:00:00', '2024-05-24 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(23, "Hibrida", "Negócios", '2024-05-26 12:00:00', '2024-05-26 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(24, "Hibrida", "Desempenho", '2024-05-28 12:00:00', '2024-05-28 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(25, "Fisica", "Salário", '2024-05-29 12:00:00', '2024-05-29 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(26, "Fisica", "Metas", '2024-06-01 12:00:00', '2024-06-01 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(27, "Fisica", "Negócios", '2024-06-03 12:00:00', '2024-06-03 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(28, "Fisica", "Desempenho", '2024-06-05 12:00:00', '2024-06-05 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(29, "Virtual", "Salário", '2024-06-07 12:00:00', '2024-06-07 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(30, "Virtual", "Metas", '2024-06-09 12:00:00', '2024-06-09 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(31, "Virtual", "Negócios", '2024-06-11 12:00:00', '2024-06-11 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(32, "Virtual", "Desempenho", '2024-06-13 12:00:00', '2024-06-13 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(33, "Hibrida", "Salário", '2024-06-15 12:00:00', '2024-06-15 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(34, "Hibrida", "Metas", '2024-06-17 12:00:00', '2024-06-17 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(35, "Hibrida", "Negócios", '2024-06-19 12:00:00', '2024-06-19 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(36, "Hibrida", "Desempenho", '2024-06-21 12:00:00', '2024-06-21 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(37, "Fisica", "Salário", '2024-05-30 12:00:00', '2024-05-30 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(38, "Fisica", "Metas", '2024-06-02 12:00:00', '2024-06-02 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(39, "Fisica", "Negócios", '2024-06-04 12:00:00', '2024-06-04 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(40, "Fisica", "Desempenho", '2024-06-06 12:00:00', '2024-06-06 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(41, "Virtual", "Salário", '2024-06-08 12:00:00', '2024-06-08 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(42, "Virtual", "Metas", '2024-06-10 12:00:00', '2024-06-10 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(43, "Virtual", "Negócios", '2024-06-12 12:00:00', '2024-06-12 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(44, "Virtual", "Desempenho", '2024-06-14 12:00:00', '2024-06-14 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(45, "Hibrida", "Salário", '2024-06-16 12:00:00', '2024-06-16 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(46, "Hibrida", "Metas", '2024-06-18 12:00:00', '2024-06-18 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(47, "Hibrida", "Negócios", '2024-06-20 12:00:00', '2024-06-20 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(48, "Hibrida", "Desempenho", '2024-06-22 12:00:00', '2024-06-22 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(49, "Fisica", "Salário", '2024-05-05 12:00:00', '2024-05-05 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(50, "Fisica", "Metas", '2024-05-07 12:00:00', '2024-05-07 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(51, "Fisica", "Negócios", '2024-05-09 12:00:00', '2024-05-09 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(52, "Fisica", "Desempenho", '2024-05-11 12:00:00', '2024-05-11 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(53, "Virtual", "Salário", '2024-05-13 12:00:00', '2024-05-13 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(54, "Virtual", "Metas", '2024-05-15 12:00:00', '2024-05-15 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(55, "Virtual", "Negócios", '2024-05-17 12:00:00', '2024-05-17 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(56, "Virtual", "Desempenho", '2024-05-19 12:00:00', '2024-05-19 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(57, "Hibrida", "Salário", '2024-05-21 12:00:00', '2024-05-21 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(58, "Hibrida", "Metas", '2024-05-23 12:00:00', '2024-05-23 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(59, "Hibrida", "Negócios", '2024-05-25 12:00:00', '2024-05-25 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(60, "Hibrida", "Desempenho", '2024-05-27 12:00:00', '2024-05-27 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(61, "Fisica", "Salário", '2024-05-06 12:00:00', '2024-05-06 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(62, "Fisica", "Metas", '2024-05-08 12:00:00', '2024-05-08 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(63, "Fisica", "Negócios", '2024-05-10 12:00:00', '2024-05-10 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(64, "Fisica", "Desempenho", '2024-05-12 12:00:00', '2024-05-12 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(65, "Virtual", "Salário", '2024-05-14 12:00:00', '2024-05-14 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(66, "Virtual", "Metas", '2024-05-16 12:00:00', '2024-05-16 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(67, "Virtual", "Negócios", '2024-05-18 12:00:00', '2024-05-18 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(68, "Virtual", "Desempenho", '2024-05-20 12:00:00', '2024-05-20 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(69, "Hibrida", "Salário", '2024-05-22 12:00:00', '2024-05-22 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(70, "Hibrida", "Metas", '2024-05-24 12:00:00', '2024-05-24 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(71, "Hibrida", "Negócios", '2024-05-26 12:00:00', '2024-05-26 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(72, "Hibrida", "Desempenho", '2024-05-28 12:00:00', '2024-05-28 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(73, "Fisica", "Salário", '2024-05-29 12:00:00', '2024-05-29 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(74, "Fisica", "Metas", '2024-06-01 12:00:00', '2024-06-01 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(75, "Fisica", "Negócios", '2024-06-03 12:00:00', '2024-06-03 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(76, "Fisica", "Desempenho", '2024-06-05 12:00:00', '2024-06-05 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(77, "Virtual", "Salário", '2024-06-07 12:00:00', '2024-06-07 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(78, "Virtual", "Metas", '2024-06-09 12:00:00', '2024-06-09 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(79, "Virtual", "Negócios", '2024-06-11 12:00:00', '2024-06-11 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(80, "Virtual", "Desempenho", '2024-06-13 12:00:00', '2024-06-13 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(81, "Hibrida", "Salário", '2024-06-15 12:00:00', '2024-06-15 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(82, "Hibrida", "Metas", '2024-06-17 12:00:00', '2024-06-17 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(83, "Hibrida", "Negócios", '2024-06-19 12:00:00', '2024-06-19 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(84, "Hibrida", "Desempenho", '2024-06-21 12:00:00', '2024-06-21 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(85, "Fisica", "Salário", '2024-05-30 12:00:00', '2024-05-30 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(86, "Fisica", "Metas", '2024-06-02 12:00:00', '2024-06-02 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(87, "Fisica", "Negócios", '2024-06-04 12:00:00', '2024-06-04 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(88, "Fisica", "Desempenho", '2024-06-06 12:00:00', '2024-06-06 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(89, "Virtual", "Salário", '2024-06-08 12:00:00', '2024-06-08 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(90, "Virtual", "Metas", '2024-06-10 12:00:00', '2024-06-10 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(91, "Virtual", "Negócios", '2024-06-12 12:00:00', '2024-06-12 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(92, "Virtual", "Desempenho", '2024-06-14 12:00:00', '2024-06-14 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(93, "Hibrida", "Salário", '2024-06-16 12:00:00', '2024-06-16 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(94, "Hibrida", "Metas", '2024-06-18 12:00:00', '2024-06-18 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(95, "Hibrida", "Negócios", '2024-06-20 12:00:00', '2024-06-20 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(96, "Hibrida", "Desempenho", '2024-06-22 12:00:00', '2024-06-22 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(97, "Fisica", "Salário", '2024-05-05 12:00:00', '2024-05-05 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(98, "Fisica", "Metas", '2024-05-07 12:00:00', '2024-05-07 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(99, "Fisica", "Negócios", '2024-05-09 12:00:00', '2024-05-09 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(100, "Fisica", "Desempenho", '2024-05-11 12:00:00', '2024-05-11 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(101, "Virtual", "Salário", '2024-05-13 12:00:00', '2024-05-13 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(102, "Virtual", "Metas", '2024-05-15 12:00:00', '2024-05-15 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(103, "Virtual", "Negócios", '2024-05-17 12:00:00', '2024-05-17 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(104, "Virtual", "Desempenho", '2024-05-19 12:00:00', '2024-05-19 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(105, "Hibrida", "Salário", '2024-05-21 12:00:00', '2024-05-21 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(106, "Hibrida", "Metas", '2024-05-23 12:00:00', '2024-05-23 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(107, "Hibrida", "Negócios", '2024-05-25 12:00:00', '2024-05-25 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(108, "Hibrida", "Desempenho", '2024-05-27 12:00:00', '2024-05-27 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(109, "Fisica", "Salário", '2024-05-06 12:00:00', '2024-05-06 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(110, "Fisica", "Metas", '2024-05-08 12:00:00', '2024-05-08 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(111, "Fisica", "Negócios", '2024-05-10 12:00:00', '2024-05-10 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(112, "Fisica", "Desempenho", '2024-05-12 12:00:00', '2024-05-12 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(113, "Virtual", "Salário", '2024-05-14 12:00:00', '2024-05-14 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(114, "Virtual", "Metas", '2024-05-16 12:00:00', '2024-05-16 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(115, "Virtual", "Negócios", '2024-05-18 12:00:00', '2024-05-18 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(116, "Virtual", "Desempenho", '2024-05-20 12:00:00', '2024-05-20 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(117, "Hibrida", "Salário", '2024-05-22 12:00:00', '2024-05-22 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(118, "Hibrida", "Metas", '2024-05-24 12:00:00', '2024-05-24 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(119, "Hibrida", "Negócios", '2024-05-26 12:00:00', '2024-05-26 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(120, "Hibrida", "Desempenho", '2024-05-28 12:00:00', '2024-05-28 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(121, "Fisica", "Salário", '2024-05-29 12:00:00', '2024-05-29 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(122, "Fisica", "Metas", '2024-06-01 12:00:00', '2024-06-01 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(123, "Fisica", "Negócios", '2024-06-03 12:00:00', '2024-06-03 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(124, "Fisica", "Desempenho", '2024-06-05 12:00:00', '2024-06-05 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(125, "Virtual", "Salário", '2024-06-07 12:00:00', '2024-06-07 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(126, "Virtual", "Metas", '2024-06-09 12:00:00', '2024-06-09 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(127, "Virtual", "Negócios", '2024-06-11 12:00:00', '2024-06-11 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(128, "Virtual", "Desempenho", '2024-06-13 12:00:00', '2024-06-13 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(129, "Hibrida", "Salário", '2024-06-15 12:00:00', '2024-06-15 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(130, "Hibrida", "Metas", '2024-06-17 12:00:00', '2024-06-17 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(131, "Hibrida", "Negócios", '2024-06-19 12:00:00', '2024-06-19 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(132, "Hibrida", "Desempenho", '2024-06-21 12:00:00', '2024-06-21 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(133, "Fisica", "Salário", '2024-05-30 12:00:00', '2024-05-30 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(134, "Fisica", "Metas", '2024-06-02 12:00:00', '2024-06-02 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(135, "Fisica", "Negócios", '2024-06-04 12:00:00', '2024-06-04 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(136, "Fisica", "Desempenho", '2024-06-06 12:00:00', '2024-06-06 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(137, "Virtual", "Salário", '2024-06-08 12:00:00', '2024-06-08 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(138, "Virtual", "Metas", '2024-06-10 12:00:00', '2024-06-10 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(139, "Virtual", "Negócios", '2024-06-12 12:00:00', '2024-06-12 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(140, "Virtual", "Desempenho", '2024-06-14 12:00:00', '2024-06-14 15:00:00', "Avaliação de Desempenho", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(141, "Hibrida", "Salário", '2024-06-16 12:00:00', '2024-06-16 15:00:00', "Aumento de salário", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(142, "Hibrida", "Metas", '2024-06-18 12:00:00', '2024-06-18 15:00:00', "Definição de Metas", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(143, "Hibrida", "Negócios", '2024-06-20 12:00:00', '2024-06-20 15:00:00', "Conversa sobre Negócios", "Thiago");
    INSERT INTO reunioes(id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES(144, "Hibrida", "Desempenho", '2024-06-22 12:00:00', '2024-06-22 15:00:00', "Avaliação de Desempenho", "Thiago");
    `,


    agendamentos: `
    INSERT INTO agendamentos (id_usuario, id_sala, datetime_inicio, datetime_final) VALUES
    (1, 1, '2024-05-05 08:00:00', '2024-05-05 15:00:00'),
    (1, 2, '2024-05-07 08:00:00', '2024-05-07 15:00:00'),
    (1, 3, '2024-05-09 08:00:00', '2024-05-09 15:00:00'),
    (1, 4, '2024-05-11 08:00:00', '2024-05-11 15:00:00'),
    (1, 5, '2024-05-13 08:00:00', '2024-05-13 15:00:00'),
    (1, 6, '2024-05-15 08:00:00', '2024-05-15 15:00:00'),
    (1, 7, '2024-05-17 08:00:00', '2024-05-17 15:00:00'),
    (1, 8, '2024-05-19 08:00:00', '2024-05-19 15:00:00'),
    (1, 9, '2024-05-21 08:00:00', '2024-05-21 15:00:00'),
    (1, 10, '2024-05-23 08:00:00', '2024-05-23 15:00:00'),
    (1, 11, '2024-05-25 08:00:00', '2024-05-25 15:00:00'),
    (1, 12, '2024-05-27 08:00:00', '2024-05-27 15:00:00'),
    (2, 1, '2024-05-06 08:00:00', '2024-05-06 15:00:00'),
    (2, 2, '2024-05-08 08:00:00', '2024-05-08 15:00:00'),
    (2, 3, '2024-05-10 08:00:00', '2024-05-10 15:00:00'),
    (2, 4, '2024-05-12 08:00:00', '2024-05-12 15:00:00'),
    (2, 5, '2024-05-14 08:00:00', '2024-05-14 15:00:00'),
    (2, 6, '2024-05-16 08:00:00', '2024-05-16 15:00:00'),
    (2, 7, '2024-05-18 08:00:00', '2024-05-18 15:00:00'),
    (2, 8, '2024-05-20 08:00:00', '2024-05-20 15:00:00'),
    (2, 9, '2024-05-22 08:00:00', '2024-05-22 15:00:00'),
    (2, 10, '2024-05-24 08:00:00', '2024-05-24 15:00:00'),
    (2, 11, '2024-05-26 08:00:00', '2024-05-26 15:00:00'),
    (2, 12, '2024-05-28 08:00:00', '2024-05-28 15:00:00'),
    (3, 1, '2024-05-29 08:00:00', '2024-05-29 15:00:00'),
    (3, 2, '2024-06-01 08:00:00', '2024-06-01 15:00:00'),
    (3, 3, '2024-06-03 08:00:00', '2024-06-03 15:00:00'),
    (3, 4, '2024-06-05 08:00:00', '2024-06-05 15:00:00'),
    (3, 5, '2024-06-07 08:00:00', '2024-06-07 15:00:00'),
    (3, 6, '2024-06-09 08:00:00', '2024-06-09 15:00:00'),
    (3, 7, '2024-06-11 08:00:00', '2024-06-11 15:00:00'),
    (3, 8, '2024-06-13 08:00:00', '2024-06-13 15:00:00'),
    (3, 9, '2024-06-15 08:00:00', '2024-06-15 15:00:00'),
    (3, 10, '2024-06-17 08:00:00', '2024-06-17 15:00:00'),
    (3, 11, '2024-06-19 08:00:00', '2024-06-19 15:00:00'),
    (3, 12, '2024-06-21 08:00:00', '2024-06-21 15:00:00');
`,

    participantes: `
-- Inserir participantes na Reunião 1
INSERT INTO participantes (id_reuniao, nome_participante, email_participante) VALUES
(1, 'Juliano', 'juliano@gmail.com'),
(1, 'Thiago', 'thiago@gmail.com'),
(1, 'Leonardo', 'leo@gmail.com'),
(1, 'Willians', 'will@gmail.com'),
(1, 'Pedro', 'pedro@gmail.com');

-- Inserir participantes na Reunião 2
INSERT INTO participantes (id_reuniao, nome_participante, email_participante) VALUES
(2, 'Juliano', 'juliano@gmail.com'),
(2, 'Thiago', 'thiago@gmail.com'),
(2, 'Leonardo', 'leo@gmail.com'),
(2, 'Willians', 'will@gmail.com'),
(2, 'Pedro', 'pedro@gmail.com');

-- Inserir participantes na Reunião 3
INSERT INTO participantes (id_reuniao, nome_participante, email_participante) VALUES
(3, 'Juliano', 'juliano@gmail.com'),
(3, 'Thiago', 'thiago@gmail.com'),
(3, 'Leonardo', 'leo@gmail.com'),
(3, 'Willians', 'will@gmail.com'),
(3, 'Pedro', 'pedro@gmail.com');

-- Inserir participantes na Reunião 4
INSERT INTO participantes (id_reuniao, nome_participante, email_participante) VALUES
(4, 'Juliano', 'juliano@gmail.com'),
(4, 'Thiago', 'thiago@gmail.com'),
(4, 'Leonardo', 'leo@gmail.com'),
(4, 'Willians', 'will@gmail.com'),
(4, 'Pedro', 'pedro@gmail.com');

-- Inserir participantes na Reunião 5
INSERT INTO participantes (id_reuniao, nome_participante, email_participante) VALUES
(5, 'Juliano', 'juliano@gmail.com'),
(5, 'Thiago', 'thiago@gmail.com'),
(5, 'Leonardo', 'leo@gmail.com'),
(5, 'Willians', 'will@gmail.com'),
(5, 'Pedro', 'pedro@gmail.com');
`,
}

module.exports = initialInserts;
