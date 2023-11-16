const express = require("express");
const {
  createOrder,
  fetchOrderByUser,
  deleteOrder,
  updateOrder,
  fetchAllOrders,
} = require("../controllers/Order");

const router = express.Router();

router
  .post("/", createOrder)
  .get("/my", fetchOrderByUser)
  .patch("/:id", updateOrder)
  .delete("/:id", deleteOrder)
  .get("/adminOnly", fetchAllOrders);

exports.router = router;
