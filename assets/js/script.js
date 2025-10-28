/* jshint esversion: 11*/
/* global bootstrap, confetti, wordBankEasy, wordBankMedium, wordBankHard, module*/

let userTry = 6;
let currentScore = 0;
let userScore = 0;
let wordBank = Object.keys(wordBankMedium);
// Bootstrap modal
const endGameEl = document.getElementById('end-game');
const modalEndGame = new bootstrap.Modal(endGameEl);
// defuse focus before hiding kicks in to fix the console warning for the modal
endGameEl.addEventListener("hide.bs.modal", () => {
    if (endGameEl.contains(document.activeElement)) {
        document.activeElement.blur(); // move focus out of the soon-to-be-hidden modal
    }
});
let modalTitle = document.getElementById("modal-title");
let modalText = document.getElementById("modal-text");

// Game rule modal
const gameRuleEl = document.getElementById("game-rules");
const gameRules = new bootstrap.Modal(gameRuleEl);
// defuse focus before hiding kicks in to fix the console warning for the modal
gameRuleEl.addEventListener("hide.bs.modal", () => {
    if (gameRuleEl.contains(document.activeElement)) {
        document.activeElement.blur(); // move focus out of the soon-to-be-hidden modal
    }
});
let gameRuleText = document.getElementById("game-rule-text");

// Hint modal
const hintModalEl = document.getElementById("hint-modal");
const hints = new bootstrap.Modal(hintModalEl);
// defuse focus before hiding kicks in to fix the console warning for the modal
hintModalEl.addEventListener("hide.bs.modal", () => {
    if (hintModalEl.contains(document.activeElement)) {
        document.activeElement.blur();
    }
});
let hintModalText = document.getElementById("hint-modal-body");

let allButtons = [];
let randomWordArray = [];
let placeholderArray = [];
let gameOver = false;
let gameOn = true;
let wordBankIndex = 0;
let difficulty = "medium";
let newDiv = document.createElement("div");

document.addEventListener("DOMContentLoaded", function () {

    // Collapse navbar after nav-link or dropdown-item click (mobile only),ChatGPT output.
    document.querySelectorAll(".navbar-collapse .nav-link:not(.dropdown-toggle), .navbar-collapse .dropdown-item").forEach(link => {
        link.addEventListener("click", function () {
            const navbarCollapse = document.querySelector(".navbar-collapse");
            const isExpanded = navbarCollapse.classList.contains("show");

            if (isExpanded) {
                new bootstrap.Collapse(navbarCollapse).hide();
            }
        });
    });

    // set localStorage "highscore" to 0 if none exists on game-load. 
    if (!localStorage.getItem("highscore")) {
        localStorage.setItem("highscore", "0");
    }
    let currentHighscore = localStorage.getItem("highscore");
    document.getElementById("highscore").innerText = currentHighscore;

    // Create on-screen keyboard layout using QWERTY rows
    const qwertyLayout = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];
    // Each character is turned into a styled button and added to the appropriate row container
    for (let char of qwertyLayout[0]) {
        let button = document.createElement("button");
        button.classList.add("btn", "btn-light", "btn-lg");
        button.innerText = char;
        button.setAttribute("type", "button");
        document.getElementById("buttons-1").appendChild(button);
    }
    for (let char of qwertyLayout[1]) {
        let button = document.createElement("button");
        button.classList.add("btn", "btn-light", "btn-lg");
        button.innerText = char;
        button.setAttribute("type", "button");
        document.getElementById("buttons-2").appendChild(button);
    }
    for (let char of qwertyLayout[2]) {
        let button = document.createElement("button");
        button.classList.add("btn", "btn-light", "btn-lg");
        button.innerText = char;
        button.setAttribute("type", "button");
        document.getElementById("buttons-3").appendChild(button);
    }
    allButtons = document.querySelectorAll("#button-container button");

    // Attach listeners ONCE to all buttons
    for (let btn of allButtons) {
        btn.addEventListener("click", handleGuess);
    }

    // Start the first game
    gameStart();
});
/**
 * Start of the game. Get random number of array length to use as index for the randomWordArray.
 * Creates array and fills with underscores equal to the random word chosen.
 * Displays underscores.
 */
