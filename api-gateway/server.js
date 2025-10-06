const express = require("express");
const cors = require('cors');
require("dotenv").config();
const proxy = require('express-http-proxy');
const { Gateways } = require("./config/Gateways");

const app = express();
const PORT = 8000;

app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true,                
}));app.use(express.json());

Gateways.forEach(({route, target}) =>{
  app.use(route, proxy(target, {
    changeOrigin: true,
    proxyReqPathResolver : (req) => req.originalUrl,
    proxyErrorHandler: (err, res ,next) => {
      console.log(`❌ Proxy Error in route ${route}:`, err.message);
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
