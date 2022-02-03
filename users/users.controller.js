const jwt = require("jsonwebtoken");
const config = require("../config");
const { User } = require("../models");

async function getAll(req, res) {
  const allUsers = await User.findAll();
  return res.json(allUsers);
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    res.status(400).json({ message: "Required field missing!" });
  const user = await new Promise((resolve, reject) => {
    try {
      User.findOne({
        where: {
          email: email, // user email
        },
      }).then(async (response) => {
        if (!response) {
          resolve(false);
        } else {
          if (
            !response.dataValues.password ||
            !(await response.validPassword(
              password,
              response.dataValues.password
            ))
          ) {
            resolve(false);
          } else {
            resolve(response.dataValues);
          }
        }
      });
    } catch (error) {
      const response = {
        status: 400,
        data: {},
        error: {
          message: "Invalid email or password",
        },
      };
      reject(response);
    }
  });
  if (!user) res.status(400).json({ message: "Invalid Email or Password!" });

  res.status(200).json({
    username: user.username,
    token: jwt.sign({ id: user.id, email: user.email }, config.secret, {
      expiresIn: "72h",
    }),
  });
}

async function getById(req, res) {
  //Query params are string so had to convert to int
  const id = parseInt(req.params.id);
  //find in array of users using the id param
  const user = await User.findOne({ id: id });
  return res.status(200).json(user);
}

async function addUser(req, res) {
  const user = await User.create(req.body);

  return res.status(201).json(user);
}

module.exports = { getAll, getById, addUser, login };
