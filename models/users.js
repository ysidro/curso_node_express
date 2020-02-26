var conn = require('../conextion/mysql');
var bcrypt = require('bcrypt-nodejs');

let User = {};

User.fetchAll = (callback) => {


    if (conn) {
        const sql = "SELECT * FROM users";

       // conn.query(sql, [id], (error, row) => {

        conn.query(sql, (error, row) => {

            if (error) {
                return callback(error);
            } else {
                return callback(null,row);
            }
        });

    } else {
        return callback("No se ha podido conectar 1");
    }
}

User.insert = (user,callback) => {
    if(conn){
        conn.query('INSERT INTO users SET ?',[user],(error,result) =>{
            if(error){
                return callback(error);
            }
            return callback(null,result.insertId);
        })
    }
    else
    {
        return callback("No se ha podido conectar 2");
    }
}


User.findById = (id,callback) => {
    if(conn){

        conn.query('SELECT * FROM users WHERE id = ?', [id],(error,row) => {

            if(error){
                    return callback(error);

            }else{
                    return callback(null,row)
            }

        } );

    }else{

    }
}

User.findOne = (username,password,callback) =>{
    if(conn){

        conn.query(`SELECT * FROM users WHERE username = ${conn.escape(username)} AND password = ${conn.escape(password)}`,
            (error,rows) => {

                if(error){
                    return callback(error);
                }

                if(rows.length === 0){
                        return callback(null,null);
                }
                var check = bcrypt.compareSync(password,rows[0].password);
                if(check){
                     return callback(null,rows[0]);
                 }else{
                    return callback(null,null);
                 }
            }
        )
    }
};

module.exports = User;