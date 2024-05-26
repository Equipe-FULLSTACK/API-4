const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (req.session.userLogged) {
      
       console.log(`   
                            Rotina cookieRoute.js verifica dados que são passados do cookie
                            id ${req.session.userLogged.id}
                            user ${req.session.userLogged.username}
                            email, ${req.session.userLogged.email}
                            admin, ${req.session.userLogged.admin}
                            permissao, ${req.session.userLogged.role}`) 
      
      return res.json({
        id: req.session.userLogged.id,
        valid: true,
        username: req.session.userLogged.username,
        admin: req.session.userLogged.admin,
        role: req.session.userLogged.role
      });
    } else {
      console.log(`Não achei`);
      return res.json({ valid: false });
    }
  } catch (error) {
    console.error('Erro no servidor:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;