import express from 'express';
import UserModel from '../models/userModel';


const app = express();
const authRouter = express.Router();
authRouter.route("/signup").get(getSignUp).post(postSignUp);
function getSignUp(req, res) {
    res.send("Sign up page");
}

async function postSignUp(req, res) {
    try {
        const {email,name,role, password ,username} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email,name,role, password:hashedPassword ,username });
        await newUser.save();
        res.status(201).send("User created successfully");
    } catch (error) {
        res.status(500).send("Error creating user");
    }
}export default authRouter;