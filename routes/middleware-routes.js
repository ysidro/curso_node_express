var express = require('express');
var router = express.Router();


const mA = (req, res, next) => {
    console.log('MA');
    next();
}

const mB = (req, res, next) => {
    console.log('MB');
    next();
}

const mC = (req, res, next) => {
    res.send('MC');
}

router.get('/', [mA, mB, mC]);
module.exports = router;