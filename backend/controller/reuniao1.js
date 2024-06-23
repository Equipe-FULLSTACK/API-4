const con = require('../database/dbConnection');

// Funções CRUD para reuniões

exports.createReuniao = async (reuniaoData) => {
    try {
        // Remove o campo id_reuniao do objeto reuniaoData
        const { id_reuniao, ...dataToInsert } = reuniaoData;

        // Campos opcionais podem ser nulos ou não definidos
        if (!dataToInsert.sala_presencial_id) {
            dataToInsert.sala_presencial_id = null;
        }
        if (!dataToInsert.sala_online_id) {
            dataToInsert.sala_online_id = null;
        }
        if (!dataToInsert.data_final) {
            dataToInsert.data_final = null;
        }

        console.log(dataToInsert);
        const query = 'INSERT INTO reuniao SET ?';
        const [result] = await con.promise().query(query, dataToInsert);
        return result;
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message);
    }
};

exports.getAllReunioes = async () => {
    try {
        const query = 'SELECT * FROM reuniao';
        const [rows] = await con.promise().query(query);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getReuniaoById = async (reuniaoId) => {
    try {
        const query = 'SELECT * FROM reuniao WHERE id_reuniao = ?';
        const [rows] = await con.promise().query(query, [reuniaoId]);
        if (rows.length === 0) {
            throw new Error('Reunião não encontrada');
        }
        return rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getReunioesByUserId = async (userId) => {
    try {
        const query = `
            SELECT DISTINCT r.*
            FROM reuniao r
            LEFT JOIN participante_reuniao pr ON r.id_reuniao = pr.reuniao_id
            WHERE r.organizador_id = ? OR pr.usuario_id = ?;
        `;
        const [rows] = await con.promise().query(query, [userId, userId]);
        return rows;
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

exports.updateReuniaoById = async (reuniaoId, reuniaoData) => {
    try {
        const query = 'UPDATE reuniao SET ? WHERE id_reuniao = ?';
        const [result] = await con.promise().query(query, [reuniaoData, reuniaoId]);
        if (result.affectedRows === 0) {
            throw new Error('Reunião não encontrada');
        }
        return { message: 'Reunião atualizada com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteReuniaoById = async (reuniaoId) => {
    try {
        // Deletar primeiro da tabela participante_reuniao
        const query1 = 'DELETE FROM participante_reuniao WHERE reuniao_id = ?';
        const [result1] = await con.promise().query(query1, [reuniaoId]);

        // Deletar depois da tabela reuniao
        const query2 = 'DELETE FROM reuniao WHERE id_reuniao = ?';
        const [result2] = await con.promise().query(query2, [reuniaoId]);

        if (result2.affectedRows === 0) {
            throw new Error('Reunião não encontrada');
        }
        return { message: 'Reunião excluída com sucesso' };
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};
