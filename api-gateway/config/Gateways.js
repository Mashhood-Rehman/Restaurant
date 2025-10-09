module.exports = {
  Gateways: [
    { route: "/api/auth", target: "http://127.0.0.1:3000" },
    { route: "/api/users", target: "http://localhost:3000" },
    { route: "/api/google", target: "http://localhost:3000" },
    { route: "/api/restaurant", target: "http://localhost:5000" }
  ]
};  