const express = require("express");
const { fetchUserById, updateUser } = require("../controllers/User");

const router = express.Router();

router.get("/:id", fetchUserById).patch("/:id", updateUser); // We put only / because in the index file we have already given the base path

exports.router = router;
