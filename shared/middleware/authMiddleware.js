const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const protect = (options = { required: true }) => {
  // 🔑 inject cookieParser manually
  const parseCookies = cookieParser();

  return (req, res, next) => {
    parseCookies(req, res, () => {
      console.log("🔒 Protect middleware hit");
      console.log("🍪 Cookies:", req.cookies);
      console.log("📝 Auth Header:", req.headers.authorization);

      try {
        let token;

        if (req.cookies?.token) {
          token = req.cookies.token;
        } else if (
          req.headers.authorization?.startsWith("Bearer ")
        ) {
          token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
          if (options.required) {
            return res.status(401).json({ message: "Not authorized, no token" });
          }
          req.user = null;
          return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (err) {
        if (options.required) {
          return res.status(401).json({ message: "Token invalid" });
        }
        req.user = null;
        next();
      }
    });
  };
};

module.exports = protect;
