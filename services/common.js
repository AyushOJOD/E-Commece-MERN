const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtracter = function (req) {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }

  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGUxNjFhNGU4ZGI0ZDFmZGMzNmExYiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5OTcwMzQzNn0.THeytdMk1mGkPCc5ekYp5UhcV-RVAzC4wUQ099MxmFQ";
  return token;
};
