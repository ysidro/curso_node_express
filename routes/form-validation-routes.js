var express = require('express');
var router = express.Router();
var form = require('express-form2');
var field = form.field;
var User = require('../models/users');
var bcrypt = require('bcrypt-nodejs');
router.get('/',(req,res,next) =>{
    res.render('form-validation', {title: "Validacion de Formularios",
                                   errors:[],
                                   post: [],
                                   flash:req.flash('success')
                               });
});

router.post('/register',
            (req,res,next) =>{
                req.body = JSON.parse(JSON.stringify(req.body));
                next();
            },
            form(
                field('username')
                 .trim()
                 .required("","El %s es requerido")
                 .is(/^[a-z]+$/, 'El %s sólo puede contener letras'),

                field('email')
                .trim()
                .required("","El %s es requerido")
                .isEmail('El Formato del %s no es válido'),

                field('password')
                .trim()
                .required("","El %s es requerido")
                .minLength(6,"El passwiord no puede contener menos de 6 caracteres")
                .is(/^[0-9]+$/, 'El %s sólo puede contener letras')
            ),
            (req,res,next) => {

                    if(!req.form.isValid){
                        res.render('form-validation',
                                   {title: "Validacion de Formularios",
                                    errors:req.form.errors,
                                    post: req.body
                                });
                    }else{
                        const user = {
                            id:null,
                            username: req.body.username,
                            password: bcrypt.hashSync(req.body.password),
                            email:req.body.email

                        };

                        User.insert(user,(error,inserId) => {

                            if(inserId){
                                req.flash('success','Usuario registrado correctamente');
                                res.redirect('/form');
                            }else{
                               res.status(500).json('Error guardando el usuario');

                              // console.log(error);
                            }
                        })
                    }

                }
            )

module.exports = router;