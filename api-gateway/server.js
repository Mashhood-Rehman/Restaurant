const express = require("express");
const cors = require('cors');
require("dotenv").config();
const proxy = require('express-http-proxy');
const { Gateways } = require("./config/Gateways");
const cookieParser = require("cookie-parser"); 
const protect = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
}));

// Set up the proxy for each gateway route
Gateways.forEach(({route, target, isProtected}) => {
  
  // 1. Centralized Auth: Apply middleware based on route configuration
  // Using isProtected to decide if auth is mandatory for this gateway
  const authMiddleware = isProtected ? protect({ required: true }) : protect({ required: false });

  app.use(route, authMiddleware, proxy(target, {
    changeOrigin: true,
    
    // 2. Identity Propagation: Inject user info into headers before forwarding
    proxyReqOptDecorator: (options, srcReq) => {
      // Forward standard Auth header if client sent it
      if (srcReq.headers.authorization) {
        options.headers['authorization'] = srcReq.headers.authorization;
      }
      
      // Inject decoded user data from Gateway Auth into headers for downstream services
      if (srcReq.user) {
        // We stringify the user object so services can easily JSON.parse it
        options.headers['x-user'] = JSON.stringify(srcReq.user);
        // Also provide common fields directly for easier access
        options.headers['x-user-id'] = srcReq.user.id || srcReq.user._id || '';
      }
      
      return options;
    },
    
    proxyReqPathResolver: (req) => req.originalUrl,
    
    proxyResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
      try {
        const setCookie = proxyRes.headers && proxyRes.headers['set-cookie'];
        if (setCookie) {
          console.log('🍪 Forwarding Set-Cookie via Gateway from', target);
          userRes.setHeader('set-cookie', setCookie);
        }
      } catch (e) {
        console.warn('Failed to forward set-cookie header through gateway', e?.message || e);
      }
      return proxyResData;
    },
    
    proxyErrorHandler: (err, res ,next) => {
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
