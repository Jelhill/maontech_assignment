process.env.NODE_ENV === "development" ?
    module.exports = require("./Config/development") :
    module.exports = require("./Config/production")