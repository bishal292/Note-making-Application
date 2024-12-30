import express from 'express';
import { createNote, updateNote, deleteNote , getNotes , searchNote } from '../Controllers/notes.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const NoteRouter = express.Router();

NoteRouter.post("/create-note", authMiddleware,createNote);

NoteRouter.patch("/update-note", authMiddleware,updateNote);

NoteRouter.delete("/delete-note", authMiddleware,deleteNote);

NoteRouter.get("/get-notes", authMiddleware,getNotes);

NoteRouter.get("/get-note", authMiddleware,searchNote);





export default NoteRouter;