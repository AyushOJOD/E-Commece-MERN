const express = require("express");
const { fetchAllBrands, createBrand } = require("../controllers/Brand");

const router = express.Router();

router.get("/", fetchAllBrands).post("/", createBrand); // We put onlt / because in the index file we have already given the base path

exports.router = router;
