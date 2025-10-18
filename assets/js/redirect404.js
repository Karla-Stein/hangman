// //* jshint esversion: 11*/

// visualise the automatic redirect to the user
document.addEventListener("DOMContentLoaded", () => {
  let seconds = 5;
  const countdownEl = document.getElementById("countdown");

  countdownEl.innerText = `Redirecting in ${seconds} seconds...`;

  const countdown = setInterval(() => {
    seconds--;
    countdownEl.innerText = `Redirecting in ${seconds} second${seconds !== 1 ? 's' : ''}...`;

    if (seconds <= 0) {
      clearInterval(countdown);
      window.location.href = "index.html";
    }
  }, 1000);
});