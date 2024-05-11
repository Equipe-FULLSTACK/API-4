const con = require('../database/dbConnection');

// Funções CRUD para reuniões

exports.createReuniao = async (reuniaoData) => {
    try {
        const query = 'INSERT INTO reuniao SET ?';
        const [result] = await con.promise().query(query, reuniaoData);
        return result;
    } catch (error) {
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
        const query = 'DELETE FROM reuniao WHERE id_reuniao = ?';
        const [result] = await con.promise().query(query, [reuniaoId]);
        if (result.affectedRows === 0) {
            throw new Error('Reunião não encontrada');
        }
        return { message: 'Reunião excluída com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};
