const finalScoreElement = document.getElementById("final-score");
const ctx = document.getElementById("donutChart").getContext("2d");

// Dummy score for demonstration. Replace with actual score variable.
const score = 25; // Example score
finalScoreElement.innerText = `Score: ${score}`;

const donutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Correct Answers', 'Incorrect Answers'],
        datasets: [{
            label: 'Score Distribution',
            data: [score, 100 - score], // Replace with actual score and incorrect score
            backgroundColor: [
                '#56a5eb', // Color for correct answers
                '#ff6384', // Color for incorrect answers
            ],
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Quiz Results'
            }
        }
    }
});
