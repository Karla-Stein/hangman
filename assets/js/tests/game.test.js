/**
 * @jest-environment jsdom
*/

/* jshint esversion: 11 */
/* global global, describe, beforeEach, jest, require, afterEach, test, expect */

describe("Hangman boot & basic state", () => {
    const getHTML = () => `
        <div id="end-game" class="modal"><div id="modal-title"></div><div id="modal-text"></div></div>
        <div id="game-rules" class="modal"><div id="game-rule-text"></div></div>
        <div id="hint-modal" class="modal"><div id="hint-modal-body"></div></div>

        <nav class="navbar-collapse">
        <a class="nav-link">Home</a>
        <a id="rules" class="nav-link">Rules</a>
        <div class="dropdown-menu">
            <a class="dropdown-item">Easy</a>
            <a class="dropdown-item">Medium</a>
            <a class="dropdown-item">Hard</a>
        </div>
        </nav>

        <div id="button-container">
        <div id="buttons-1"></div>
        <div id="buttons-2"></div>
        <div id="buttons-3"></div>
        </div>

        <div id="tries-container"><span id="tries"></span></div>
        <div id="placeholder"></div>
        <div id="score">
        <span id="current-score">0</span>
        <span id="highscore"></span>
        </div>

        <div id="images">
        <img id="img0" class="hidden">
        <img id="img1" class="hidden">
        <img id="img2" class="hidden">
        <img id="img3" class="hidden">
        <img id="img4" class="hidden">
        <img id="img5" class="hidden">
        <img id="img6" class="hidden">
        </div>

        <button id="reset-button">Reset</button>
        <button id="start-button">Start</button>
        <button id="reset-highscore">Reset Highscore</button>
    `;

    beforeEach(() => {
        // Fresh DOM
        document.body.innerHTML = getHTML();

        // Stub globals that the script expects
        global.bootstrap = {
            Modal: jest.fn().mockImplementation(() => ({ show: jest.fn(), hide: jest.fn() })),
        };
        global.confetti = jest.fn();

        // Sample word banks defined BEFORE loading the script
        global.wordBankEasy = { door: "You walk through it to enter a room." };
        global.wordBankMedium = { apple: "A round fruit that keeps the doctor away.", grape: "A small fruit that grows in bunches on vines." };
        global.wordBankHard = { planet: "A large object that orbits the sun, like Earth or Mars." };

        localStorage.clear();

        // 👇 Intercept DOMContentLoaded: call handler once, don't retain it
        const realAddEventListener = document.addEventListener.bind(document);
        jest.spyOn(document, "addEventListener").mockImplementation((type, cb, opts) => {
            if (type === "DOMContentLoaded") {
                // Immediately run the module's init logic once
                cb();
                return;
            }
            // For everything else, behave normally
            return realAddEventListener(type, cb, opts);
        });

        // Load the module AFTER stubs exist
        jest.resetModules();
        jest.isolateModules(() => {
            require("../script.js"); // relative to assets/js/tests/
        });
    });

    afterEach(() => {
        // Clean up the spy so it doesn't leak between tests
        jest.restoreAllMocks();
    });

    test("application loads without throwing and initializes highscore display", () => {
        expect(document.getElementById("highscore").innerText).toBe("0");
        expect(global.bootstrap.Modal).toHaveBeenCalled();
    });

    test("26 alpha letter buttons are generated", () => {
        const all = document.querySelectorAll("#button-container button");
        expect(all.length).toBe(26);

        // Stronger check: expected distribution by row (QWERTY)
        expect(document.querySelectorAll("#buttons-1 button").length).toBe(10); // 10 keys on top row
        expect(document.querySelectorAll("#buttons-2 button").length).toBe(9); // 9 keys in middle row
        expect(document.querySelectorAll("#buttons-3 button").length).toBe(7); // 7 keys on bottom row

        // Sanity-check labels, be tolerant of jsdom:
        const labels = Array.from(all).map(b => b.textContent || b.innerText || "");
        expect(labels.filter(Boolean).length).toBeGreaterThanOrEqual(20); // loose check
    });

    test("user starts with 6 tries", () => {
        const triesEl = document.getElementById("tries");
        expect(Number(triesEl.innerText)).toBe(6);
    });

    test("initial hangman picture (img6) is visible and others are hidden", () => {
        expect(document.getElementById("img6").classList.contains("hidden")).toBe(false);
        for (let i = 0; i <= 5; i++) {
            expect(document.getElementById(`img${i}`).classList.contains("hidden")).toBe(true);
        }
    });

    test("highscore is set to 0 in localStorage on first load", () => {
        expect(localStorage.getItem("highscore")).toBe("0");
    });

    test("placeholder shows underscores for the chosen word", () => {
        const placeholder = document.getElementById("placeholder").innerText;
        expect(placeholder).toMatch(/^(_\s)+$|^(_\s)+_?$/); // RegEx
        expect(placeholder.includes("_")).toBe(true);
    });

    test("keyboard buttons are not disabled at start", () => {
        const anyDisabled = Array.from(document.querySelectorAll("#button-container button"))
            .some(btn => btn.classList.contains("disabled"));
        expect(anyDisabled).toBe(false);
    });
});