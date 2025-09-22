/**
 * Creates Alphabet buttons and adds them to the DOM 
 */
document.addEventListener("DOMContentLoaded",function(){
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

    const wordBank = ["puzzle", "interface", "variable", "function", "keyboard", "syntax", "boolean", "browser", "console", "network", "element", "closure", "callback", "array", "object", "script", "storage", "content", "element", "display"];
    // retrieve random number of array length
    const wordBankIndex = Math.floor(Math.random() * wordBank.length);
    let randomWord = wordBank[wordBankIndex];
    let placeholder = "";
    for (let char of randomWord){
       placeholder += "_ "  
    }
    document.getElementById("placeholder").innerText += placeholder;  
}
)