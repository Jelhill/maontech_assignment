
const Question = require("../Schema/questionSchema")

exports.displayQuestions = (req, res) => {
    Question.find({})
    .then(data => {
        if(!data) return res.json({status: false, message: "Empty Data"})
        res.status(200).json({success: true, data})
    })
    .catch((error) => {
        console.log(error)        
        return res.status(500).json({success: false, message: "Unable to send question"})
    })
}