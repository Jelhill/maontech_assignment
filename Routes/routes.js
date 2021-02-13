const router = require("express").Router();
const authUser = require("../middleware/authUser")
const userController = require("../controllers/userController")
const questionController = require("../controllers/questionController")

router.get("/", (req, res) => res.status(200).json({success: true, message:"App is working fine"}))
router.post("/register", userController.register);
router.post("/login", userController.login)
router.post("/addQuestion", authUser, userController.addQuestion);
router.get("/displayQuestions", questionController.displayQuestions);
  

module.exports = router;

