const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./connect/database');
const cors = require('cors');

const app = express();

//  lidh databazën
connectDB();

//  MIDDLEWARE
app.use(express.json()); // për JSON body
app.use(cors());         // për lidhje frontend-backend

//  ROUTES
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));

//  PORT
const PORT = process.env.PORT || 8000;

//  START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});