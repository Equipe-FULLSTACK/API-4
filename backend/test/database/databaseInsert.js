const initialInserts = `INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario, diretoria_usuario, permissao_usuario, admin_usuario) VALUES ("Pedro", "pz020609@gmail.com", "senhadaora123", 1, 4, 1);
INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario, diretoria_usuario, permissao_usuario, admin_usuario) VALUES ("Thiago", "admin@api.com", "123456789", 1, 4, 1);
INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario, diretoria_usuario, permissao_usuario, admin_usuario) VALUES ("Leonardo", "leonardo01@gmail.com", "senhaleonrdo", 1, 3, 1);
INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario, diretoria_usuario, permissao_usuario, admin_usuario) VALUES ("Willians", "willians01@gmail.com", "senhawillians", 1, 2, 1);
INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario, diretoria_usuario, permissao_usuario, admin_usuario) VALUES ("Juliano", "juliano019@gmail.com", "senhajuliano", 1, 1, 1);
INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario, diretoria_usuario, permissao_usuario, admin_usuario) VALUES ("Excluir", "excluir01@gmail.com", "senhaexcluir", 1, 1, 1);
INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario, diretoria_usuario, permissao_usuario, admin_usuario) VALUES ("Alterar", "alterar01@gmail.com", "senhaalterar", 1, 1, 1);

#INSERT tabela reunioes
SELECT * FROM reunioes;
INSERT INTO reunioes (id_reuniao, id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES (1111, 1, "Fisica", "Salário", '2024-05-30 12:00:00', '2024-05-30 15:00:00', "Aumento de salário", "Thiago"); 
INSERT INTO reunioes (id_reuniao, id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES (2222, 2, "Hibrida", "Demissão", '2024-05-15 14:00:00', '2024-05-15 15:00:00', "Discussão sobre demissões", "Thiago");
INSERT INTO reunioes (id_reuniao, id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES (3333, 3, "Virtual", "Negócios", '2024-05-02 14:30:00', '2024-05-02 15:00:00', "Decisão sobre negócios", "Thiago");
INSERT INTO reunioes (id_reuniao, id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES (4444, 4, "Fisica", "Excluir", '2024-05-30 12:00:00', '2024-05-30 15:00:00', "Linha para Excluir", "Thiago");
INSERT INTO reunioes (id_reuniao, id_agendamento, tipo_reuniao, titulo_reuniao, datetime_inicio, datetime_final, pauta_reuniao, responsavel_reuniao) VALUES (5555, 5, "Hibrida", "Alterar", '2024-05-30 12:00:00', '2024-05-30 15:00:00', "Linha para Alterar", "Thiago");

#INSERT tabela agendamentos
SELECT * FROM agendamentos;
INSERT INTO agendamentos (id_usuario, id_sala, datetime_inicio, datetime_final) VALUES (1, 1, '2024-05-30 12:00:00', '2024-05-30 15:00:00');
INSERT INTO agendamentos (id_usuario, id_sala, datetime_inicio, datetime_final) VALUES (1, 2, '2024-05-30 12:00:00', '2024-05-30 15:00:00');
INSERT INTO agendamentos (id_usuario, id_sala, datetime_inicio, datetime_final) VALUES (1, 3, '2024-05-30 12:00:00', '2024-05-30 15:00:00');
INSERT INTO agendamentos (id_usuario, id_sala, datetime_inicio, datetime_final) VALUES (1, 4, '2024-05-30 12:00:00', '2024-05-30 15:00:00');
INSERT INTO agendamentos (id_usuario, id_sala, datetime_inicio, datetime_final) VALUES (1, 5, '2024-05-30 12:00:00', '2024-05-30 15:00:00');

#INSERT tabela salas
SELECT * FROM salas;
INSERT INTO salas (nome_sala, tipo_sala, permissao_sala, link_sala, vagas_sala) VALUES ("sala1", "fisica", 1, NULL, 40);
INSERT INTO salas (nome_sala, tipo_sala, permissao_sala, link_sala, vagas_sala) VALUES ("sala2", "hibrida", 1, "linkdasala.com", 55);
INSERT INTO salas (nome_sala, tipo_sala, permissao_sala, link_sala, vagas_sala) VALUES ("sala3", "virtual", 1, "linkdasala.com", 80);
INSERT INTO salas (nome_sala, tipo_sala, permissao_sala, link_sala, vagas_sala) VALUES ("sala4", "fisica", 1, NULL, 40);
INSERT INTO salas (nome_sala, tipo_sala, permissao_sala, link_sala, vagas_sala) VALUES ("sala5", "hibrida", 1, "linkdasala.com", 55);

#INSERT tabela participantes
select * from participantes;
INSERT INTO participantes (id_reuniao, nome_participante, email_participante) VALUES (1, "José", "josé@gmail.com");
INSERT INTO participantes (id_reuniao, nome_participante, email_participante) VALUES (1, "Carlos", "carlin@gmail.com");
INSERT INTO participantes (id_reuniao, nome_participante, email_participante) VALUES (1, "Creuza", "creuza@gmail.com");
INSERT INTO participantes (id_reuniao, nome_participante, email_participante) VALUES (1, "Tiao", "tiao@gmail.com");
INSERT INTO participantes (id_reuniao, nome_participante, email_participante) VALUES (1, "SemNome", "semnome@gmail.com");`;


module.exports = initialInserts;
