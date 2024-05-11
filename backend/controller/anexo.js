const con = require('../database/dbConnection');

exports.createAnexo = async (anexoData) => {
    try {
        const query = 'INSERT INTO anexo SET ?';
        const [result] = await con.promise().query(query, anexoData);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAllAnexos = async () => {
    try {
        const query = 'SELECT * FROM anexo';
        const [rows] = await con.promise().query(query);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAnexoById = async (anexoId) => {
    try {
        const query = 'SELECT * FROM anexo WHERE id_anexo = ?';
        const [rows] = await con.promise().query(query, [anexoId]);
        if (rows.length === 0) {
            throw new Error('Anexo não encontrado');
        }
        return rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateAnexoById = async (anexoId, anexoData) => {
    try {
        const query = 'UPDATE anexo SET ? WHERE id_anexo = ?';
        const [result] = await con.promise().query(query, [anexoData, anexoId]);
        if (result.affectedRows === 0) {
            throw new Error('Anexo não encontrado');
        }
        return { message: 'Anexo atualizado com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteAnexoById = async (anexoId) => {
    try {
        const query = 'DELETE FROM anexo WHERE id_anexo = ?';
        const [result] = await con.promise().query(query, [anexoId]);
        if (result.affectedRows === 0) {
            throw new Error('Anexo não encontrado');
        }
        return { message: 'Anexo excluído com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};
