const express = require('express');
const router = express.Router();

// Sample API route
router.get('/hello', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

module.exports = router;