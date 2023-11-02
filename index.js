const express = require("express");
const server = express();
const mongoose = require("mongoose");
const productsRouter = require("./routes/Products.js");
const categoriesRouter = require("./routes/Category.js");
const brandsRouter = require("./routes/Brand.js");
const userRouter = require("./routes/User.js");
const authRouter = require("./routes/Auth.js");
const cors = require("cors");

// middlewares:
server.use(express.json());
server.use("/products", productsRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/brands", brandsRouter.router);
server.use("/user", userRouter.router);
server.use("/auth", authRouter.router);
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

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
