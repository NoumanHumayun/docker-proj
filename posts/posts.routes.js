const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const { getAll, getById, addPost, updatePost } = require("./posts.controller");

const router = express.Router();
router.get("/", auth, getAll);
router.get("/:id", auth, getById);
router.post("/", auth, addPost);
router.put("/:id", auth, updatePost);

module.exports = router;
