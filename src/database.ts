import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: '159753Guto', 
    database: 'controle_de_estoque'
});

connection.connect((err) => {
    if(err) {
        console.error('Não foi possivel conectar ao banco de dados: ', err);
        return;
    }
    console.log('Conectado ao banco de dados');
});

export default connection;