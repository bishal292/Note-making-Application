import { NoteModel } from "../models/Note.model.js";
import { renameSync } from "fs";
import mongoose from "mongoose";

export const createNote = async (req, res) => {
  const { title, content, image } = req.body;

  if (!title || !content || !image) {
    return res.status(400).json({ message: "All fields are Required" });
  }

  const newNote = new NoteModel({
    userId: req.userId,
    title,
    content,
    image,
  });
  try {
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};



export const getNotes = async (req, res) => {
  try {
    console.log(req.userId);
    const notes = await NoteModel.find({ userId: req.userId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



export const updateNote = async (req, res) => {
  const { noteId, title, content, image } = req.body;

  if (!noteId) {
    res.status(400).json({ message: "NoteId is required" });
  }

  const updatedNote = { title, content, image };
  await NoteModel.findByIdAndUpdate(noteId, updatedNote, { new: true });
  res.status(200).json(updatedNote);
};



export const deleteNote = async (req, res) => {

  const { noteId } = req.body;
  console.log(req);
  console.log(req.body);
  console.log(noteId)
  if (!noteId) {
    return res.status(400).json({ message: "Note Id required" });
  }
  const note = await NoteModel.findById(noteId);

  if (!note) {
    return res.status(400).json({ message: "No note Found with this userId" });
  }

  await NoteModel.findByIdAndDelete(noteId);

  res.status(200).json({ message: "Note deleted successfully." });
};



export const searchNoteByTitle = async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res
      .status(400)
      .json({
        message: "query is required to search for note with similar title",
      });
  }

  const notes = await NoteModel.find({
    title: { $regex: query, $options: "i" },
    userId: req.userId,
  });
  if (notes.length < 1) {
    return res.status(400).json({ message: "No such Notes found" });
  }
  res.json(notes);
};



export const searchNoteById = async (req, res) => {
  const { id } = req.query;
  if (!id || id === "" || id === "undefined") {
    return res
      .status(400)
      .json({
        message: "id is required to search for note with similar title",
      });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid note ID" });
  }
  
  const note = await NoteModel.findById(id);
  if (!note) {
    return res.status(400).json({ message: "No such Notes found" });
  }
  res.json(note);
};



export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("File is required.");
    }
    let fileName = `uploads/notes/${Date.now()}${req.file.originalname}`;
    await renameSync(req.file.path, fileName);

    res.status(200).json({
      image: fileName,
    });
  } catch (err) {
    console.log("Internal Server Error " + err);
  }
};
