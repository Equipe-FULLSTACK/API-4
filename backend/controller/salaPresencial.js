const con = require('../database/dbConnection');

// Funções CRUD para salas

exports.createSalaPresencial = async (salaData) => {
    try {
        const query = 'INSERT INTO salapresencial SET ?';
        const [result] = await con.promise().query(query, salaData);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAllSalasPresencial = async () => {
    try {
        const query = 'SELECT * FROM salapresencial';
        const [rows] = await con.promise().query(query);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getSalaByIdPresencial = async (salaId) => {
    try {
        const query = 'SELECT * FROM salapresencial WHERE id_sala_presencial = ?';
        const [rows] = await con.promise().query(query, [salaId]);
        if (rows.length === 0) {
            throw new Error('Sala não encontrada');
        }
        return rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateSalaByIdPresencial = async (salaId, salaData) => {
    try {
        const query = 'UPDATE salapresencial SET ? WHERE id_sala_presencial = ?';
        const [result] = await con.promise().query(query, [salaData, salaId]);
        if (result.affectedRows === 0) {
            throw new Error('Sala não encontrada');
        }
        return { message: 'Sala presencial atualizada com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteSalaByIdPresencial = async (salaId) => {
    try {
        const query = 'DELETE FROM salapresencial WHERE id_sala_presencial = ?';
        const [result] = await con.promise().query(query, [salaId]);
        if (result.affectedRows === 0) {
            throw new Error('Sala não encontrada');
        }
        return { message: 'Sala excluída com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};
