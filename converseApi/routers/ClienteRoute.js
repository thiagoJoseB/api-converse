//01 npm init -y 
// npm install express
// 02 criaando arquivo para rotas da api

// 10 chamando funcoes crud

const clienteController = require("../controllers/ClienteController");
const clienteModel = require("../models/ClienteModel");
const { Router } = require("express");
const router = Router();


// criando metodos da apis
router.post("/cadastro",(req,res) =>{
    const cadastroDados = req.body;
    console.log(cadastroDados);    
    // 13
    const cadastroUsuario = clienteController.insert(cadastroDados);

    cadastroUsuario.then(cadastroCriado =>
         res.status(201).json(cadastroCriado)).catch(error =>
        res.status(400).json(error.message))

});

///criando rota de login
// router.get("/login", (req,res)=>{
//     const usuario = req.body;
//     console.log(usuario);

//     const login = clienteController.logar(usuario);
//     console.log(login, "caiu 222");

//     login.then(loginUsuario =>
//         res.status(201).json(loginUsuario)).catch(error =>
//         res.status(400).json(error.message))
// });
router.post("/login",  async (req, res) => {
    try {
      const { email, senha } = req.body;
      console.log(email, senha , "informacoes");
      const loginUsuario = await clienteController.logar(email, senha);
      if (loginUsuario) {
        res.status(200).json({ mensagem: "Login bem-sucedido", usuario: loginUsuario });
      } else {
        res.status(401).json({ mensagem: "Credenciais inválidas" });
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  });
  
module.exports = router;

