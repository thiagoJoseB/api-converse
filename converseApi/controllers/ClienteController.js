// 09  arquivo para criar funcoes do crud;
// 12 chamando funcao de select da model
const clienteModel = require("../models/ClienteModel");
const express = require('express');
const app = express();
const router = express.Router();

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

  ///funcao de logar

  // logar(req, res) {
  //   const email = req.body.email;
  //   const senha = req.body.senha;
  //   console.log(senha, "senha");
  //   console.log(email, "email");

  //   // Supondo que clienteModel.buscarLogin seja uma função assíncrona ou retorne uma Promise
  //   clienteModel.buscarLogin(email, senha)
  //     .then((usuario) => {
  //       console.log(usuario, "caiu 33333");

  //       if (usuario !== null) {
  //         app.use((err, res) => {
  //           console.error(err);
  //           res.status(200).json({ error: 'Login bem-sucedido' });
  //         })
  //         // console.log("Login bem-sucedido");
  //       } else {
  //         app.use((err, res) => {
  //           console.error(err);
  //           res.status(401).json({ error: 'Credenciais inválidas' });
  //         })
  //       }
  //     })
  //     .catch((error) => {
  //       app.use((err, res,) => {
  //         console.error(err);
  //         res.status(500).json({ error: 'Erro interno do servidor' });
  //       })
  //       // console.error("Erro ao fazer login:", error);
  //     });
  // }


  logar(req, res) {
   
   const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: "As propriedades email e/ou senha não estão presentes em req.body." });
    }

    console.log(email, senha, "informacoesNovo");

    // Resto do seu código de login

    // Supondo que clienteModel.buscarLogin seja uma função assíncrona ou retorne uma Promise
    clienteModel.buscarLogin(email, senha)
      .then((usuario) => {
        console.log(usuario, "caiu 33333");

        if (usuario !== null) {
          // Responda com status 200 e uma mensagem JSON para sucesso
          res.status(200).json({ message: 'Login bem-sucedido' });
        } else {
          // Responda com status 401 e uma mensagem JSON para credenciais inválidas
          res.status(401).json({ error: 'Credenciais inválidas' });
        }
      })
      .catch((error) => {
        console.error("Erro ao fazer login:", error);
        // Responda com status 500 e uma mensagem JSON para erro interno do servidor
        res.status(500).json({ error: 'Erro interno do servidor' });
      });
  }


}



module.exports = new ClienteController();


