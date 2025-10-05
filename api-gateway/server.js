const express = require("express");
const cors = require('cors');
require("dotenv").config();
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
  app.use(express.json())
app.use('/api/auth',
  createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
    timeout: 30000,
    proxyTimeout: 30000,

  })
);
// Other proxies
app.use("/api/google",
  express.json({ limit: '10mb' }),
  createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      if (req.body && Object.keys(req.body).length > 0) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.removeHeader('content-length');
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
        proxyReq.end();
      }
    }
  })
);

app.use("/api/restaurant",
  express.json({ limit: '10mb' }),
  createProxyMiddleware({
    target: "http://localhost:5000",
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      if (req.body && Object.keys(req.body).length > 0) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.removeHeader('content-length');
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
        proxyReq.end();
      }
    }
  })
);

// Error handling
app.use((err, req, res, next) => {
  if (err.type === 'request.aborted') {
    console.log('⚠️ Client aborted request');
    return;
  }
  console.error('❌ Gateway Error:', err);
  if (!res.headersSent) {
    res.status(err.status || 500).json({
      success: false,
      error: err.message || 'Internal server error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
  console.log(`Auth service: http://localhost:3000`);
  console.log(`Restaurant service: http://localhost:5000`);
});