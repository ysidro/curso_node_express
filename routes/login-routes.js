var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/users');

passport.serializeUser((user,done)=>{
    done(null,user.id);
})


passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user[0]);
    });
});

router.get('/',(req,res,next)=>{
    res.render('login',{
            title:'Login Passpot y Mysql',
            message:req.flash('error'),

        });
});

passport.use(new localStrategy(
        (username, password,done) =>{


            User.findOne(username,password,(error,user)=>{


                if(error){
                    return done(error);
                }
                if(!user){
                    return done(null, false, {message:'El usuario no ha sido identificado'} );
                }
                return done(null,user);
            })
        }
    ))



router.post('/login',
            passport.authenticate('local',{
                failureRedirect:'/user-login/',
                failureFlash:true
            }),
            (req,res) => {
                res.redirect(`/user-login/user/${req.user.id}`);
            }
)

router.get('/user/:id', (req,res,next) => {

    res.render('user',{
        title:`Bienvenido ${req.user.username}`
    });
})
module.exports = router;