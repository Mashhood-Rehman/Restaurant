module.exports = {
  Gateways: [
    { route: "/api/auth", target: "http://localhost:3000" },
    { route: "/api/google", target: "http://localhost:3000" },
    { route: "/api/restaurant", target: "http://localhost:5000" }
  ]
};