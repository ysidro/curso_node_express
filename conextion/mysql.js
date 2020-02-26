const mysql = require('mysql');
const conn = mysql.createConnection({
    host: "127.0.0.1",
    user: 'user',
    password: 'password',
    database: 'db'
});

module.exports = conn;

