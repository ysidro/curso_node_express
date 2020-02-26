var express = require('express');
var router = express.Router();

router
    .get('/', (req, res, next) => {
        res.json(200, "Obtener todas las facturas");
    })
    .get('/:invoice', (req, res, next) => {

        res.json(200, "Obtener la factura #" + req.params.invoice);
    })
    .post('/', (req, res, next) => {
        res.json(req.body);
    })
    .patch('/:invoice', (req, res, next) => {
        res.json({ body: req.body, params: req.params });
    })
    .delete('/:invoice', (req, res, next) => {
        res.json(200, "Borrar la factura #" + req.params.invoice);
    });



module.exports = router;