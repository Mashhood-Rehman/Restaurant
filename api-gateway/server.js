const express = require("express");
const cors = require('cors');
require("dotenv").config();
const proxy = require('express-http-proxy');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', proxy('http://localhost:3000', {
  proxyReqPathResolver: (req) => {
    console.log(`🔄 Proxying ${req.method} ${req.path} to auth service`);
    return req.originalUrl;
  },
  proxyErrorHandler: (err, res, next) => {
    console.error('❌ Proxy Error:', err.message);
    res.status(504).json({ 
      success: false, 
      error: 'Gateway timeout',
      details: err.message
    });
  }
}));

app.use("/api/google", proxy('http://localhost:3000'));
app.use("/api/restaurant", proxy('http://localhost:5000'));

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
});
