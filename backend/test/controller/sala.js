const con = require('../database/databaseConnection');

// Funções CRUD para salas

exports.createSala = async (salaData) => {
    try {
        const query = 'INSERT INTO salas SET ?';
        const [result] = await con.promise().query(query, salaData);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAllSalas = async () => {
    try {
        const query = 'SELECT * FROM salas';
        const [rows] = await con.promise().query(query);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getSalaById = async (salaId) => {
    try {
        const query = 'SELECT * FROM salas WHERE id_sala = ?';
        const [rows] = await con.promise().query(query, [salaId]);
        if (rows.length === 0) {
            throw new Error('Sala não encontrada');
        }
        return rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateSalaById = async (salaId, salaData) => {
    try {
        const query = 'UPDATE salas SET ? WHERE id_sala = ?';
        const [result] = await con.promise().query(query, [salaData, salaId]);
        if (result.affectedRows === 0) {
            throw new Error('Sala não encontrada');
        }
        return { message: 'Sala atualizada com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteSalaById = async (salaId) => {
    try {
        const query = 'DELETE FROM salas WHERE id_sala = ?';
        const [result] = await con.promise().query(query, [salaId]);
        if (result.affectedRows === 0) {
            throw new Error('Sala não encontrada');
        }
        return { message: 'Sala excluída com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};
