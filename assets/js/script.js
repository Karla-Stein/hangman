/* jshint esversion: 6 */
/**
 * Creates Alphabet buttons and adds them to the DOM 
 */
document.addEventListener("DOMContentLoaded",function(){

    localStorage.clear();
    localStorage.setItem("try", "5");
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

gameStart();
});

   function gameStart(){
    const wordBank = ["puzzle", "interface", "variable", "function", "keyboard", "syntax", "boolean", "browser", "console", "network", "element", "closure", "callback", "array", "object", "script", "storage", "content", "element", "display"];
    // retrieve random number of array length
    const wordBankIndex = Math.floor(Math.random() * wordBank.length);
    let randomWordArray = wordBank[wordBankIndex].toUpperCase().split("");
    // placeholderArray code from chatGPT
    let placeholderArray = new Array(randomWordArray.length).fill("_ ");  
    document.getElementById("placeholder").innerText = placeholderArray.join("");  
    
    // Add eventListener for each button, retrives button letter
    const buttons = document.getElementsByTagName("button");
    for (let btn of buttons){
        btn.addEventListener("click", function(){
        let buttonLetter = btn.innerText;
        console.log(randomWordArray);
        // check if guessed letter is in random word
        for (let i=0; i<randomWordArray.length; i++){
            if(randomWordArray[i] === buttonLetter){
                // if yes replace same index with correct letter
                  placeholderArray[i] = buttonLetter;
                  document.getElementById("placeholder").innerText = placeholderArray.join("");
                  gameWon(placeholderArray, randomWordArray);
                 
            }
        }
        // negate result oiutside the for loop
        let correctGuess = randomWordArray.join("").includes(buttonLetter);
        if (!correctGuess){
            wrongGuess();
            triesLeft()
        }
    });
}
}
/**
 * Checks indexof the current image, hides it and make the next visible 
 */
function wrongGuess() {
    alert("Aww..wrong answer. Try again");

    const allImages = document.getElementsByTagName("img");
    // Get the current visible image
    const visibleImage = document.getElementsByClassName("visible")[0]; 
    // currentImageIndex code from chatgpt
    const currentImageIndex = Array.from(allImages).indexOf(visibleImage);
    const lastImage = document.getElementById("img7");

    if (currentImageIndex < allImages.length - 1) {
        // Hide current image
        visibleImage.classList.remove("visible");
        visibleImage.classList.add("hidden");
        // Show next image
        const nextImage = allImages[currentImageIndex + 1];
        nextImage.classList.remove("hidden");
        nextImage.classList.add("visible");     
    }
}   

function gameWon(placeholderArray, randomWordArray){
    if(placeholderArray.join() === randomWordArray.join()){
                    alert("Yayy, You won!");
                    addScore();
                    newGame();
                  }
}

function triesLeft(){
    let userTry = parseInt(localStorage.getItem("try"));
    document.getElementById("tries").innerText = `Tries left: ${userTry}`;
    userTry--
    localStorage.setItem("try", userTry);
    if(userTry < 0){
           document.getElementById("tries").innerText = "Tries left: 0"
    }
    console.log(userTry)
}


function addScore(){
    let userScore = parseInt(localStorage.getItem("highscore"));
    userScore++;
    document.getElementById("highscore").innerText = `Highscore: ${userScore}`;
    localStorage.setItem("highscore", userScore);
    console.log(userScore)
}

function newGame(){ 
    let userTry = parseInt(localStorage.getItem("try"));
    let firstImage = document.getElementsByTagName("img")[0];
    console.log(userTry)

    switch (userTry) {
         case 4:
             document.getElementsByTagName("img")[1].classList.remove("visible");
             document.getElementsByTagName("img")[1].classList.add("hidden");
             firstImage.classList.remove("hidden");
             firstImage.classList.add("visible");
             break;
         case 3:
             document.getElementsByTagName("img")[2].classList.remove("visible");
             document.getElementsByTagName("img")[2].classList.add("hidden");
             firstImage.classList.remove("hidden");
             firstImage.classList.add("visible");
             break;
         case 2:
             document.getElementsByTagName("img")[3].classList.remove("visible");
             document.getElementsByTagName("img")[3].classList.add("hidden");
             firstImage.classList.remove("hidden");
             firstImage.classList.add("visible");
             break;
         case 1:
             document.getElementsByTagName("img")[4].classList.remove("visible");
             document.getElementsByTagName("img")[4].classList.add("hidden");
             firstImage.classList.remove("hidden");
             firstImage.classList.add("visible");
             break;
         case 0:
             document.getElementsByTagName("img")[5].classList.remove("visible");
             document.getElementsByTagName("img")[5].classList.add("hidden");
             firstImage.classList.remove("hidden");
             firstImage.classList.add("visible");
             break;
         case -1:
             document.getElementsByTagName("img")[6].classList.remove("visible");
             document.getElementsByTagName("img")[6].classList.add("hidden");
             firstImage.classList.remove("hidden");
             firstImage.classList.add("visible");
             break;
         default:
              console.log("test");
    }
     localStorage.setItem("try", "5");
     let resetTries = localStorage.getItem("try");
     document.getElementById("tries").innerText = "Tries left: 6";
    
}
//  if(nextImage === lastImage){
//             alert("Game Over");
//         }
// document.getElementById("highscore").innerText = `Highscore: ${score}`;
    