const jwt = require("jsonwebtoken");
let User = require("../../models/user");

module.exports = function(req, res, next) {
    const token = req.header("token");
    if (!token) return res.status(401).json({ message: "Token not found" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        User.findById(decoded.user.id).then(user => {
            if (user.role !== 'admin') {
                res.status(401).send({ message: "Unauthorized user" });
            } else {
                next();
            }
        });
    } catch (e) {
        console.error(e);
        res.status(401).send({ message: "Invalid Token" });
    }
};
