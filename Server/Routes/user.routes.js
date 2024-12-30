import express from 'express';
import { UserLogin, UserSignup } from '../Controllers/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { UserModel } from '../models/User.model.js';


const UserRouter = express.Router();

UserRouter.post("/register",UserSignup);

UserRouter.post("/login",UserLogin);

UserRouter.get("/user-info",authMiddleware,async(req,res)=>{
    const user = await UserModel.findById(req.userId);
    if(!user){
        res.status(400).json({message:"User not authenticated"});
    }
    res.status(200).json({user});
});


export default UserRouter;