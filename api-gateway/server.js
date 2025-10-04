const express = require("express");
const cors = require('cors');
require("dotenv").config();
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
// Enhanced CORS configuration
app.use(cors());
const PORT = process.env.PORT || 8000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',
  createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
    timeout: 30000,
    proxyTimeout: 30000,
    onError: (err, req, res) => {
      console.error('❌ Auth service proxy error:', err.message);
      res.status(500).json({
        success: false,
        message: 'Auth service unavailable',
        error: err.message
      });
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(`🔄 Proxying: ${req.method} ${req.url} -> http://localhost:3000${req.url}`);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`✅ Response: ${proxyRes.statusCode} for ${req.method} ${req.url}`);
    }
  })
);

// Google auth proxy
app.use(
  "/api/google",
  createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
  })
);

app.use(
  "/api/restaurant",
  createProxyMiddleware({
    target: "http://localhost:5000",
    changeOrigin: true,
  })
);


// Error handling middleware
app.use((err, req, res, next) => {
  if (err.type === 'request.aborted') {
    console.log('⚠️  Client aborted request:', req.method, req.path);
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
  console.log(`Auth service should be running on port 3000`);
  console.log(`Restaurant service should be running on port 5000`);
});