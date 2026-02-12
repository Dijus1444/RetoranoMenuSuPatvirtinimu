const User = require("../models/UserModel.js");
const bcryptjs = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../functions/generateToken.js");

// Registracija, PUBLIC
// @ POST
// route /users/register
const registerUser = asyncHandler(async (req, res) => {
  //susimazinam kad lengviau butu
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all field, you stupid user");
  }

  const userExistsInDB = await User.findOne({ email });

  if (userExistsInDB) {
    res.send(400);
    throw new Error("User already exists");
  }
  //parodo kiek uzkuodoto zodzio prideti zenkliuku
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const user = await User.create({
    userName: name,
    userEmail: email,
    password: hashedPassword,
    role: "simple",
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      userName: user.userName,
      userEmail: user.userEmail,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("User was not Created, invalid data or whatever");
  }
});

//login, PUBLIC
// @ POST
// route /users/login

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ userEmail: email });

  if (user && (await bcryptjs.compare(password, user.password))) {
    res.json({
      id: user.id,
      userName: user.userName,
      userEmail: user.userEmail,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw Error("Invalid credentials, check input values");
  }
});

//get all users
// @ GET
// route / users/all
const getAllUsers=asyncHandler(async(req, res)=>{
  const users = await User.find().select("-password");
  res.json(users);
})

///
module.exports = { registerUser, loginUser, getAllUsers };
