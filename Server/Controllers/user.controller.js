import { UserModel } from "../models/User.model.js";

export const UserSignup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).send("All fields Are Required ");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Please enter a valid email");
    }

    const checkUser = await UserModel.findOne({ email });

    if (checkUser) {
      console.log(`Email already exists`);
      return res
        .status(409)
        .send(
          "User with email Already exists Please login to continue or try using different email to signup."
        );
    }

    const hasehedPassword = await UserModel.hashPassword(password);

    const user = await UserModel.create({
      userName,
      email,
      password: hasehedPassword,
    });

    const authToken = await user.generateAuthToken();

    res.cookie("authToken", authToken);

    res.status(201).json({
      user: {
        email,
        id: user._id,
        userName,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("All fields Are Required ");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Please enter a valid email");
    }

    const checkUser = await UserModel.findOne({ email });

    if (!checkUser) {
      return res.status(400).send("Invalid Credentials");
    }
    const auth = await checkUser.matchPassword(password);

    if (auth) {
      const authToken = await checkUser.generateAuthToken();

      console.log(authToken);
      res.cookie("authToken", authToken);

      res.status(200).json({
        user: {
          email,
          _id: checkUser._id,
          userName: checkUser.userName,
        },
      });
    } else res.status(400).send("Invalid Credentials");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getUserInfo = async (req, res) => {
  const user = await UserModel.findById(req.userId);
  if (!user) {
    res.status(400).json({ message: "User not authenticated" });
  }
  res.status(200).json({
    user: {
      userName: user.userName,
      email: user.email,
      id: user._id,
    },
  });
};


export const logout = async(req,res)=>{

  try {
    console.log("control to logout handler");
    res.cookie("authToken",'',{ maxAge: 1 })
    res.status(200).json({message:"User Logged out Successfully"});
  } catch (error) {
    console.error(`Some Error occured Logging out ${error}`)
  }
}