import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import UserRouter from './Routes/user.routes.js';
import NoteRouter from './Routes/note.route.js';

dotenv.config();

const app = express();

app.use("*",(req,res,next)=>{
    console.log(`API Endpoint: ${req.originalUrl}, Method: ${req.method}`);
    console.log("Query: ", req.query);
    next();
})

app.get("/",(req,res)=>{
    res.send("HEllo World");
})



app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use("/user",UserRouter);
app.use("/notes",NoteRouter);



export default app;