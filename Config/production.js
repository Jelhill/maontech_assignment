const mongoose = require("mongoose")
require("dotenv").config()
const keys = require("../Config/keys")

mongoose.connect(keys.mongoUri, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
    if(err) {
        console.log("cannot connect to Database")
        process.exit(1)
    }else{
        console.log(`::Database Connected on !!!Production`)
        module.exports = client
        const app = require("../server")
        const PORT = process.env.PORT || 8080
        app.listen(PORT, () => console.log(`::Server running on port ${PORT}`))
    }
})
 