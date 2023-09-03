const asyncHandler = require("express-async-handler")

const User = require("../models/userModels")
const Note = require("../models/noteModel")
const Ticket = require("../models/ticketModel")

// @desc Get notes for a ticket id
// @route GET /api/tickets/:ticketId/notes
// @access private
const getNotes = asyncHandler(async (req, res) => { 
  // retrieve id from JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found.")
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorised")
  }

  const notes = await Note.find({ ticket: req.params.ticketId })

  res.status(200).json(notes)

})

// @desc Create a note for a ticket
// @route POST /api/tickets/:ticketId/notes
// @access private
const addNote = asyncHandler(async (req, res) => { 
  // retrieve id from JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found.")
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorised")
  }

  const note = await Note.create({ 
    text: req.body.text,
    ticket: req.params.ticketId,
    isStaff: false,
    user: req.user.id,
    })

  res.status(200).json(note)

})

module.exports = {
  getNotes,
  addNote,
}