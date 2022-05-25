
const mongoose = require("mongoose");

const connect = function(){
    return mongoose.connect("mongodb://localhost:27017/beusalonsproducts")
}

module.exports = connect;