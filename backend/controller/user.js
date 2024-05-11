const con = require('../database/dbConnection');

// Funções CRUD para usuários

exports.createUser = async (userData) => {
    try {
        const query = 'INSERT INTO usuario SET ?';
        const [result] = await con.promise().query(query, userData);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAllUsers = async () => {
    try {
        const query = 'SELECT * FROM usuario';
        const [rows] = await con.promise().query(query);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getUserById = async (userId) => {
    try {
        const query = 'SELECT * FROM usuario WHERE id_usuario = ?';
        const [rows] = await con.promise().query(query, [userId]);
        if (rows.length === 0) {
            throw new Error('Usuário não encontrado');
        }
        return rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateUserById = async (userId, userData) => {
    try {
        const query = 'UPDATE usuario SET ? WHERE id_usuario = ?';
        const [result] = await con.promise().query(query, [userData, userId]);
        if (result.affectedRows === 0) {
            throw new Error('Usuário não encontrado');
        }
        return { message: 'Usuário atualizado com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteUserById = async (userId) => {
    try {
        const query = 'DELETE FROM usuario WHERE id_usuario = ?';
        const [result] = await con.promise().query(query, [userId]);
        if (result.affectedRows === 0) {
            throw new Error('Usuário não encontrado');
        }
        return { message: 'Usuário excluído com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};
