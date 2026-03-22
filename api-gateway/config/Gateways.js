module.exports = {
  Gateways: [
    { route: "/api/messages", target: "http://localhost:3003", isProtected: true },
    { route: "/api/auth", target: "http://localhost:3000", isProtected: false },
    { route: "/api/users", target: "http://localhost:3000", isProtected: true },
    { route: "/api/google", target: "http://localhost:3000", isProtected: false },
    { route: "/api/products", target: "http://localhost:5000", isProtected: false },
    { route: "/api/orders", target: "http://localhost:3001", isProtected: true }
  ]
};