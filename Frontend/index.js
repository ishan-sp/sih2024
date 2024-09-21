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


var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(morgan('combined', { stream: accessLogStream }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/login", (req, res) => {
    console.log("new login request\n");
    console.log(req.body);
    const data = JSON.stringify(req.body);
    fs.writeFile("info.txt", data, (err) => {
        if(err) {
            console.log("Could'nt write to file ", err);
        }
    });
    res.redirect("/main");
});

app.post("/signup", (req, res) => {
    console.log("new signup request\n");
    req.body.points = 0;
    req.body.streak = 0;
    req.body.level = 0;
    const data = JSON.stringify(req.body);
    fs.writeFile("info.txt", data, (err) => {
        if(err) {
            console.log("Could'nt write to file ", err);
        }
    });
    res.redirect("/main");
});

app.get("/main", (req, res) => {
    console.log("Successfully redirected to main");
    fs.readFile("info.txt", "utf-8", (err, data) => {
        if (!err) {
            try {
                const dataj = JSON.parse(data);
                console.log(dataj);
                //res.render(__dirname + "/public/page2_1.html", dataj);
                res.sendFile(__dirname + "/public/page2_1.html");
            } catch (parseErr) {
                console.log("Error parsing JSON: ", parseErr);
            }
        } else {
            console.log("Error reading file: ", err);
        }
    });
});

app.listen(port, ()=> {
    console.log(`Server has started! Listening on port ${port}`);
});
