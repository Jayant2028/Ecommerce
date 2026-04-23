const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// show signup form
router.get('/register',(req,res)=>{
    res.render('auth/signup');
});

// register user (FIXED)
router.post('/register',async(req,res,next)=>{
    try{
        let {email,username,password} = req.body;

        // 🔴 basic validation
        if(!email || !username || !password){
            req.flash('error','All fields are required');
            return res.redirect('/register');
        }

        // 🔴 check if user already exists
        const existingUser = await User.findOne({username});
        if(existingUser){
            req.flash('error','Username already exists');
            return res.redirect('/register');
        }

        // create user
        const user = new User({email,username});
        const newUser = await User.register(user,password);

        // login after register
        req.login(newUser,function(err){
            if(err){return next(err);}
            req.flash('success','Welcome! Registration successful');
            return res.redirect('/products');
        });

    }catch(e){
        req.flash('error',e.message);
        return res.redirect('/register');
    }
});

// show login form
router.get('/login',(req,res)=>{
    res.render('auth/login');
});

// login user
router.post('/login',
    passport.authenticate('local',{
        failureRedirect:'/login',
        failureFlash:true
    }),
    (req,res)=>{
        req.flash('success','Welcome back');
        res.redirect('/products');
    }
);

// logout
router.get('/logout',(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err);}
        req.flash('success','Logged out successfully');
        res.redirect('/login');
    });
});

module.exports = router;