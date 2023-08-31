const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModels")

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // extract jwt from header
      token = req.headers.authorization.split(" ")[1]

      // verify jwt
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // extract user from token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error("Not authorised")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Not authorised")
  }
})

module.exports = { protect }