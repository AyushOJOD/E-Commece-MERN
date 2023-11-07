const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
const productsRouter = require("./routes/Products.js");
const categoriesRouter = require("./routes/Category.js");
const brandsRouter = require("./routes/Brand.js");
const userRouter = require("./routes/User.js");
const authRouter = require("./routes/Auth.js");
const cartRouter = require("./routes/Cart.js");
const ordersRouter = require("./routes/Order.js");

// middlewares:
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
server.use(express.json());
server.use("/auth", authRouter.router);
server.use("/products", productsRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/brands", brandsRouter.router);
server.use("/users", userRouter.router);
server.use("/cart", cartRouter.router);
server.use("/orders", ordersRouter.router);

async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://rishiustaad:Kumar%401234@cluster0.f63n5tv.mongodb.net/",
    {
      dbName: "E-CommerceAPI",
    }
  );
  console.log("Database connected");
}

connectDB().catch((err) => console.log(err));

server.get("/", (req, res) => {
  res.json({
    status: "success",
  });
});

server.listen(8080, () => {
  console.log("Sever is working");
});
