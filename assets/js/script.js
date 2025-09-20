/**
 * Creates Alphabet buttons and adds them to the DOM 
 */
document.addEventListener("DOMContentLoaded",function(){
    let alphabetArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    for (let char of alphabetArray){
       let button =  document.createElement("button");
       button.classList.add("btn", "btn-light", "btn-lg");
       button.innerText = char;
       document.getElementById("buttons-1").appendChild(button);  
    }   
}
)