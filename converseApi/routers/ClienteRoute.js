//01 npm init -y 
// npm install express
// 02 criaando arquivo para rotas da api

// 10 chamando funcoes crud

const clienteController = require("../controllers/ClienteController");
const { Router } = require("express");
const router = Router();


// criando metodos da apis
router.post("/cadastro",(req,res) =>{
    const cadastroDados = req.body;
    // 13
    const cadastroUsuario = clienteController.insert(cadastroDados);

    cadastroUsuario.then(cadastroCriado =>
         res.status(201).json(cadastroCriado)).catch(error =>
        res.status(400).json(error.message))

})
module.exports = router;

