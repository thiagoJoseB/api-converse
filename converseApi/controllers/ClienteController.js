// 09  arquivo para criar funcoes do crud;
// 12 chamando funcao de select da model
const clienteModel = require("../models/ClienteModel");
const express = require('express');
const app = express();
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer'); 
const { Resolver } = require("dns/promises");
require('dotenv').config();

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


  //// passo 02 npm npm install crypto e codigo

//   transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASS
//   },
//   debug: true, 
// });


  transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
     port: 465,
     ///587
     /// usa ele como falso 
     secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
      },
  debug: true, 
   connectionTimeout: 5000,
});



  gerarCodigo(){
    return crypto.randomBytes(6).toString('hex').toUpperCase();
  }

  sendRecoveryCodeByEmail = async(req, res) =>{
    const {email} = req.body;

    try{
      const recoveryCode = this.gerarCodigo();
      const expiration = new Date(Date.now() + 30 * 60 * 1000); // 30 minutos de expiração
      
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        // html: ""
        subject: 'Código de Recuperação de Senha',
        text: `Seu código de recuperação de senha é: ${recoveryCode}. Este código expirará em 30 minutos.`
      };

      await this.transporter.sendMail(mailOptions);

  
      res.status(200).json({ message: 'E-mail enviado com sucesso.' });

    }catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao enviar o código de recuperação.' });
    }
  }
}

module.exports = new ClienteController();


