// Html Elements
const keyboardDiv = document.querySelector(".keyboard"),
  wordDiv = document.querySelector(".word-display"),
  categoryHolder = document.querySelector(".category"),
  wrongDiv = document.querySelector(".wrong"),
  finishDiv = document.querySelector(".finish"),
  hangmanImg = document.querySelector(".box img");

let currentWord,
  wrongGuesses = 0,
  neededChars;

// our words and categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "ruby",
    "mysql",
    "python",
    "Java",
    "laravel",
  ],
  companies: ["Google", "Meta", "Apple", "Microsoft", "Uber", "paypal"],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: ["Einstein", "Hitchcock", "Alexander", "Cleopatra", "Ghandi"],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// build the keyboard
for (let i = 97; i <= 122; i++) {
  keyboardDiv.innerHTML += `
  <span class="center" onclick=check(this)>${String.fromCharCode(i)}</span>
  `;
}

// get random category & word from words

// all categories
let categories = Object.keys(words);

// get random category
let category = categories[Math.floor(Math.random() * categories.length)];

// all words in this category
categoryWords = words[category];

// get random word from this category
currentWord = categoryWords[Math.floor(Math.random() * categoryWords.length)];

// show the category on the page
categoryHolder.innerHTML = `Category: <span> ${category}</span>`;

// add chars places on the page
currentWord.split("").forEach((c) => {
  wordDiv.innerHTML += "<span>_</span>";
});

neededChars = currentWord.length;

// excuted when keyboard key was clicked
function check(e) {
  // block the clicked char key
  e.style.pointerEvents = "none";
  e.style.backgroundColor = "black";

  // check if the clicked char key in the currentWord
  if (currentWord.includes(e.innerHTML)) {
    // get all spans that should holds the chars of the currentWord
    charsSpans = document.querySelectorAll(".word-display span");
    for (let i = 0; i < charsSpans.length; i++) {
      // put the clicked char into the correct place
      if (e.innerHTML == currentWord[i].toLowerCase()) {
        charsSpans[i].innerHTML = e.innerHTML.toUpperCase();
        neededChars--;
      }
    }
  } else {
    wrongGuesses++;
    // update the hangman parts after every incorrect guess
    hangmanImg.src = `imgs/${wrongGuesses + 1}.svg`;
    // update number of incorrect geuss
    wrongDiv.innerHTML = `Wrong Guesses: <span>${wrongGuesses} / 6</span>`;
  }
  // finish the game if there id no available guesses or when the player get the correct word
  if (wrongGuesses === 6 || neededChars === 0) {
    setTimeout(finish, 300);
  }
}

// excuted when wrongGuesses === 6 or neededChars === 0
function finish() {
  finishDiv.classList.remove("hiddin");
  if (neededChars === 0) {
    finishDiv.innerHTML = `
    <div class="holder">
        <img src="imgs/win.gif" alt="" />
        <div class="text">
          <div class="status">Congrats!</div>
          <div class="word">You found the word: <span>${currentWord}</span></div>
        </div>
        <button onclick=location.reload()>Play Again</button>
      </div>
    `;
  } else {
    finishDiv.innerHTML = `
    <div class="holder">
        <img src="imgs/lost.gif" alt="" />
        <div class="text">
          <div class="status">Game Over!</div>
          <div class="word">The correct word was: <span>${currentWord}</span></div>
        </div>
        <button onclick=location.reload()>Play Again</button>
      </div>
    `;
  }
}
