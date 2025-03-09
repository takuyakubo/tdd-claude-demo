const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the TDD API' });
});

// API Routes
app.use('/api', apiRoutes);

// Server
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;