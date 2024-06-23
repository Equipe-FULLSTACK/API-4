require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require("path");
const http = require('http');
var nodemailer = require('nodemailer');

// IMPORTAÇÕES DE ROTAS DO BACKEND
const userRoutes = require('./routes/userRoute');
const salasPresencialRoutes = require('./routes/salaPresencialRoute');
const salasOnlineRoutes = require('./routes/salaOnlineRoute');
const reunioesRoutes1 = require('./routes/reuniaoRoute1');
const participanteRoutes = require('./routes/participanteRoute');
const anexoRoutes = require('./routes/anexoRoute');
const observacaoRoutes = require('./routes/observacaoRoute');
const notificacaoRoutes = require('./routes/notificacaoRoute');
const loginRoutes = require('./routes/loginRoute');
const logoutRoutes = require('./routes/logoutRoute');
const cookieRoutes = require('./routes/cookieRoute');
const zoomRoutes = require('./routes/zoomRoute');

// Configurações do servidor
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 2000 // limit each IP to 100 requests per windowMs
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './')));
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}));
app.set('view engine', 'ejs');
app.use(cookieParser());


// Organização sessão cookie
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 // Um dia
    },
    name: 'userLogged'
}));

// Rotas do backend
app.use('/us', userRoutes);
app.use('/salapresencial', salasPresencialRoutes);
app.use('/salaonline', salasOnlineRoutes);
app.use('/reuniao1', reunioesRoutes1);
app.use('/participante', participanteRoutes);
app.use('/anexo', anexoRoutes);
app.use('/observacao', observacaoRoutes);
app.use('/notificacao', notificacaoRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/ck', cookieRoutes);
app.use('/zoom', zoomRoutes);

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)})
