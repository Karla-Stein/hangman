/* jshint esversion: 11 */

// visualise the automatic redirect to the user
// Code found at javascript.info and adjusted for this project
document.addEventListener("DOMContentLoaded", () => {
  let seconds = 5;
  const countdownEl = document.getElementById("countdown");

  countdownEl.innerText = `Redirecting in ${seconds} seconds...`;
  //  Create an interval that runs a function every 1000 milliseconds (1 second)
  const countdown = setInterval(() => {
    seconds--;
    // Use a ternary operator to display "second" or "seconds"
    countdownEl.innerText = `Redirecting in ${seconds} second${seconds !== 1 ? 's' : ''}...`;

    if (seconds <= 0) {
      clearInterval(countdown);
      window.location.href = "index.html";
    }
  }, 1000); // Interval time 
});