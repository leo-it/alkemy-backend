const express = require('express')
const User = require('../models/user')
const passport = require('passport')

module.exports = {
    async get_logout(req, res) {
        req.logout()
    },
    async post_signup(req, res) {
            /* console.log(req.body);
            */const {email, password , confirmPassword}=req.body
            if(password != confirmPassword){
                res.send('password not match')
            }

            else{
                const emailUser = await User.findOne({email:email})
            if(emailUser){
                res.end( "emai in use");
            } else{
                const newUser= new User({email, password})
                newUser.password = await newUser.encryptPassword(password)
                await newUser.save()
                res.end('User save')
            }
            }
    } 
    
    
    /* ,
    async post_login(req, res) {
        passport.authenticate("local",{
            successRedirect:'http://localhost:3001/signup',
            failureRedirect:'http://localhost:3001/signup',
            failureFlash:true
        }
        )
     }  */
    

}