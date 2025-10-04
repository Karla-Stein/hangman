/* jshint esversion: 6 */
/**
 * Creates Alphabet buttons and adds them to the DOM 
 */
let userTry = 6;
// Bootstrap modal
const modalEndGame = new bootstrap.Modal(document.getElementById("end-game"));
let modalTitle = document.getElementById("modal-title");
let modalText = document.getElementById("modal-text");
let allButtons = [];
let randomWordArray = [];
let placeholderArray = [];
// generate word and array with equal amount of charakters
const wordBank = ["puzzle", "interface", "variable", "function", "keyboard", "syntax", "boolean", "browser", "console", "network", "element", "closure", "callback", "array", "object", "script", "storage", "content", "element", "display"];

document.addEventListener("DOMContentLoaded",function(){

    
    let currentScore = 0;
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

        
        
    if (!randomWordArray.join("").includes(buttonLetter)){
        btn.style.background = "grey";
        wrongGuess(randomWordArray);
    }else{
    // check if guessed letter is in random word
    for (let i=0; i<randomWordArray.length; i++){
        if(randomWordArray[i] === buttonLetter){
            btn.style.background= "grey";
            // if yes replace same index with correct letter
              placeholderArray[i] = buttonLetter;
              document.getElementById("placeholder").innerText = placeholderArray.join("");
              gameWon(placeholderArray, randomWordArray);
             
        }
    }}

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
}
} 

function gameWon(placeholderArray, randomWordArray){
    if(placeholderArray.join("") === randomWordArray.join("")){
                addScore();
                let highscore = parseInt(localStorage.getItem("highscore"))
                modalTitle.innerHTML="<h2>Congrats!</h2>"
                modalText.innerHTML = `
                    You guessed <strong>${randomWordArray.join("")}</strong>.
                    <br>
                    Tries remaining: <strong>${userTry}</strong>.
                    <br>
                    Total times won: <strong>${highscore}</strong>.
                `;
                modalEndGame.show();
                // disableButtons();
                  }
}

function triesLeft(){
    // decrements and displays userTry.Updates global vaiable
    document.getElementById("tries").innerText =  userTry -1;
    userTry--;
    console.log("User tries left:" , userTry)
}


function addScore(){
    let userScore = parseInt(localStorage.getItem("highscore"));
    userScore++;
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

document.getElementById("reset-button").addEventListener("click", resetGame);
document.getElementById("start-button").addEventListener("click", resetGame)