const express = require("express");
const { fetchAllCategory, createCategory } = require("../controllers/category");

const router = express.Router();

router.get("/", fetchAllCategory).post("/", createCategory); // We put onlt / because in the index file we have already given the base path

exports.router = router;
