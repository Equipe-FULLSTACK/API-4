var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "api4" 
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Conectado UserADD");

  var usuarios = [
    {
      nome_usuario: "Admin",
      email_usuario: "admin@api.com",
      senha_usuario: "123456789",
      diretoria_usuario: false,
      permissao_usuario: "4",
      admin_usuario: true,
      userPhoto: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      nome_usuario: "User1",
      email_usuario: "user1@api.com",
      senha_usuario: "123456789",
      diretoria_usuario: false,
      permissao_usuario: "1",
      admin_usuario: false,
      userPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      nome_usuario: "User2",
      email_usuario: "user2@api.com",
      senha_usuario: "123456789",
      diretoria_usuario: false,
      permissao_usuario: "1",
      admin_usuario: false,
      userPhoto: "https://plus.unsplash.com/premium_photo-1675130119373-61ada6685d63?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      nome_usuario: "User3",
      email_usuario: "user3@api.com",
      senha_usuario: "123456789",
      diretoria_usuario: false,
      permissao_usuario: "1",
      admin_usuario: false,
      userPhoto: "https://images.unsplash.com/photo-1615813967515-e1838c1c5116?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  var insertUsuario = "INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario, diretoria_usuario, permissao_usuario, admin_usuario, userPhoto) VALUES ?";
  var values = usuarios.map(usuario => [usuario.nome_usuario, usuario.email_usuario, usuario.senha_usuario, usuario.diretoria_usuario, usuario.permissao_usuario, usuario.admin_usuario, usuario.userPhoto]);
  
  con.query(insertUsuario, [values], function (err, result) {
    if (err) throw err;
    console.log("Usuários inseridos");
    con.end(); // Fechar conexão
  });
});