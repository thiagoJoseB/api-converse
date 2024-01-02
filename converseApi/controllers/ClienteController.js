// 09  arquivo para criar funcoes do crud;
// 12 chamando funcao de select da model
const clienteModel = require("../models/ClienteModel");
const express = require('express');
const app = express();
const router = express.Router();



app.use(express.json());

class ClienteController {
  // 12
  insert(cadastroDados) {
    return new Promise((resolve, reject) => {
      console.log("Dados recebidos:", cadastroDados);

      // Certifique-se de que a função clienteModel.create esteja configurada corretamente
      // para inserir os dados na base de dados
      clienteModel.create(cadastroDados)
        .then((cadastroCriado) => {
          console.log("Cadastro criado com sucesso:", cadastroCriado);
          resolve(cadastroCriado);
        })
        .catch((error) => {
          console.error("Erro ao criar o cadastro:", error);
          reject(error);
        });
    });
  }



  async logar(res, req) {
    try {
      const { email, senha } = req.body;
  
      // Verificar se email e senha estão presentes
      if (!email || !senha) {
        return res.status(400).json({ message: "As propriedades email e/ou senha não estão presentes em req.body." });
      }
  
      console.log(email, senha, "informacoesNovo");
  
      // Buscar login usando async/await
      const usuario = await clienteModel.buscarLogin(email, senha);
  
      if (usuario !== null) {
        res.status(200).json({ message: 'Login bem-sucedido' });
        return;
      } else {
        res.status(401).json({ error: 'Credenciais inválidas' });
        return;
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
  }
  
  
}

module.exports = new ClienteController();


