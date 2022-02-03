const { Post } = require("../models");
const { getUser } = require("../middlewares/auth.middleware");

async function getAll(req, res) {
  const userId = await getUser(req, res);
  if (!userId) return res.status(403).json({ message: "Forbidden!" });

  const allPosts = await Post.findAll({ userId: userId });
  return res.json(allPosts);
}

async function getById(req, res) {
  const userId = await getUser(req, res);
  if (!userId) return res.status(403).json({ message: "Forbidden!" });

  const id = parseInt(req.params.id);
  const post = await Post.findOne({ id: id, userId: userId });
  return res.status(200).json(post);
}

async function addPost(req, res) {
  const userId = await getUser(req, res);
  if (!userId) return res.status(403).json({ message: "Forbidden!" });
  const post = await Post.create({ ...req.body, userId: userId });

  return res.status(201).json(post);
}

async function updatePost(req, res) {
  const { title, body } = req.body;
  const postId = parseInt(req.params.id);
  const post = await Post.update({ title: title, body: body, updatedAt: "now()" }, { where: { id: postId } });

  return res.status(200).json(post);
}

module.exports = { getAll, getById, addPost, updatePost };
