const questionElement = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progress-bar-full");
const timerElement = document.getElementById("timer");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timer;
const MAX_TIME = 10;

let questions = [
    { question: "What percentage of Earth’s surface is covered by oceans?", choice1: "50%", choice2: "60%", choice3: "70%", choice4: "80%", answer: 3 },
    { question: "What is the largest ocean on Earth?", choice1: "Atlantic Ocean", choice2: "Indian Ocean", choice3: "Southern Ocean", choice4: "Pacific Ocean", answer: 4 },
    { question: "Which ocean is known to be the warmest?", choice1: "Pacific Ocean", choice2: "Indian Ocean", choice3: "Atlantic Ocean", choice4: "Southern Ocean", answer: 2 },
    { question: "How many oceans are there on Earth?", choice1: "4", choice2: "5", choice3: "6", choice4: "7", answer: 2 },
    { question: "What is the average depth of the ocean?", choice1: "2,000 meters", choice2: "4,000 meters", choice3: "6,000 meters", choice4: "8,000 meters", answer: 2 },
    { question: "Which ocean zone receives the most sunlight?", choice1: "Twilight Zone", choice2: "Midnight Zone", choice3: "Sunlight Zone", choice4: "Abyssal Zone", answer: 3 },
    { question: "What is the deepest known point in the ocean?", choice1: "Mariana Trench", choice2: "Java Trench", choice3: "Puerto Rico Trench", choice4: "Tonga Trench", answer: 1 },
    { question: "What is the main chemical compound found in seawater?", choice1: "Salt (NaCl)", choice2: "Water (H2O)", choice3: "Calcium Carbonate (CaCO3)", choice4: "Carbon Dioxide (CO2)", answer: 2 },
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10; // Display 10 questions randomly

// Start the game and shuffle questions
function startGame() {
    questionCounter = 0;
    score = 0;

    // Shuffle the questions and pick the first 10
    availableQuestions = questions.sort(() => Math.random() - 0.5).slice(0, MAX_QUESTIONS);
    getNewQuestion();
}

// Function to fetch a new question
function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('/end.html');
    }

    clearInterval(timer);
    resetTimer();

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questionElement.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
        choice.parentElement.classList.remove('correct', 'incorrect');
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;

    startTimer();
}

// Event listener for answer selection
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        clearInterval(timer);

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const isCorrect = selectedAnswer == currentQuestion.answer;
        const classToApply = isCorrect ? "correct" : "incorrect";

        if (isCorrect) incrementScore(CORRECT_BONUS);

        selectedChoice.parentElement.classList.add(classToApply);

        // Show the correct answer even if wrong
        choices.forEach(choice => {
            if (choice.dataset['number'] == currentQuestion.answer) {
                choice.parentElement.classList.add('correct');
            }
        });

        setTimeout(() => {
            getNewQuestion();
        }, 1000);
    });
});

// Timer functionality
function startTimer() {
    let time = MAX_TIME;
    timerElement.innerText = time;

    timer = setInterval(() => {
        time--;
        timerElement.innerText = time;

        if (time <= 0) {
            clearInterval(timer);
            acceptingAnswers = false;

            // Mark the correct answer
            choices.forEach(choice => {
                if (choice.dataset['number'] == currentQuestion.answer) {
                    choice.parentElement.classList.add('correct');
                }
            });

            setTimeout(() => {
                getNewQuestion();
            }, 1000);
        }
    }, 1000);
}

// Reset timer function
function resetTimer() {
    timerElement.innerText = MAX_TIME;
}

// Increment score function
function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
}

// Initialize game
startGame();
