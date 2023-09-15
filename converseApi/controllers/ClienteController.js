// 09  arquivo para criar funcoes do crud;
// 12 chamando funcao de select da model
const clienteModel = require("../models/ClienteModel");

class ClienteController{
    // 12
    insert(cadastroDados){
        console.log("FOIII");
        console.log(cadastroDados);
        return clienteModel.create(cadastroDados);
    }

    

}


module.exports = new ClienteController();


