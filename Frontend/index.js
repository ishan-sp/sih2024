import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import morgan from "morgan";
import fs from "fs";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3004;

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(morgan('combined', { stream: accessLogStream }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/login", (req, res) => {
    console.log("new login request\n");
    console.log(req.body);
});
app.post("/signup", (req, res) => {
    console.log("new signup request\n");
    console.log(req.body);
});

app.listen(port, ()=> {
    console.log(`Server has started! Listening on port ${port}`);
})