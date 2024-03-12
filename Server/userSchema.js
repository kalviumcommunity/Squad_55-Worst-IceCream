const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: String,
    password:String
});
const Model = mongoose.model("cred", userSchema);
console.log(Model)
module.exports = {Model};