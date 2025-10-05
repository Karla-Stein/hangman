/* jshint esversion: 6 */
/**
 * Creates Alphabet buttons and adds them to the DOM 
 */
let userTry = 6;
let currentScore = 0;
let userScore = 0;
// Bootstrap modal
const modalEndGame = new bootstrap.Modal(document.getElementById("end-game"));
let modalTitle = document.getElementById("modal-title");
let modalText = document.getElementById("modal-text");

const gameRules = new bootstrap.Modal(document.getElementById("game-rules"));
let gameTitle = document.getElementById("game-title");
let gameRuleText = document.getElementById("game-rule-text");

let allButtons = [];
let randomWordArray = [];
let placeholderArray = [];
// generate word and array with equal amount of charakters
const wordBank = ["puzzle", "interface", "variable", "function", "keyboard", "syntax", "boolean", "browser", "console", "network", "element", "closure", "callback", "array", "object", "script", "storage", "content", "element", "display"];

document.addEventListener("DOMContentLoaded",function(){

    
   
    localStorage.setItem("highscore", "0");

    const qwertyLayout = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];
    for (let char of qwertyLayout[0]){
       let button =  document.createElement("button");
       button.classList.add("btn", "btn-light", "btn-lg");
       button.innerText = char;
       button.setAttribute("type","button");
       document.getElementById("buttons-1").appendChild(button);  
    } 
    for (let char of qwertyLayout[1]){
       let button =  document.createElement("button");
       button.classList.add("btn", "btn-light", "btn-lg");
       button.innerText = char;
       button.setAttribute("type","button");
       document.getElementById("buttons-2").appendChild(button);  
    } 
    for (let char of qwertyLayout[2]){
       let button =  document.createElement("button");
       button.classList.add("btn", "btn-light", "btn-lg");
       button.innerText = char;
       button.setAttribute("type","button");
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

   function gameStart() {
    resetButtons();
    userTry = 6;
    document.getElementById("tries").innerText = userTry;
    hideImages();
    document.getElementById("img6").classList.remove("hidden");

    const wordBankIndex = Math.floor(Math.random() * wordBank.length);
    randomWordArray = wordBank[wordBankIndex].toUpperCase().split("");
    placeholderArray = new Array(randomWordArray.length).fill("_ ");
    document.getElementById("placeholder").innerText = placeholderArray.join("");
     console.log(randomWordArray);
}

        
        
function handleGuess(e) {
    let btn = e.target;
    let buttonLetter = btn.innerText;
    btn.classList.remove("disabled");

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
        gameWon(placeholderArray, randomWordArray);
    }
}

/**
 * Checks indexof the current image, hides it and make the next visible 
 */
function wrongGuess(randomWordArray) {
      // selected letter isn't in the currentWordSplit
    triesLeft(); // decrement number of tries remaining
    hideImages(); // hide all hangman images
    let currentImage = document.getElementById(`img${userTry}`); // unhide the hangman image of the matching tries remaining
    currentImage.classList.remove("hidden");

    if (userTry === 0) {
        // user ran out of tries; game over
        gameLost(randomWordArray);
    }

    function gameLost(){
        document.getElementById("placeholder").innerText = randomWordArray.join("");   
       
        disableButtons();
        // update modal text and then show modal
        modalTitle.innerHTML="<h2>Game Over</h2>"
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

function gameWon(placeholderArray, randomWordArray){
    if(placeholderArray.join("") === randomWordArray.join("")){
                addCurrentScore();
                addHighScore();
                let highscore = parseInt(localStorage.getItem("highscore"))
                modalTitle.innerHTML="<h2>Congrats!</h2>"
                modalText.innerHTML = `
                    You guessed <strong>${randomWordArray.join("")}</strong>.
                    <br>
                    Tries remaining: <strong>${userTry}</strong>.
                    <br>
                    Times won: <strong>${currentScore}</strong>.
                    <br>
                    Highscore: <strong>${highscore}</strong>
                `;
                modalEndGame.show();
                resetGame();
                  }
}

function triesLeft(){
    // decrements and displays userTry.Updates global variable
    document.getElementById("tries").innerText =  userTry -1;
    userTry--;
    console.log("User tries left:" , userTry)
}

function addCurrentScore(){
    // increments and displays current score.Updates global variable
    document.getElementById("current-score").innerText =  currentScore + 1;
    currentScore++;
    console.log("Current score:" , currentScore)
}


function addHighScore(){
    userScore = parseInt(localStorage.getItem("highscore"));
    if (currentScore > userScore)
    userScore = currentScore;
    document.getElementById("highscore").innerText = userScore;
    localStorage.setItem("highscore", userScore);
    console.log("UserScore:", userScore)
}

function disableButtons(){
   for(let btn of allButtons){
    btn.classList.add("disabled");
    btn.style.background = "grey"
   }
}

function resetButtons(){
    for(let btn of allButtons){
    btn.classList.remove("disabled");
    btn.style.background = "white";
    }
}

function hideImages() {
    // hide all hangman images
    let hangmanImages = document.querySelectorAll("#images img");
    for(let img of hangmanImages){
        img.classList.add("hidden")
    }
}

function resetGame(){
    let randomWordArray = [];
    let placeholderArray = [];  
    resetButtons();
    userTry = 6;
    document.getElementById("tries").innerText = userTry;
    hideImages();
    document.getElementById("img6").classList.remove("hidden");
    gameStart();
}

function restartGame(){
    let randomWordArray = [];
    let placeholderArray = [];  
    resetButtons();
    userTry = 6;
    document.getElementById("tries").innerText = userTry;
    currentScore = 0;
    document.getElementById("current-score").innerText = currentScore;
    hideImages();
    document.getElementById("img6").classList.remove("hidden");
    // localStorage.setItem("highscore", "0")
    // // let userScore = parseInt(localStorage.getItem("highscore"));
    // document.getElementById("highscore").innerText = userScore;
    gameStart();
}

document.getElementById("reset-button").addEventListener("click", resetGame);
document.getElementById("start-button").addEventListener("click", restartGame);

document.getElementById("rules").addEventListener("click", clickGameRules);
function clickGameRules(e){
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
         <li>If all 6 parts are revealed before the word is guessed, <strong>you lose</strong>, and the <strong>correct word will be shown</strong>.</li>
       </ul>
       <h3>✅ Winning & Scoring</h3>
       <ul>
         <li>Guess the word before running out of tries to <strong>win</strong>.</li>
         <li>Every correct word guessed increases your <strong>score by 1</strong>.</li>
         <li>Your <strong>Highscore is saved</strong> in your browser (local storage).</li>
       </ul>
       <h3>🔁 Game Controls</h3>
       <ul>
         <li><strong>Start Game</strong>: Fully resets the game — score, tries, and current word.</li>
         <li><strong>Reset Game</strong>: Starts a new round with a new word and <strong>6 fresh tries</strong>, <em>but keeps your current score</em> so you can keep trying to beat your Highscore.</li>
       </ul>`;
           
        gameRules.show();
}