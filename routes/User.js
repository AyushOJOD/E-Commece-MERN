const express = require("express");
const { fetchUserById, updateUser } = require("../controllers/User");

const router = express.Router();

router.get("/my", fetchUserById).patch("/:id", updateUser);

exports.router = router;
