const { User } = require("../models/User");

exports.createUser = async (req, res) => {
  const user = new User(req.body);

  try {
    const docs = await user.save();
    res.status(200).json({ user: docs });
  } catch (err) {
    res.status(400).json(err);
  }
};
