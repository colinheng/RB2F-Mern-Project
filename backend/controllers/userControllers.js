const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/userModels")

// @desc Register a new user
// @route /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body

  // validate n/e/p
  if (!name || !email || !password) {
    res.status(400)
    throw new Error("All fields are required")
  }

  // find if this email exists
  const userExists = await User.findOne({email})

  if (userExists) {
    res.status(400)
    throw new Error("Email exists in database.")
  }

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // store new user deets in db
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("This user cannot be registered.")
  }

})

// @desc Login a user
// @route /api/users/login
// @access public
const loginUser = asyncHandler( async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({email})

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("These credentials are invalid.")
  }
})

// @desc Get current user
// @route /api/users/me
// @access private
const getMe = asyncHandler(async (req, res) => { 
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  }
  res.status(200).json(user)
})


// generate jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}