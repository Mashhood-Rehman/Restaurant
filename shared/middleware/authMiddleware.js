  const jwt = require("jsonwebtoken");

  const protect = (options = { required: true }) => {
    return (req, res, next) => {
      console.log("🔒 Protect middleware hit");
      console.log("📝 Auth Header:", req.headers.authorization);

      try {
        let token;

        // Check for token in cookies first
      
        // Then check Authorization header
        if (req.headers.authorization?.startsWith("Bearer ")) {
          token = req.headers.authorization.split(" ")[1];
          console.log("✅ Token found in Authorization header");
        }

        if (!token) {
          if (options.required) {
            console.log("❌ No token provided");
            return res.status(401).json({ message: "Not authorized, no token" });
          }
          req.user = null;
          return next();
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("✅ Token verified for user:", decoded.id);
        next();
      } catch (err) {
        console.error("❌ Token verification error:", err.message);
        if (options.required) {
          return res.status(401).json({ message: "Token invalid or expired" });
        }
        req.user = null;
        next();
      }
    };
  };

  module.exports = protect;
