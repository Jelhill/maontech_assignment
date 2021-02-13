const router = require("express").Router();
const Question = require("../Schema/questionSchema")
const UserSchema = require("../Schema/userSchema")
const jwt = require("jsonwebtoken")
const keys = require('../Config/keys')
const bcrypt = require('bcrypt')
const validator = require('validator')

function User(data) {
    this.data = data;
    this.errors = []
}

User.prototype.register = function() {
    return new Promise(async (resolve, reject) => {
        const { firstname, lastname, email, password, confirmPassword } = this.data;
        if(this.data.password !== this.data.confirmPassword) {
            this.errors.push("Password Mismatch")
            return reject(this.errors)
        }
        
        const salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(password, salt)
        const userSchema = new UserSchema({firstname, lastname, email, password: hashPassword, confirmPassword})

        userSchema.save((err, data) => {
            console.log(err)
            if(err || !data) {
                this.errors.push("Unable to send question")
                return reject(this.errors)
            }
            resolve(data)
        })
    })
}



User.prototype.login = function() {
    return new Promise(async (resolve, reject) => {
        if (!validator.isEmail(this.data.email)) this.errors.push('Please enter a valid email')
        if (!this.data.password) this.errors.push("Password is too short")
    
        if(this.errors.length) {
            return reject(this.errors)
        }

        UserSchema.findOne({email: this.data.email})
        .exec()
        .then(async (data) => {  
            if(data && await bcrypt.compare(this.data.password, data.password)) {
                return resolve(data)
            }else{
                this.errors.push("username/ password mismatch")
                return reject(this.errors)
            }
        })
    })
}



User.prototype.addQuestion = function() {
    return new Promise(async (resolve, reject) => {
        const { userId, title, tags, body} = this.data
        const question = new Question({userId, body, title, tags})
        question.save((err, data) => {
            if(err || !data) {
                this.errors.push("Unable to update question")
                return reject(this.errors)
            }
            resolve(data)
        })
    })
}


module.exports = User