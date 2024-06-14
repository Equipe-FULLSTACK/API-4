const con = require('../database/dbConnection');

// Funções CRUD para participantes

exports.createParticipante = async (participanteData) => {
    try {
        const query = 'INSERT INTO participante_reuniao SET ?';
        const [result] = await con.promise().query(query, participanteData);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAllParticipantes = async () => {
    try {
        const query = 'SELECT * FROM participante_reuniao';
        const [rows] = await con.promise().query(query);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getParticipanteById = async (participanteId) => {
    try {
        const query = 'SELECT * FROM participante_reuniao WHERE id_participante = ?';
        const [rows] = await con.promise().query(query, [participanteId]);
        if (rows.length === 0) {
            throw new Error('Participante não encontrado');
        }
        return rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getParticipantsByMeetingId = async (meetingId) => {
    try {
        const query = `
            SELECT usuario.*
            FROM usuario
            JOIN participante_reuniao ON usuario.id_usuario = participante_reuniao.usuario_id
            WHERE participante_reuniao.reuniao_id = ?;
        `;
        const [rows] = await con.promise().query(query, [meetingId]);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateParticipanteById = async (participanteId, participanteData) => {
    try {
        const query = 'UPDATE participante_reuniao SET ? WHERE id_participante = ?';
        const [result] = await con.promise().query(query, [participanteData, participanteId]);
        if (result.affectedRows === 0) {
            throw new Error('Participante não encontrado');
        }
        return { message: 'Participante atualizado com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteParticipanteById = async (participanteId) => {
    try {
        const query = 'DELETE FROM participante_reuniao WHERE id_participante = ?';
        const [result] = await con.promise().query(query, [participanteId]);
        if (result.affectedRows === 0) {
            throw new Error('Participante não encontrado');
        }
        return { message: 'Participante excluído com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};
