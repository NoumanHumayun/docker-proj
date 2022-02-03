const { Comment } = require("../models");

async function getByUser() {
  return await Comment.findAll();
}

async function getById(id) {
  return await Comment.findOne({ id: id });
}

async function addComment(user) {
  const { name, username, email, phone, website } = user;
  return await Comment.create({ name, username, email, phone, website });
}

module.exports = { getByUser, getById, addComment };
