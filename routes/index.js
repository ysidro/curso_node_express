var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express app' });
});

router.get('/hola-mundo', function (req, res, next) {
  res.json([{ msj: 'Hola Mundo' }]);
});
// nombre ruta
router.get('/change', function (req, res, next) {
  // Archivo del template
  res.render('change-layout', {
    title: 'Change',
    page: 'Variable Page',
    layout: 'handlebars-layour'
  });
});

// { id: 1, name: 'Ysidro' },
// { id: 2, name: 'Tracy' },
router.get('/handlebars', function (req, res, next) {
  // Archivo del template
  res.render('handlebars', {
    users: [
      { id: 1, name: 'Ysidro' },
      { id: 2, name: 'Tracy' },
    ],
    owner: {
      firstName: 'Ysiro,',
      lastName: 'Almonte'
    },
    appName: 'yamdev',
    layout: 'handlebars-layour'

  });
});

module.exports = router;
