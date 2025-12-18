const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env file in the same directory
dotenv.config({ path: path.join(__dirname, ".env") });

console.log("Shared package loaded...");
module.exports = {
  protect: require("./middleware/authMiddleware"),
}
