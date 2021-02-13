const User = require('../model/User')
const jwt = require("jsonwebtoken")
const keys = require('../Config/keys')
const bcrypt = require('bcrypt')
const validator = require('validator')

exports.register = async (req, res) => {
    const user =  new User(req.body)
    user.register()
    .then(data => {
        jwt.sign({userId: data._id}, keys.jwtSecret, {expiresIn: "2000s"}, (err, token) => {
            if(err) {
                return res.json({success: false, message: "unable to generate token"})
            }
            return res.status(200).json({success: true, message: "Your accoun hasv been created", access_token: token})            
        })
    })
    .catch(error => {
        return res
        .status(500)
        .json({success: false, message: error})
    })
}


exports.login = async (req, res) => {
    const user = new User(req.body)
    user.login()
    .then(async (data) => {
        jwt.sign({userId: data._id}, keys.jwtSecret, {expiresIn: "2000s"}, (err, token) => {
            if(err) {
                return res
                .status(400)
                .json({success: false, message: "unable to generate token"})
            }
            return res
            .status(200)
            .json({success: true, message: "Message has been updated", access_token: token})            
        })        
    })
    .catch((error) => {
        return res
        .status(500)
        .json({success: false, error})
    })    
}

exports.addQuestion = (req, res) => {
    req.body.userId = req.auth.userId
    const user = new User(req.body)
    user.addQuestion()
    .then((data) => {
        res.status(200).json({success: true, message: "Question has been added"})
    })
    .catch((error) => {
        res.status(400).json({success: false, error})

    })
}