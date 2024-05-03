// testRoute.js
const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        if (req.session && req.session.user) {
            return res.json({
                message: 'Sessão do usuário encontrada',
                user: {
                    id: req.session.user.id,
                    valid: true,
                    username: req.session.user.username,
                    admin: req.session.user.admin,
                    role: req.session.user.role
                }
            });
        } else {
            return res.json({
                message: 'Nenhuma sessão de usuário encontrada'
            });
        }
    } catch (error) {
        console.error('Erro no servidor:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
