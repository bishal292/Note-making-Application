import express from 'express';
import { createNote, updateNote, deleteNote , getNotes , searchNoteByTitle ,searchNoteById , uploadImage} from '../Controllers/notes.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import multer from 'multer';


const upload = multer({ dest: 'uploads/notes/' });


const NoteRouter = express.Router();

NoteRouter.post("/create-note", authMiddleware,createNote);

NoteRouter.patch("/update-note", authMiddleware,updateNote);

NoteRouter.post("/delete-note", authMiddleware,deleteNote);

NoteRouter.get("/get-notes", authMiddleware,getNotes);

NoteRouter.get("/get-note", authMiddleware,searchNoteByTitle);

NoteRouter.get("/get-note-by-id",authMiddleware,searchNoteById);

NoteRouter.post("/upload-image",authMiddleware , upload.single("note-image") ,uploadImage);





export default NoteRouter;