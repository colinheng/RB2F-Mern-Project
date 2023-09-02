const mongoose = require("mongoose")

const ticketSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  product: {
    type: String,
    required: [true, "Select a product."],
    enum: ["iPhone", "Macbook Pro", "iMac", "iPad"],
  },
  description: {
    type: String,
    required: [true, "Please describe issue requiring support."],
  },
  status: {
    type: String,
    required: true,
    enum: ["new", "open", "closed"],
    default: "new",
  }
},
{
  timestamps: true,
})

module.exports = mongoose.model("Ticket", ticketSchema)