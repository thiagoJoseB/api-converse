// 04 criando um constante para enviar para a index as requisicoes do cliente
const routerCliente = require("./ClienteRoute");
module.exports = (app, express) =>{
    app.use(routerCliente);

    

app.use(express.json());
app.use(express.urlencoded({extended: true}))
};
