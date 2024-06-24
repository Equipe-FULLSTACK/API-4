const con = require('../database/dbConnection');

exports.createNotificacao = async (notificacaoData) => {
    try {
        const query = 'INSERT INTO notificacao_reuniao SET ?';
        const [result] = await con.promise().query(query, notificacaoData);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAllNotificacoes = async () => {
    try {
        const query = 'SELECT * FROM notificacao_reuniao';
        const [rows] = await con.promise().query(query);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getNotificacaoById = async (notificacaoId) => {
    try {
        const query = 'SELECT * FROM notificacao_reuniao WHERE id_notificacao = ?';
        const [rows] = await con.promise().query(query, [notificacaoId]);
        if (rows.length === 0) {
            throw new Error('Notificação não encontrada');
        }
        return rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateNotificacaoById = async (notificacaoId, notificacaoData) => {
    try {
        const query = 'UPDATE notificacao_reuniao SET ? WHERE id_notificacao = ?';
        const [result] = await con.promise().query(query, [notificacaoData, notificacaoId]);
        if (result.affectedRows === 0) {
            throw new Error('Notificação não encontrada');
        }
        return { message: 'Notificação atualizada com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteNotificacaoById = async (notificacaoId) => {
    try {
        const query = 'DELETE FROM notificacao_reuniao WHERE id_notificacao = ?';
        const [result] = await con.promise().query(query, [notificacaoId]);
        if (result.affectedRows === 0) {
            throw new Error('Notificação não encontrada');
        }
        return { message: 'Notificação excluída com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getNotificacaoByUserId = async (userId) => {
    try {
        const query = `
            SELECT notificacao_reuniao.*
            FROM notificacao_reuniao
            JOIN reuniao ON notificacao_reuniao.reuniao_id = reuniao.id_reuniao
            JOIN participante_reuniao ON reuniao.id_reuniao = participante_reuniao.reuniao_id
            WHERE participante_reuniao.usuario_id = ?;
        `;
        const [rows] = await con.promise().query(query, [userId]);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};
