const { User } = require("../models/User");

exports.createUser = async (req, res) => {
  const user = new User(req.body);

  try {
    const docs = await user.save();
    res.status(200).json({ id: docs.id, role: docs.role });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();

    if (!user) {
      res.status(401).json({ message: "No such user exists!" });
    } else if (user.password === req.body.password) {
      res.status(200).json({
        id: user.id,
        role: user.role,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(401).json(err);
  }
};
