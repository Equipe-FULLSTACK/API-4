const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {

    console.log('Destroying session:', req.session);

    await req.session.destroy((err) => {
      if (err) {
        console.error('Erro ao destruir sessão:', err.message);
        return res.status(500).json({ message: 'Erro ao fazer logout' });
      }

      console.log('Sessão destruída com sucesso');

      res.cookie('userLogged', '', {
        expires: new Date(Date.now() - 1000),
        path: '/',
        httpOnly: true,
      });

      res.json({ message: 'Logout realizado com sucesso' });
    });
  } catch (error) {
    console.error('Erro no servidor:', error.message);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;