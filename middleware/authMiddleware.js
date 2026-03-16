const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // get token from header
    const header = req.headers.authorization;
    // check if token exist in header
    if (!header) {
        return res.status(401).json({ message: "No token" });
    }
    // cut token from authorization header
    const token = header.split(" ")[1];

    try {
        // verify token and get user data from token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        // call next middleware
        next();

    } catch (error) {

        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;