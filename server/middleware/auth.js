const jwt = require("jsonwebtoken");

const auth = (role) => (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied");

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (role && user.role !== role) return res.status(403).send("Forbidden");
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

module.exports = auth;
