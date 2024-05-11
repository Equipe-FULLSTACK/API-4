const con = require('../database/dbConnection');

// Funções CRUD para salas Online

exports.createSalaOnline = async (salaData) => {
    try {
        const query = 'INSERT INTO salaonline SET ?';
        const [result] = await con.promise().query(query, salaData);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAllSalasOnline = async () => {
    try {
        const query = 'SELECT * FROM salaonline';
        const [rows] = await con.promise().query(query);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getSalaByIdOnline = async (salaId) => {
    try {
        const query = 'SELECT * FROM salaonline WHERE id_sala_online = ?';
        const [rows] = await con.promise().query(query, [salaId]);
        if (rows.length === 0) {
            throw new Error('Sala não encontrada');
        }
        return rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateSalaByIdOnline = async (salaId, salaData) => {
    try {
        const query = 'UPDATE salaonline SET ? WHERE id_sala_online = ?';
        const [result] = await con.promise().query(query, [salaData, salaId]);
        if (result.affectedRows === 0) {
            throw new Error('Sala não encontrada');
        }
        return { message: 'Sala atualizada com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteSalaByIdOnline = async (salaId) => {
    try {
        const query = 'DELETE FROM salaonline WHERE id_sala_online = ?';
        const [result] = await con.promise().query(query, [salaId]);
        if (result.affectedRows === 0) {
            throw new Error('Sala não encontrada');
        }
        return { message: 'Sala excluída com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};
