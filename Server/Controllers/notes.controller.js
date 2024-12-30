import { NoteModel } from "../models/Note.model.js";


export const createNote = async (req, res) => {
    const { title, content, image } = req.body;

    if(!title || !content || !image) {
        return res.status(400).json({ message: "All fields are Required" });
    }

    const newNote = new NoteModel({
        userId:req.userId,
        title,
        content,
        image
    });
    try {
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getNotes = async (req, res) => {
    try {
        const notes = await NoteModel.find({ userId: req.userId });

        res.status(200).json(notes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateNote = async (req, res) => {
    const { noteId, title, content } = req.body;

    if (!noteId) {
        res.status(400).json({message:"NoteId is required"});
    }
    
    const updatedNote = { title, content, image};
    await Note.findByIdAndUpdate(noteId, updatedNote, { new: true });
    res.status(200).json(updatedNote);
}

export const deleteNote = async (req, res) => {
    const { noteId } = req.body;

    if (!noteId) {
        res.status(400).json({message:"Note Id required"});
    }
    const note = await NoteModel.findById(noteId);
    if(!note){
        res.status(400).json({message:"No note Found with this userId"});
    }

    await NoteModel.findByIdAndDelete(noteId);

    res.status(200).json({ message: "Note deleted successfully." });

}

export const searchNote = async (req, res) => {
    const { query } = req.query;
    if(!query){
        return res.status(400).json({message:"query is required to search for note with similar title"});
    }
    
    const notes = await NoteModel.find({ title: { $regex: query, $options: 'i' }, userId: req.userId });
    if(notes.length < 1){
        return res.status(400).json({message:"No such Notes found"});
    }
    res.json(notes);
}