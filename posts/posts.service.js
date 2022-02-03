const { Post } = require("../models");

async function getAll() {
  return await Post.findAll();
}

async function getById(id) {
  return await Post.findOne({ id: id });
}

async function addPost(user) {
  const { name, username, email, phone, website } = user;
  return await Post.create({ name, username, email, phone, website });
}

module.exports = { getAll, getById, addPost };
