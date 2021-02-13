const router = require("express").Router();
const User = require("../Schema/userSchema")
const jwt = require("jsonwebtoken")
const keys = require('../Config/keys')
const bcrypt = require('bcrypt')
const validator = require('validator')
const authUser = require("../middleware/authUser")
const userController = require("../controllers/userController")
const questionController = require("../controllers/questionController")


router.post("/register", userController.register);
router.post("/login", userController.login)
router.post("/addQuestion", authUser, userController.addQuestion);
router.get("/displayQuestions", questionController.displayQuestions);
  

module.exports = router;

