const express = require("express");
const { createUser } = require("../controllers/Auth");

const router = express.Router();

router.post("/signup", createUser); // We put only / because in the index file we have already given the base path

exports.router = router;
