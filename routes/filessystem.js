var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/folders', (req, res, next) => {
    let files = [];
    fs.readdirSync('/Users/admin/Documents/Cursos/udemy/node-express/intro-curso-nodejs').filter((file) => {
        files.push(file);
    })
    res.status(200).json(files);
})

router.get('/files', (req, res, next) => {
    fs.readFile('app.js', 'utf8', (error, data) => {
        if (error) {
            res.status(500).send(error);
        }
        res.status(200).send(data);
    })
})

router.get('/write', (rep, res, next) => {
    fs.writeFile('test.txt', 'hola mundo test', (error => {
        if (error) {
            res.status(500).send(error)
        }
        res.status(200).json("El Archivo se a creado");
    }))
});
module.exports = router;