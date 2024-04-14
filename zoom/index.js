var multer = require('multer');

var session = require('express-session');
var cookieParser = require('cookie-parser');

var mysql = require('mysql2');
var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");
var request = require('request');

/* var cors = require('cors'); */
var app = express();
var server = http.createServer(app);

const cors = require('cors');

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
	methods: ['POST', 'GET','PUT', 'DELETE'],
	credentials: true
}));

global.clientId = "D3YrMPKzQ8ep5vLJyKvqeQ";
global.clientSecret = "P1hoHTwTdHLn9Fy6kxRzixiBartuYCDP";
global.token = "";
global.email = "pz020609@gmail.com";
global.userId = "";

//
app.get("/", (req, res) => {
	console.log("Teste");
	//return res.send(req.query.code);
});

app.get("/meetings", (req, res) => {
	var options = {
	  method: 'GET',
	  // A non-existing sample userId is used in the example below.
	  url: 'https://api.zoom.us/v2/users/ ' + global.email + '/meetings',
	  headers: {
		authorization: 'Bearer ' + global.token, // Do not publish or share your token publicly.
	  },
	};

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  console.log(body);
	  return res.send(body);
	});
});

app.get("/user", (req, res) => {
	var options = {
	  method: 'GET',
	  // A non-existing sample userId is used in the example below.
	  url: 'https://api.zoom.us/v2/users/ ' + global.email,
	  headers: {
		authorization: 'Bearer ' + global.token, // Do not publish or share your token publicly.
	  },
	};

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  var objectValue = JSON.parse(body);
	  console.log(objectValue['access_token']);
	  global.userId = objectValue['user_id'];
	  return res.send(body);
	});
});

app.get("/code", (req, res) => {
	console.log("Codigo de acesso");
	var token = {
	  method: 'POST',
	  url: 'https://zoom.us/oauth/token',
	  qs: {
		grant_type: 'authorization_code',
		//The code below is a sample Authorization Code. Replace it with your actual Authorization Code while making requests.
		code: req.query.code,
		//The uri below is a sample redirect_uri. Replace it with your actual redirect_uri while making requests.
		redirect_uri: 'http://localhost:3000/code',
	  },
	  headers: {
		
		Authorization: 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
	  },
	};
	
	request(token, function (error, response, body) {
	  if (error) throw new Error(error);

      var objectValue = JSON.parse(body);
	  console.log(objectValue['access_token']);
	  global.token = objectValue['access_token'];
	  return res.send(body);
	});
});

app.get("/token", (req, res) => {
	console.log("Token");
	console.log(token);
	return res.send(token);
});

app.get("/auth", (req, res) => {
	res.redirect("https://zoom.us/oauth/authorize?client_id=" + global.clientId + "&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcode")
});

app.listen(PORT, () => {
	console.log(`Servidor recebendo dados no port ${PORT}`);
});

