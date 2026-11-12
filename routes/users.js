
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/pintreset-clone");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    }],
 
    dp: {
      type: String,
    },

    email: {
      // Assuming the profile picture is stored as a URL or file path 
      type: String,  
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
    },
  },

);

module.exports = mongoose.model("User", userSchema);



