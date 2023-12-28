// 03 criando arquivo index raiz , onde instancio o express
const express = require("express");
const app = express();
const port = 3000;

// 05 importando requisicoes clientes;
const router = require("./routers/index");
const bodyParser = require('body-parser');

// 08 chama funcao de conexao e criacao de tabela do banco de dados
const conexao = require("./database/conexao");
const tabelas = require("./database/tabelas");

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use('/login', Anyroute)
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
tabelas.init(conexao);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router(app,express);

app.listen(port, (error)=>{
    if(error){
        console.log("deu erro");
        return;
    }
    console.log("foi");
});


