const jwt = require("jsonwebtoken");

const protect = (options = { required: true }) => {
  return (req, res, next) => {
    try {
      let token;

      // ✅ 1. Safely get token from cookies or Authorization header
      if (req.cookies?.token) {
        token = req.cookies.token;
      } else if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      // ✅ 2. Handle missing token
      if (!token) {
        if (options.required) {
          return res.status(401).json({ message: "Not authorized, no token" });
        } else {
          req.user = null;
          return next(); // Guest allowed
        }
      }

      // ✅ 3. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      // ✅ 4. Handle invalid token gracefully for guests
      if (options.required) {
        return res.status(401).json({ message: "Not authorized, token invalid" });
      } else {
        req.user = null;
        next();
      }
    }
  };
};

module.exports = protect;
