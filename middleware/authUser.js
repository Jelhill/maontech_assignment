const jwt = require("jsonwebtoken")
const keys = require("../Config/keys")

module.exports = (req, res, next) => {
    try {
        const checkToken = req.headers.authorization
        const headerToken = checkToken.split(" ")[1]
        const verifyToken = jwt.verify(headerToken, keys.jwtSecret) 
        if(!verifyToken){
            res.status(404).send('Unable to verify user')
        }else{
            req.auth = verifyToken
            next()
        }
    } catch (error) {
        res.status(401).json({message: "Please login to continue"})
    }
}

