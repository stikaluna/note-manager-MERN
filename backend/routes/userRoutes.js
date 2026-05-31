const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getCurrentUser
} = require('../controllers/userController');

// import protect middleware
const { protect } = require('../middleware/authMiddleware');

//  routes
router.post('/', registerUser);
router.post('/login', loginUser);

//  PROTECTED ROUTE
router.get('/current', protect, getCurrentUser);

module.exports = router;