function gameStart() {
    resetButtons();
    userTry = 6;
    document.getElementById("tries").innerText = userTry;
    hideImages();
    document.getElementById("img6").classList.remove("hidden");

    wordBankIndex = Math.floor(Math.random() * wordBank.length);
    randomWordArray = wordBank[wordBankIndex].toUpperCase().split("");
    placeholderArray = new Array(randomWordArray.length).fill("_ ");
    document.getElementById("placeholder").innerText = placeholderArray.join("");
}

/**
 * Handle keyboard typing.
 * Listens for A-Z typing, and triggers a simulated click on the visual keyboard.
 */
// with help from my mentor
document.addEventListener("keydown", (e) => {
    const key = e.key.toUpperCase();
    // Check if the key is a valid alpha character A-Z (RegEx test)
    if (/^[A-Z]$/.test(key)) {
        // Find the matching button (if one exists)
        const btn = [...allButtons].find(b => b.innerText === key);
        // If the button exists, simulate a click event object
        if (btn) handleGuess({
            target: btn
        });
    }
});

/**
 * Handles the click event for letter buttons during the game.
 * Retrieves the letter the button represents.
 * Disables the button after it is clicked.
 * Checks if the letter was in the random word and calls either wrongGuess or gameWon.
 * @param {Event} e 
 */
function handleGuess(e) {
    let btn = e.target;
    let buttonLetter = btn.innerText;
    if (btn.classList.contains("disabled")) return;

    if (!randomWordArray.includes(buttonLetter)) {
        btn.style.background = "grey";
        btn.classList.add("disabled");
        wrongGuess(randomWordArray);
    } else {
        for (let i = 0; i < randomWordArray.length; i++) {
            if (randomWordArray[i] === buttonLetter) {
                placeholderArray[i] = buttonLetter;
                btn.style.background = "grey";
                document.getElementById("placeholder").innerText = placeholderArray.join("");
            }
        }
        btn.classList.add("disabled");
        gameWon(placeholderArray, randomWordArray);
    }
}

/**
 * Checks indexof the current image, hides it and make the next visible 
 */
function wrongGuess(randomWordArray) {
    triesLeft(); // decrement number of tries remaining
    hideImages(); // hide all hangman images
    let currentImage = document.getElementById(`img${userTry}`); // unhide the hangman image of the matching tries remaining
    currentImage.classList.remove("hidden");

    if (userTry === 0) {
        // user ran out of tries; game over
        gameLost(randomWordArray);
    } else if (userTry === 1) {
        showHint();
    }

    /**
     * Called when game is lost. Sets game over to true and reveals the random word. 
     * Disables all buttons and shows modal for feedback and how to restart the game.
     * Current score is set back to 0.
     */
    function gameLost() {
        gameOver = true;
        newDiv.classList.add("hidden");
        document.getElementById("placeholder").innerText = randomWordArray.join("");

        disableButtons();
        // update modal text and then show modal
        modalTitle.innerHTML = "<h2>Game Over</h2>";
        modalText.innerHTML = `
        The correct word was <strong>${randomWordArray.join("")}</strong>.
        <br>
        Better luck next time!
        <br>
        To restart the game press START GAME`;
        modalEndGame.show();
        currentScore = 0;
        document.getElementById("current-score").innerText = currentScore;
    }
}

/**
 * Checks if the placeholder array is fully guessed and reavelead and therefore equal to the randomWordArray.
 * Calls addCurrentScore (adds to current score).
 * Calls addHighScore (adds to highscore if current score is higher than highscore)
 * Shows Modal as feedback.
 * calls resetGame (resets all features, but current score)
 * @param {string[]} placeholderArray // Array filled with underscores and correctly guessed letters in the length of the randomWordArray
 * @param {string[]} randomWordArray  // random word split into an array of single letters.
 */
function gameWon(placeholderArray, randomWordArray) {
    if (placeholderArray.join("") === randomWordArray.join("")) {
        addCurrentScore();
        let highscore = parseInt(localStorage.getItem("highscore"));

        if (currentScore > highscore) {
            modalTitle.innerHTML = "Congrats! New Highscore!";
            modalText.innerHTML = `
                    You guessed <strong>${randomWordArray.join("")}</strong>.
                    <br>
                    Tries remaining: <strong>${userTry}</strong>.
                    <br>
                    Times won: <strong>${currentScore}</strong>.
                    <br>
                    Old Highscore: <strong>${highscore}</strong>
                `;
            addHighScore();
        } else {
            modalTitle.innerHTML = "<h2>Congrats!</h2>";
            modalText.innerHTML = `
                    You guessed <strong>${randomWordArray.join("")}</strong>.
                    <br>
                    Tries remaining: <strong>${userTry}</strong>.
                    <br>
                    Times won: <strong>${currentScore}</strong>.
                    <br>
                    Highscore: <strong>${highscore}</strong>
                `;
        }
        modalEndGame.show();
        gameOn = false;
        if (!gameOn) {
            disableButtons()
        }
        let modal = document.getElementById("end-game");
        modal.addEventListener("click", () => {
            resetGame();
            modalEndGame.hide();
        });
    }
}

