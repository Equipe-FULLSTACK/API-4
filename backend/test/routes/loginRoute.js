// loginRoute.js
const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authController.login(email, password);

        // CASO USER FALSO GERA ERRO
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        } else {
            
            // SALVA INFORMAÇÕES NO COOKIE userLogged
            req.session.userLogged = {
                id: user.id,
                username: user.username,
                email: user.email,
                admin: user.admin,
                role: user.role
            };

            /* console.log(`   
                            Rotina loginRoute.js verifica atualização dos dados no cookie
                            id ${req.session.userLogged.id}
                            user, ${req.session.userLogged.username}
                            email, ${req.session.userLogged.email}
                            admin, ${req.session.userLogged.admin}
                            permissao, ${req.session.userLogged.role}`
            ) */
        }
        res.json(user);
    } catch (error) {
        console.error('Erro no servidor:', error.message);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

module.exports = router;
