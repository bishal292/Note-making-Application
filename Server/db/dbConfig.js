import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const DB_URL = process.env.DB_URL;

export const ConnectDB = () =>{
    mongoose.connect(DB_URL).then(()=>{
        console.log("Connected to DataBase Successfully");
    }).catch((err)=>{
        console.error("Error Connecting DataBase: ",err);
    })
}