/**
 * Decrements and displays userTry. Updates global variable.
 */
function triesLeft() {
    document.getElementById("tries").innerText = userTry - 1;
    userTry--;
}

/**
 * Increments and displays current score. Updates global variable.
 */
function addCurrentScore() {
    document.getElementById("current-score").innerText = currentScore + 1;
    currentScore++;
}

/**
 * Retrieves highscore and sets it to current score if currentscore is higher than highscore.
 * Dispalys new highscore and updates local storage.
 * Gives user a feedback of throwing confetti once a new highscore was hit
 */
function addHighScore() {
    userScore = parseInt(localStorage.getItem("highscore"));
    if (currentScore > userScore) {
        // Confetti code found on https://www.kirilv.com/canvas-confetti/
        confetti({
            particleCount: 500,
            spread: 200,
            origin: {
                y: 0.6
            }
        });
        userScore = currentScore;
        document.getElementById("highscore").innerText = userScore;
        localStorage.setItem("highscore", userScore);
    }
}

/**
 * Iterates through all buttons and adds the disabled class as well as styling to visualize disabled state. 
 */
function disableButtons() {
    for (let btn of allButtons) {
        btn.classList.add("disabled");
        btn.style.background = "grey";
    }
}

/**
 * Iterates through all buttons and removes the disabled class and resets styling.
 */
function resetButtons() {
    for (let btn of allButtons) {
        btn.classList.remove("disabled");
        btn.style.background = "white";
    }
}

/**
 * retrieves all hangman images and iterates through them to add the hidden class to each of them. 
 */
function hideImages() {
    // hide all hangman images
    let hangmanImages = document.querySelectorAll("#images img");
    for (let img of hangmanImages) {
        img.classList.add("hidden");
    }
}

/**
 * Doesn't execute if game is over. 
 * if game not over it empties the randomWordArray and placeHolderArray to prepeare for new game.
 * Calls resetButtons (returns all buttons to initial state).
 * resets user tries and hangman images to initial state.
 * Calls gameStart (Initiates new game).
 * @returns 
 */
function resetGame() {
    if (gameOver) return;
    newDiv.classList.add("hidden");
    randomWordArray = [];
    placeholderArray = [];
    resetButtons();
    userTry = 6;
    document.getElementById("tries").innerText = userTry;
    hideImages();
    document.getElementById("img6").classList.remove("hidden");
    gameStart();
}

/**
 * Sets game over to false.
 * Empties the randomWordArray and placeHolderArray to prepeare for new game.
 * Calls resetButtons (returns all buttons to initial state).
 * Resets user tries, current score and hangman images to initial state.
 * Calls gameStart (Initiates new game).
 */
function restartGame() {
    newDiv.classList.add("hidden");
    gameOver = false;
    randomWordArray = [];
    placeholderArray = [];
    resetButtons();
    userTry = 6;
    document.getElementById("tries").innerText = userTry;
    currentScore = 0;
    document.getElementById("current-score").innerText = currentScore;
    hideImages();
    document.getElementById("img6").classList.remove("hidden");
    gameStart();
}

document.getElementById("reset-button").addEventListener("click", resetGame);
document.getElementById("start-button").addEventListener("click", restartGame);

document.getElementById("rules").addEventListener("click", clickGameRules);
/**
 * Opens Modal with Game rules after clicking anchor tag in Navbar.
 * @param {Event} e 
 */
