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

}
)