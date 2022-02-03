const express = require("express");
const { isSelf, isSuperAdmin } = require("../middlewares/auth.middleware");
const { getAll, getById, addUser, login } = require("./users.controller");

const router = express.Router();

router.post("/login", login);
router.get("/", getAll);

router.get("/:id", isSelf, getById);
router.post("/", isSuperAdmin, addUser);

module.exports = router;
