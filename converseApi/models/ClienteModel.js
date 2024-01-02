// 11 criando model com funcoes do crud
// chamando arquivo de conexao com banco
const conexao = require("../database/conexao");
const clienteRoute = require("../routers/ClienteRoute");

class ClienteModel{
    // 14 
    // 11 novo fluxo

    create(cadastroDados) {
        const sql = "INSERT INTO tblUsuario (id, nome, cpf, email, celular, senha) VALUES (null, ?, ?, ?, ?, ?)";

        return new Promise((resolve, reject) => {
          conexao.query(sql,  [cadastroDados.nome, cadastroDados.cpf, cadastroDados.email, cadastroDados.celular, cadastroDados.senha], (error, resposta) => {
            if (error) {
              console.log("Erro ao criar:", error);
              reject(error);
            } else {
                // console.log(datas);
              console.log("Registro criado com sucesso");

               // Recupere os dados recém-inseridos
               const idInserido = resposta.insertId;

               // Execute uma consulta SELECT para obter os dados recém-inseridos
               conexao.query("SELECT * FROM tblUsuario WHERE id = ?", [idInserido], (error, rows) => {
                   if (error) {
                       console.log("Erro ao recuperar os dados:", error);
                       reject(error);
                   } else {
                       console.log("Dados recuperados com sucesso:", rows[0]);
                       resolve(rows[0]);
                   }

                  });    
              console.log(cadastroDados.nome, "essse dados");
              resolve(resposta);
            }
          });
        });
        
   
      }

      buscarLogin(email, senha) {
        const sql = "SELECT email, senha FROM tblUsuario WHERE email = ? AND senha = ?";
        return new Promise((resolve, reject) => {
          conexao.query(sql, [email, senha], (error, resposta) => {
            if (error) {
              console.log("Erro ao buscar dados de login", error);
              reject(error);
            } else {
              if (resposta.length > 0) {
                console.log("Dados de login encontrados:", resposta);
                resolve(resposta[0]); // Retorna o primeiro resultado (assumindo que o email é único)
                console.log(resposta, "caiu 111");
              } else {
                console.log("Nenhum dado de login encontrado para o email e senha fornecidos.");
                resolve(null);
              }
            }
          });
        });
      }
}

module.exports = new ClienteModel();
