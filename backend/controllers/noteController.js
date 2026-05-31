const asyncHandler = require('express-async-handler');
const Note = require('../models/noteModel');

//  GET all notes
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find();

  res.status(200).json(notes);
});

//  POST create note
const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title) {
    res.status(400);
    throw new Error('Please add a title');
  }

  const note = await Note.create({
    title,
    content,
  });

  res.status(201).json(note);
});

// PUT update note 
const updateNote = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update note ${req.params.id}` });
});

//  DELETE note 
const deleteNote = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete note ${req.params.id}` });
});

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote
};