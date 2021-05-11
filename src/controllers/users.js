const express = require('express')
const UserModel = require('../models/user')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const SECURE_KEY = require('../constants/keys')
module.exports = {
    async get_logout(req, res) {
        req.logout()
    },
    async post_signup(req, res) {
/*         console.log(req.body);
 */        const {
            email,
            password
        } = req.body
        const newUser = new UserModel({
            email,
            password
        })
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save()
        return res.json({
            status: true,
            message: "user register succesfull"
        })
    },
    async post_login(req, res) {
        const {
            email,
            password
        } = req.body;
        const user = await UserModel.findOne({
            email: email
        })
        if (!user) {
            return res.json({
                auth: false,
                message: "Email or password incorrect"
            })
        }
        //const autenticate = user.confirmPassword(password)
        const autenticate = user.confirmPassword(password, function (err, isMatch) {
            if (err) throw err;
/*             console.log('Password123:', isMatch); // -&gt; Password123: true
 */
            if (!isMatch) {
                return res.json({
                    auth: false,
                    message: "Email or password incorrect"
                })
            }
            const token = jwt.sign(user._id.toString(), SECURE_KEY)
            if (!token) {
                return res.json({
                    auth: false,
                    message: "there was a problem, try it again"
                })
            }

            return res.json({
                auth: true,
                token: token
            })
        });

    }

}