const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Make.com Blueprint Executor Backend is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

module.exports = router;
