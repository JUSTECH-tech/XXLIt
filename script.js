const colorBox = document.getElementById("colorBox");
const colorOptionsContainer = document.getElementById("colorOptions");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

let score = 0;

// Generate a random color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Generate six random colors and pick one as the correct answer
function generateColors() {
    const colors = [];
    for (let i = 0; i < 6; i++) {
        colors.push(getRandomColor());
    }
    return colors;
}

// Start a new round
function startGame() {
    colorOptionsContainer.innerHTML = "";
    gameStatus.textContent = "";
    gameStatus.className = "";

    const colors = generateColors();
    const correctColor = colors[Math.floor(Math.random() * colors.length)];

    colorBox.style.backgroundColor = correctColor;

    colors.forEach(color => {
        const button = document.createElement("button");
        button.style.backgroundColor = color;
        button.setAttribute("data-testid", "colorOption");

        button.addEventListener("click", () => checkAnswer(color, correctColor));
        colorOptionsContainer.appendChild(button);
    });
}

// Check if the selected color is correct
function checkAnswer(selectedColor, correctColor) {
    if (selectedColor === correctColor) {
        gameStatus.textContent = "Correct!";
        gameStatus.className = "correct";
        score++;
        scoreDisplay.textContent = score;

        // Automatically restart the game with a new color
        setTimeout(startGame, 1000); // Wait 1 second before restarting
    } else {
        gameStatus.textContent = "Wrong! Try Again.";
        gameStatus.className = "wrong";
    }
}

// Reset the game
newGameButton.addEventListener("click", startGame);

// Start the game for the first time
startGame();
