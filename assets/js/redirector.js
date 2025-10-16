///* jshint esversion: 11*/

// 1) List every path on your site that *does* exist.
// Include both "/" and "/index.html" so both forms are allowed.
const VALID_PATHS = ["/", "/index.html"];
// 2) Run after the HTML is parsed, so location/pathname is reliable.
document.addEventListener ("DOMContentLoaded", () => {
// 3) Grab the current path (the bit after the domain), e.g. "/faq.html"
const currentPath = window. location.pathname;
//4) If it's *not* one of our known pages, redirect to the main page.
const isKnown = VALID_PATHS. includes (currentPath);
if (lisKnown) {
// 5) Do the redirect.
// replace() avoids adding a useless "bad page" entry to browser history.
window. location.replace("/index.html");
}
});