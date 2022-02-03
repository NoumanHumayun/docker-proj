const { Comment } = require("../models");

async function getByPostUser(req, res) {
  const userId = parseInt(req.query.userId);
  const postId = parseInt(req.params.id);
  let allComments = [];
  if (user === userId)
    allComments = await Comment.findAll({ userId: userId, postId: postId });
  return res.json(allComments);
}

async function getByPostId(req, res) {
  const postId = parseInt(req.params.id);
  const comment = await Comment.findAll({ postId: postId });
  return res.status(200).json(comment);
}

async function addComment(req, res) {
  const postId = parseInt(req.params.id);
  const comment = await Comment.create({ ...req.body, postId: postId });

  return res.status(201).json(comment);
}

async function updateComment(req, res) {
  const { name, email, body } = req.body;
  // Assuming that param is comment ID
  // Else if we get post id we will not be able to update single comment
  const commentId = parseInt(req.params.id);
  const comment = await Comment.update(
    { name, email, body },
    { where: { id: commentId } }
  );

  return res.status(200).json(comment);
}

async function deleteComment(req, res) {
  // Assuming that param is comment ID
  // Else if we get post id we will not be able to update single comment
  const commentId = parseInt(req.params.id);
  await destroy({
    where: {
      id: commentId,
    },
  });

  return res.status(200).json("Delete Succesfully");
}

module.exports = {
  getByPostUser,
  getByPostId,
  addComment,
  updateComment,
  deleteComment,
};
