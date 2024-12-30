import express from 'express';
import { UserLogin, UserSignup, getUserInfo, logout} from '../Controllers/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';


const UserRouter = express.Router();

UserRouter.post("/register",UserSignup);

UserRouter.post("/login",UserLogin);

UserRouter.get("/user-info",authMiddleware,getUserInfo);

UserRouter.get("/logout",authMiddleware,logout);


export default UserRouter;