const { User } = require("../models");

async function getAll() {
  return await User.findAll();
}

async function login(email) {
  return await User.findOne({ email: email });
}

async function getById(id) {
  return await User.findOne({ id: id });
}

async function addUser(user) {
  const { name, username, email, phone, website } = user;
  return await User.create({ name, username, email, phone, website });
}

module.exports = { getAll, getById, addUser, login };
