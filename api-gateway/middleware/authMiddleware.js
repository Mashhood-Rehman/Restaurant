const jwt = require("jsonwebtoken");

const protect = (options = { required: true }) => {
  return (req, res, next) => {
    try {
      let token;

      // Extract token from cookies
      if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
      }

      // Extract token from Authorization header
      if (!token && req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        if (options.required) {
          console.log("❌ No token provided to Gateway");
          return res.status(401).json({ message: "Not authorized: No token found" });
        }
        req.user = null;
        return next();
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Attach decoded user info to request
      req.user = decoded;
      next();
    } catch (err) {
      console.error("❌ Gateway: Token verification failed:", err.message);
      if (options.required) {
        return res.status(401).json({ message: "Not authorized: Invalid or expired token" });
      }
      req.user = null;
      next();
    }
  };
};

module.exports = protect;
