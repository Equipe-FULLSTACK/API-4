const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fatecfullstack@gmail.com',
    pass: 'zvmy dvhc tful wzus'
  }
});
function enviarEmail(email, titulo, texto) {
	var mailOptions = {
	  from: 'fatecfullstack@gmail.com',
	  to: email,
	  subject: titulo,
	  text: texto
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email enviado: ' + info.response);
	  }
	});
}

router.post('/', async (req, res) => {
    const { email, titulo, texto } = req.body;
	enviarEmail(email, titulo, texto);
});

module.exports = router;
