import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

const NoteSchema = new mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    title:{
        type: String,
        reuired: true,
    },
    content:{
        type: String,
        required:true,
    },
    image:{
        type:String,
        required: true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});


export const NoteModel = mongoose.model("notes",NoteSchema);