console.log("Shared package loaded...");
module.exports = {
  protect: require("./middleware/authMiddleware"),
}