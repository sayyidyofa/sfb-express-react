const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Token not found" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // this will only contain the user's ID
    next();
  } catch (e) {
    console.error(e);
    res.status(401).send({ message: "Invalid Token" });
  }
};
