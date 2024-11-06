const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quizApp', { useNewUrlParser: true, useUnifiedTopology: true });

// Define User and Score schemas
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
});

const scoreSchema = new mongoose.Schema({
    username: String,
    score: Number,
    date: { type: Date, default: Date.now }
});

// Create models
const User = mongoose.model('User ', userSchema);
const Score = mongoose.model('Score', scoreSchema);

// Middleware
app.use(express.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Register endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.send('User  registered successfully');
    } catch (error) {
        console.error('Error during registration:', error);
        if (error.code === 11000) { // Duplicate username
            res.status(409).send('Username already exists');
        } else {
            res.status(500).send('Error during registration: ' + error.message);
        }
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = user;
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error during login');
    }
});

// Save score endpoint
app.post('/saveScore', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }
    try {
        const newScore = new Score({ username: req.session.user.username, score: req.body.score });
        await newScore.save();
        res.send('Score saved successfully');
    } catch (error) {
        console.error('Error during score save:', error);
        res.status(500).send('Error during score save');
    }
});

// Get high scores endpoint
app.get('/highScores', async (req, res) => {
    try {
        const highScores = await Score.find().sort({ score: -1 }).limit(10);
        res.json(highScores);
    } catch (error) {
        console.error('Error fetching high scores:', error);
        res.status(500).send('Error fetching high scores');
    }
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));