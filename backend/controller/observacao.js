const con = require('../database/dbConnection');

exports.createObservacao = async (observacaoData) => {
    try {
        const query = 'INSERT INTO observacao SET ?';
        const [result] = await con.promise().query(query, observacaoData);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAllObservacoes = async () => {
    try {
        const query = 'SELECT * FROM observacao';
        const [rows] = await con.promise().query(query);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getObservacaoById = async (observacaoId) => {
    try {
        const query = 'SELECT * FROM observacao WHERE id_observacao = ?';
        const [rows] = await con.promise().query(query, [observacaoId]);
        if (rows.length === 0) {
            throw new Error('Observação não encontrada');
        }
        return rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateObservacaoById = async (observacaoId, observacaoData) => {
    try {
        const query = 'UPDATE observacao SET ? WHERE id_observacao = ?';
        const [result] = await con.promise().query(query, [observacaoData, observacaoId]);
        if (result.affectedRows === 0) {
            throw new Error('Observação não encontrada');
        }
        return { message: 'Observação atualizada com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteObservacaoById = async (observacaoId) => {
    try {
        const query = 'DELETE FROM observacao WHERE id_observacao = ?';
        const [result] = await con.promise().query(query, [observacaoId]);
        if (result.affectedRows === 0) {
            throw new Error('Observação não encontrada');
        }
        return { message: 'Observação excluída com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};
