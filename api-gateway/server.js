const express = require("express");
const cors = require('cors');
require("dotenv").config();
const proxy = require('express-http-proxy');
const { Gateways } = require("./config/Gateways");
const cookieParser = require("cookie-parser");
const protect = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 8000;

// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
}));

Gateways.forEach(({ route, target, isProtected }) => {

  const authMiddleware = isProtected ? protect({ required: true }) : protect({ required: false });

  app.use(route, authMiddleware, proxy(target, {
    changeOrigin: true,

    proxyReqOptDecorator: (options, srcReq) => {
      if (srcReq.headers.authorization) {
        options.headers['authorization'] = srcReq.headers.authorization;
      }

      if (srcReq.user) {
        console.log(`👤 [Gateway] Injecting Identity Header for ${srcReq.user.email}`);
        options.headers['x-user'] = JSON.stringify(srcReq.user);
        options.headers['x-user-id'] = srcReq.user.id || srcReq.user._id || '';
      }

      return options;
    },

    proxyReqPathResolver: (req) => req.originalUrl,

    proxyResHeaderDecorator: (headers, userReq, userRes, proxyReq, proxyRes) => {
      // Forward Set-Cookie from microservice to browser
      if (proxyRes.headers['set-cookie']) {
        console.log(`🍪 [Gateway] Forwarding Set-Cookie from ${target}`);
        headers['set-cookie'] = proxyRes.headers['set-cookie'];
      }
      return headers;
    },

    proxyErrorHandler: (err, res, next) => {
      console.log(`❌ Proxy Error in route ${route}:`, err.message || err);
      res.status(504).json({
        success: false,
        error: "GatewayTimeout error",
        details: err.message
      })
    }
  }));
});

app.listen(PORT, () => {
  console.log(`🚀 API Gateway (Identity Aware) running on port ${PORT}`);
});
