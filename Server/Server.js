import app from "./app.js";
import dotenv from 'dotenv'
import { ConnectDB } from "./db/dbConfig.js";
dotenv.config();


const PORT = process.env.PORT
ConnectDB();


app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})