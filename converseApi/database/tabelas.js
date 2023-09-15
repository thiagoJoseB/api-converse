// 07 criando tabela do banco de dados
class tabelas {
    init(conexao){
        this.conexao = conexao;
        this.criarTabelaCliente();
        
    }


    criarTabelaCliente(){
        const sql = `
        create table if not exists tblUsuario(
            id int not null auto_increment primary key,
            nome varchar(100) not null,
            cpf varchar(50) not null,
            email varchar(30) not null,
            celular varchar(20) not null,
            senha varchar(100) not null
            );
            `;

        this.conexao.query(sql, (error) =>{
            if(error){
                console.log("Erro ao criar tabela");
                console.log(error.message());
                return;
            }
        console.log("tabela criada");
        });
    }
}


module.exports = new tabelas();

