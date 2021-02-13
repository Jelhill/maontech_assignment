const express = require("express")
const router = require("./Routes/routes")
const app = express()
const morgan = require("morgan")
const cors = require("cors")


if (process.env.NODE_ENV === "development") {
    app.use(morgan("tiny"))
}

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors({credentials: true, origin: '*'}));


app.use("/", router)

module.exports = app