const express = require('express');
require('dotenv').config();

const connectDB = require('./connect/database');
const { errorHandler } = require('./middleware/errorMiddleware');

//  connect database
connectDB();

const app = express();
const port = process.env.PORT || 8000;

//  middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// test route (optional)
app.get('/', (req, res) => {
  res.send('Server works ');
});

//  NOTES ROUTES
app.use('/api/notes', require('./routes/noteRoutes'));


app.use('/api/users', require('./routes/userRoutes'));
//  error middleware
app.use(errorHandler);

//  start server
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});