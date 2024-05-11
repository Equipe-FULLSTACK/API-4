const con = require('../database/dbConnection');

// Funções CRUD para agendamentos

exports.createAgendamento = async (agendamentoData) => {
    try {
        const query = 'INSERT INTO agendamentos SET ?';
        const [result] = await con.promise().query(query, agendamentoData);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAllAgendamentos = async () => {
    try {
        const query = 'SELECT * FROM agendamentos';
        const [rows] = await con.promise().query(query);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAgendamentoById = async (agendamentoId) => {
    try {
        const query = 'SELECT * FROM agendamentos WHERE id_agendamento = ?';
        const [rows] = await con.promise().query(query, [agendamentoId]);
        if (rows.length === 0) {
            throw new Error('Agendamento não encontrado');
        }
        return rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateAgendamentoById = async (agendamentoId, agendamentoData) => {
    try {
        const query = 'UPDATE agendamentos SET ? WHERE id_agendamento = ?';
        const [result] = await con.promise().query(query, [agendamentoData, agendamentoId]);
        if (result.affectedRows === 0) {
            throw new Error('Agendamento não encontrado');
        }
        return { message: 'Agendamento atualizado com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteAgendamentoById = async (agendamentoId) => {
    try {
        const query = 'DELETE FROM agendamentos WHERE id_agendamento = ?';
        const [result] = await con.promise().query(query, [agendamentoId]);
        if (result.affectedRows === 0) {
            throw new Error('Agendamento não encontrado');
        }
        return { message: 'Agendamento excluído com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};
