const asyncHandler = require('express-async-handler');
const Note = require('../models/noteModel');
const User = require('../models/userModel');

//  GET NOTES (vetem te user-it)
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.status(200).json(notes);
});

//  CREATE NOTE (ruan user id)
const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error('Please add title and content');
  }

  const note = await Note.create({
    title,
    content,
    user: req.user.id, 
  });

  res.status(201).json(note);
});

//  UPDATE NOTE (kontrollon owner)
const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error('Note not found');
  }

  //  gjej user
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //  kontrollo nëse është pronar i notes
  if (note.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedNote);
});

//  DELETE NOTE (kontrollon owner)
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error('Note not found');
  }

  //  gjej user
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //  kontrollo owner
  if (note.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await note.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};