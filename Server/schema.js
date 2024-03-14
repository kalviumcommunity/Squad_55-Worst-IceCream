const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    // _id: String,
    flavour: String,
    taste: String,
    color: String,
    rating: Number,
    image: String,
    created_by: String,
});
const userModel = mongoose.model("worst-icecream-flavours-collections", userSchema);
module.exports = {userModel};
