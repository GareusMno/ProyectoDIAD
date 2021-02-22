var mysql=require('mysql')

class Database{
    constructor(){}

    getConnection(){
        // Retorna la conexión
        return mysql.createConnection({
            insecureAuth : false,
            host    : '192.168.1.13',
            port    : '3308',
            user    : 'root',
            password: 'root',
            database: 'docencia'
        })
    }
}

module.exports = {
    Database:Database
}