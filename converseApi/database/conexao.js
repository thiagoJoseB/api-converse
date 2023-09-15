// 06 criando arquivo para conexao com o banco de dados
const mysql = require("mysql");

const conexao = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "converse"

});

if(conexao){
    console.log("conectado");
    console.log(conexao);
}else{
    console.log("naoo");
}

module.exports = conexao;

