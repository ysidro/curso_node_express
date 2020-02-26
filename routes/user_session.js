var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json(req.session.username || "No existe la session");
});

router.get('/create', (req, res, next) => {
    req.session.username = "Ysidro";
    res.redirect('/user_session')
});

router.get('/remove-key', (req, res, next) => {
    req.session.username = null;
    res.redirect('/user_session')
});

router.get('/destroy', (req, res, next) => {
    req.session.destroy();
    res.redirect('/user_session')
});

module.exports = router