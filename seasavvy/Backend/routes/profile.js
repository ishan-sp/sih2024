import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import user from "../models/user.js";
import {validationResult, body} from "express-validator";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
mongoose.connect("mongodb://localhost/seasavvy")
    .then(()=> console.log("Connected to database"))
    .catch((err)=> console.log(`Error : ${err}`));

router.get("/", async (req, res)=> {
    const sessionUserId = req.session.userId;
    if(!sessionUserId) {
        res.status(401).send("Please login in to continue");
    }
    try {
        const userFound = await user.findById(sessionUserId);
        if(userFound) {
            res.render(path.resolve(__dirname, "../../Frontend/public/profile.ejs"), {userFound});
        }
        else {
            res.status(401).send("Please login again");
        }
    }
    catch(err) {
        res.status(500).send("Server error. Try again later");
    }
})

router.patch("/", async (req, res)=> {
    const sessionUserId = req.session.userId;
    if(!sessionUserId) {
        res.status(401).send("Please login in to continue");
    }
    try {
        const item = req.body;
        console.log(item);
        const userUpdated = await user.findByIdAndUpdate(sessionUserId, item, {new : true});
        if(!userUpdated) {
            res.status(500).send("Server error. Try again later");
        }
        else {
            console.log("Updated user : ", userUpdated);
        }
    }
    catch(err) {
        res.status(500).send("Server error. Try again later");
    }
})

export default router;