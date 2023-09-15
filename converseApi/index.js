// 03 criando arquivo index raiz , onde instancio o express
const express = require("express");
const app = express();
const port = 3000;

// 05 importando requisicoes clientes;
const router = require("./routers/index");

// 08 chama funcao de conexao e criacao de tabela do banco de dados
const conexao = require("./database/conexao");
const tabelas = require("./database/tabelas");

tabelas.init(conexao);
router(app,express);

app.listen(port, (error)=>{
    if(error){
        console.log("deu erro");
        return;
    }
    console.log("foi");
});


