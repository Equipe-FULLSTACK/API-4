require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require("path");
var http = require('http');


/// IMPORTAÇÕES DE ROTAS DO BACKEND ////////////////////////////////

const userRoutes = require('./routes/userRoute');
const salasRoutes = require('./routes/salaRoute')
const agendamentoRoutes = require('./routes/agendamentoRoute')
const reunioesRoutes = require('./routes/reuniaoRoute')
const authRoutes = require('./routes/authRoute')


/////////////////////////////////////////////////////////////////////

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200 // limit each IP to 100 requests per windowMs
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
app.use(session({
    secret: 'secret', //Chave gerada para o cookie de sessão
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 //Tempo em milisegundos que o cookie vai durar
    }
}));


//// NESSA ETAPA ORGANIZA AS ROTAS ////////////////////////
//// ESTRUTURA
/////// controller >>> estrura das querys sql
/////// routes     >>> rotas para chamadas das querys


// Rotas para usuários
app.use('/us', userRoutes);

// Rotas para salas
app.use('/sala', salasRoutes);

// Rotas para agendamentos
app.use('/agendamento', agendamentoRoutes);

// Rotas para salas
app.use('/reuniao', reunioesRoutes);

// Rotas para autenticação
app.use('/login', authRoutes);





server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