function clickGameRules(e) {
    // Prevent reload of page since eventlistener is added to an anchor tag.
    e.preventDefault();
    gameRuleText.innerHTML = `
       <p><strong>🎯 Goal:</strong><br>
       Guess the word correctly and aim to <strong>beat your current Highscore</strong>!</p>
       <hr>
       <h3>🟢 How to Start</h3>
       <ul>
         <li>The game begins at <strong>Medium</strong> difficulty by default.</li>
         <li>You can also choose a different level: <strong>Easy</strong>, <strong>Medium</strong>, or <strong>Hard</strong> before starting.</li>
         <li>A word will be randomly selected and displayed as underscores (<code>_</code>)—each one represents a letter.</li>
       </ul>
       <h3>❌ Wrong Guesses</h3>
       <ul>
         <li>You have <strong>6 tries</strong>.</li>
         <li>Every wrong guess reveals a <strong>new part of the hangman</strong>.</li>
         <li>If you're down to your <strong>last try</strong>, you’ll get the option to reveal a <strong>hint</strong></li>
         <li>If all 6 parts are revealed before the word is guessed, <strong>you lose</strong>, and the <strong>correct word will be shown</strong>.</li>
       </ul>
       <h3>✅ Winning & Scoring</h3>
       <ul>
         <li>Guess the word before running out of tries to <strong>win</strong>.</li>
         <li>Every correct word guessed increases your <strong>current score by 1</strong>.</li>
         <li>Your <strong>Highscore is saved</strong> in your browser (local storage).</li>
       </ul>
       <h3>🔁 Game Controls</h3>
       <ul>
         <li><strong>Start Game</strong>: Fully resets the game — score, tries, and current word.</li>
         <li><strong>Reset Game</strong>: Starts a new round with a new word and <strong>6 fresh tries</strong>, <em>but keeps your current score</em> so you can keep trying to beat your Highscore.</li>
         <li><strong>Reset Highscore</strong>: Clears your saved highscore from the browser so you can start fresh.</li>
       </ul>`;

    gameRules.show();
}

document.getElementById("reset-highscore").addEventListener("click", resetHighscore);
/**
 * Sets high score in local storage to 0, retrieves and displays it after reset Highsore was clicked in navbar.
 */
function resetHighscore() {
    localStorage.setItem("highscore", "0");
    let userHighscore = localStorage.getItem("highscore");
    document.getElementById("highscore").innerText = userHighscore;
}

// // Attach click event to each dropdown item (Easy, Medium, Hard)
document.querySelectorAll(".dropdown-item").forEach(item => {
    // upon click carry out anonymus function
    item.addEventListener("click", function () {
        // store inner text of user choice and set to lowercase
        difficulty = item.innerText.toLowerCase();
        console.log(`User selected ${difficulty} difficulty`);
        getDifficulty(difficulty);
        // reset the game if user selects difficulty mid-game
        resetGame();
    });
});

/**
 * Receives by user chosen difficulty level and assigns relevant wordbank"
 * @param {string} difficulty 
 */
function getDifficulty(difficulty) {
    switch (difficulty) {
        case "easy":
            wordBank = Object.keys(wordBankEasy);
            break;
        case "hard":
            wordBank = Object.keys(wordBankHard);
            break;
        default:
            wordBank = Object.keys(wordBankMedium);
            break;
    }
}
/**
 * Styles and displays hint div that was previuosly created.
 * Attach click event listener to create a key of the current random word
 * to retrive the object value
 * of the relevant wordbank depending on the user choice.
 * Displays hint modal.
 */
function showHint() {
    newDiv.classList.remove("hidden");
    newDiv.classList.add("col-12", "pt-4");
    newDiv.style.fontFamily = "Monteserrat, sans-serif";
    newDiv.classList.add("pulse");
    newDiv.style.color = "#98C379";
    newDiv.innerText = "CLICK HERE FOR A HINT";
    let div = document.getElementById("tries-container");
    div.appendChild(newDiv);
    newDiv.addEventListener("click", function () {
        let key = wordBank[wordBankIndex];
        if (difficulty === "easy") {
            hintModalText.innerText = `${wordBankEasy[key]}`;
        } else if (difficulty === "medium") {
            hintModalText.innerText = `${wordBankMedium[key]}`;
        } else {
            hintModalText.innerText = `${wordBankHard[key]}`;
        }
        hints.show();
        newDiv.classList.add("hidden");
    });
}

if (typeof module !== "undefined") module.exports = {
    getDifficulty,
    triesLeft,
    addCurrentScore,
    addHighScore,
    resetButtons,
    disableButtons,
    hideImages
};