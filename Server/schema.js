const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    flavour: String,
    taste: String,
    color: String,
    rating: Number,
    image: String,
});
const userModel = mongoose.model("worst-icecream-flavours-collections", userSchema);
module.exports = {userModel};