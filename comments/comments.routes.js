const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const {
  getByPostId,
  getByPostUser,
  addComment,
  updateComment,
  deleteComment
} = require("./comments.controller");

const router = express.Router();
router.post("/posts/:id/comments", auth, addComment);
router.put("/posts/:id/comments", auth, updateComment);
router.delete("/posts/:id/comments", auth, deleteComment);
router.get("/posts/:id/comments", auth, getByPostId);
router.get("/posts/:id/comments", auth, getByPostUser);

module.exports = router;
