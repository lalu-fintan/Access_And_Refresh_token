const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

const register = expressAsyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (user) {
    res.status(400).json("email already exist");
  }

  const hash = await bcrypt.hash(password, 10);
  const createUser = await userModel.create({
    username,
    email,
    password: hash,
  });
  console.log(createUser);
  res.status(200).json(createUser);
});

const login = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user && bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        user: {
          id: user.id,
          email,
          username: user.username,
          role: user.role,
        },
      },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "2d" }
    );
    res.header(200).json({
      status: "success",
      data: user.role,
      token,
    });
  } else {
    res.status(400).json("it's not valid");
  }
});

module.exports = { register, login };
