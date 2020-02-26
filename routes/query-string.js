var express = require('express');
var router = express.Router();

router.get('/user-info', (req, res, next) => {
    let data = {};

    if (req.query.user) {
        data.user = req.query.user;
    } else {

    }
    if (req.query.job) {
        data.job = req.query.job;
    } else {

    }
    if (req.query.hobbies) {
        data.hobbies = JSON.parse(req.query.hobbies);
    } else {

    }


    res.status(200).json(data);

});


module.exports = router