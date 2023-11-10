const express = require("express");
const server = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const crypto = require("crypto");
const productsRouter = require("./routes/Products.js");
const categoriesRouter = require("./routes/Category.js");
const brandsRouter = require("./routes/Brand.js");
const userRouter = require("./routes/User.js");
const authRouter = require("./routes/Auth.js");
const cartRouter = require("./routes/Cart.js");
const ordersRouter = require("./routes/Order.js");
const { User } = require("./models/User.js");
const { isAuth, sanitizeUser } = require("./services/common.js");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const SECRET_KEY = "SECRET_KEY";

//JWT options
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;

// middlewares:
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
server.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
server.use(passport.authenticate("session"));
server.use(express.json());
server.use("/auth", authRouter.router);
server.use("/products", isAuth(), productsRouter.router);
server.use("/categories", isAuth(), categoriesRouter.router);
server.use("/brands", isAuth(), brandsRouter.router);
server.use("/users", isAuth(), userRouter.router);
server.use("/cart", isAuth(), cartRouter.router);
server.use("/orders", isAuth(), ordersRouter.router);

//passport middleware

passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email }).exec();
      if (!user) {
        done(null, false, { message: "Invalid credentials" });
      }

      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            done(null, false, { message: "Invalid credentials" });
          }
          {
            const token = jwt.sign(sanitizeUser(user), SECRET_KEY);

            done(null, token);
          }
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  "JWT",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    const user = await User.findOne(
      { id: jwt_payload.sub },
      function (err, user) {
        try {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
            // or you could create a new account
          }
        } catch (err) {
          return done(err, false);
        }
      }
    );
  })
);

passport.serializeUser(function (user, cb) {
  // Creating the session variable on req.user callled
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

passport.deserializeUser(function (user, cb) {
  // creates user from session variable
  process.nextTick(function () {
    return cb(null, user);
  });
});

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
