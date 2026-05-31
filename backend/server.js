// Importing necessary modules
const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./connect/database');

// Connecting to the database
connectDB();

// Setting the port for the server
const port = process.env.PORT || 5000;

// Initializing Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes (NOTE MANAGER)
app.use('/api/notes', require('./routes/noteRoutes'));

// Error middleware
app.use(errorHandler);

// Start server
app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);
