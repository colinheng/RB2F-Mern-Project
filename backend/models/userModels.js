const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Let us know your name."],
  },
  email: {
    type: String,
    required: [true, "Let us know your email."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "A password is required."],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  }
},
{
  timestamps: true,
})

module.exports = mongoose.model("User", userSchema)