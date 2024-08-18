// 06 criando arquivo para conexao com o banco de dados
const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "suaSenha",
    database: "converse"

});

if(conexao){
    console.log("conectado");
    console.log(conexao);
    console.log("foi conexao");
}else{
    console.log("naoo");
}

module.exports = conexao;

