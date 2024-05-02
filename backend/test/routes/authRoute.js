const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');

// LOGIN CHAMAR /login
router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authController.login(email, password);
        req.session.id_usuario = user.id;
        req.session.username = user.username;
        req.session.email = user.email;
        req.session.admin = user.admin;
        req.session.permissao = user.role;
        res.json(user);
    } catch (error) {
        console.error('Erro no servidor:', error.message);
        res.status(500).json({ message: error.message });
    }
});

router.get("/ck", async (req, res) => {
    try {
        if (req.session.username) {
            return res.json({
                id: req.session.id_usuario,
                valid: true,
                username: req.session.username,
                admin: req.session.admin,
                role: req.session.role
            });
        } else {
            return res.json({ valid: false });
        }
    } catch (error) {
        console.error('Erro no servidor:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
