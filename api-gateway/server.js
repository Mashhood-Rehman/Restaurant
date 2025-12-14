const express = require("express");
const cors = require('cors');
require("dotenv").config();
const proxy = require('express-http-proxy');
const { Gateways } = require("./config/Gateways");
const cookieParser = require("cookie-parser"); 
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

Gateways.forEach(({route, target}) =>{
  app.use(route, proxy(target, {
    changeOrigin: true,
    proxyReqOptDecorator: (options, req) => {
      // Forward cookies from client to upstream service
      if(req.headers.cookie) {
        options.headers['cookie'] = req.headers.cookie;
      }
      return options;
    },
    proxyReqPathResolver: (req) => req.originalUrl,
    proxyResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
      // Forward Set-Cookie headers from target services to the browser
      try {
        const setCookie = proxyRes.headers && proxyRes.headers['set-cookie'];
        if (setCookie) {
          console.log('🍪 Forwarding Set-Cookie from', target, ':', setCookie);
          userRes.setHeader('set-cookie', setCookie);
        }
      } catch (e) {
        console.warn('Failed to forward set-cookie header through gateway', e?.message || e);
      }
      return proxyResData;
    },
    proxyErrorHandler: (err, res ,next) => {
      console.log(`❌ Proxy Error in route ${route}:`, err.message || err || err?.data?.message);
      res.status(504).json({
        success: false,
        error: "GatewayTimeout error",
        details: err.message
      })
    }
    
  }))
})

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
});
