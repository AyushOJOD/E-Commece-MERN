const { mongoose } = require("mongoose");

async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URL, {
    dbName: "E-CommerceAPI",
  });
  console.log("Database connected");
}

connectDB().catch((err) => console.log(err));
