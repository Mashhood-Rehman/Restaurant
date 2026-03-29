const jwt = require("jsonwebtoken");

const protect = (options = { required: true }) => {
  return (req, res, next) => {

    try {
      // 1. Gateway Trust: Check if the API Gateway has already validated the user
      const gatewayUser = req.headers['x-user'];
      if (gatewayUser) {
        try {
          req.user = JSON.parse(gatewayUser);
          console.log(`✅ [Service] Identity recovered from Gateway for: ${req.user.email}`);
          return next();
        } catch (e) {
          console.warn("⚠️ [Service] Failed to parse Gateway x-user header:", e.message);
        }
      }

      let token;

      if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
      }

      if (!token && req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        if (options.required) {
          console.log("❌ No token provided");
          return res.status(401).json({ message: "Not authorized, no token" });
        }
        req.user = null;
        return next();
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
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
