const con = require('../database/dbConnection');

exports.login = async (email, password) => {
    try {
        const sql = 'SELECT * FROM usuario WHERE email_usuario = ? AND senha_usuario = ?';
        const [rows] = await con.promise().query(sql, [email, password]);
        if (rows.length > 0) {
            const user = rows[0];
            return {
                id: user.id_usuario,
                login: true,
                username: user.nome_usuario,
                email: user.email_usuario,
                admin: user.admin_usuario,
                role: user.permissao_usuario
            };
        } else {
            throw new Error('Credenciais inválidas');
        }
    } catch (error) {
        throw new Error('Erro no servidor: ' + error.message);
    }
};
