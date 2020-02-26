var express = require('express');
var router = express.Router();



router.get('/', (req, res, nextr) => {

    res.json(req.flash('info'));

});

router.get('/create', (req, res, nextr) => {

    req.flash('info', 'Sessión flash info creada');
    res.redirect('/session-flash');

});


module.exports = router;




