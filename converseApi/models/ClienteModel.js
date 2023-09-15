// 11 criando model com funcoes do crud
// chamando arquivo de conexao com banco
const conexao = require("../database/conexao");

class ClienteModel{
    // 14 
    // 11 novo fluxo

    create(cadastroDados) {
        const sql = "INSERT INTO tblUsuario (id, nome, cpf, email, celular, senha) VALUES ('', '', '', '', '', '')";
        return new Promise((resolve, reject) => {
          conexao.query(sql, cadastroDados, (error, resposta) => {
            if (error) {
              console.log("Erro ao criar:", error);
              reject(error);
            } else {
                console.log(cadastroDados);
              console.log("Registro criado com sucesso");
              resolve(resposta);
            }
          });
        });
      }


}

module.exports = new ClienteModel();
