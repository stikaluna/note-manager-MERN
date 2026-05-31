const express = require('express');
const router = express.Router();

const {
  getNotes,
  createNote,
  updateNote,
  deleteNote
} = require('../controllers/noteController');

//  IMPORT AUTH
const { protect } = require('../middleware/authMiddleware');

//  ROUTES (TANI TË MBROJTURA)
router.route('/')
  .get(protect, getNotes)
  .post(protect, createNote);

router.route('/:id')
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;