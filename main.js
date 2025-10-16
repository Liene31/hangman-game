import { wordsData } from "./data.js";

const letterInput = document.getElementById("letter-input");
const missedLettersSpan = document.getElementById("missed-letters");
const nameToGuessPara = document.getElementById("name-to-guess");
const gameStatusPara = document.getElementById("game-status");
const errorMessage = document.getElementById("error-message");
const wonScoreSpan = document.getElementById("won-score");
const lostScoreSpan = document.getElementById("lost-score");
const checkBtn = document.getElementById("check-btn");
const nextRoundBtn = document.getElementById("next-round");

let wordToGuess;

let wordToGuessArray = [];
let missedLetterArray = [];

let guesses = 6;
let wonScore = 0;
let lostScore = 0;

function drawDashes(wordToGuess) {
  wordToGuessArray = [];
  for (let i = 0; i < wordToGuess.length; i++) {
    wordToGuessArray.push("__ ");
  }
}

function renderHtml(array, para) {
  para.textContent = "";
  array.forEach((item) => {
    para.textContent += `${item} `;
  });
}

function generateRandomNumber() {
  return Math.floor(Math.random() * wordsData.length);
}

function clearInput() {
  letterInput.value = "";
}

letterInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    gameLogic();
  }
});

function gameLogic() {
  const letterGuessed = letterInput.value.toLowerCase();
  let isLetterInWord = false;

  if (letterGuessed === "" || !isNaN(letterGuessed)) {
    errorMessage.textContent = "*Enter a valid letter";
  } else {
    errorMessage.textContent = "";

    wordToGuess.split("").forEach((letter, index) => {
      if (letterGuessed === letter) {
        isLetterInWord = true;
        wordToGuessArray[index] = letter;
      }
    });

    if (!isLetterInWord && !missedLetterArray.includes(letterGuessed)) {
      missedLetterArray.push(letterGuessed);
      guesses--;
      gameStatusPara.textContent = `Guesses left: ${guesses}`;
      renderHtml(missedLetterArray, missedLettersSpan);
      if (guesses === 0) {
        checkBtn.disabled = true;
        nextRoundBtn.disabled = false;
        lostScore++;
        lostScoreSpan.textContent = lostScore;
        gameStatusPara.textContent = `GAME OVER`;
        nameToGuessPara.textContent = wordToGuess;
      }
    } else {
      if (!wordToGuessArray.includes("__ ")) {
        checkBtn.disabled = true;
        nextRoundBtn.disabled = false;
        wonScore++;
        wonScoreSpan.textContent = wonScore;
        gameStatusPara.textContent = `YOU WON`;
      }
      renderHtml(wordToGuessArray, nameToGuessPara);
    }
  }

  clearInput();
}

checkBtn.addEventListener("click", gameLogic);

//Resets the game, except Won & Lost Statistics
nextRoundBtn.addEventListener("click", () => {
  startGame();
});

function startGame() {
  const randomNumber = generateRandomNumber();
  guesses = 6;
  gameStatusPara.textContent = `Guesses left: ${guesses}`;
  missedLettersSpan.textContent = "";
  missedLetterArray = [];
  wordToGuess = wordsData[randomNumber];
  checkBtn.disabled = false;
  nextRoundBtn.disabled = true;
  drawDashes(wordToGuess);
  renderHtml(wordToGuessArray, nameToGuessPara);

  // ----------------------------------------------
  console.log(wordToGuess);
  console.log(wordToGuess.length);
}

startGame();

// -----------------------------

// const letterContainer = document.getElementById("letter-container");
// const letterArray = [];

// for (let i = 0; i < 10; i++) {
//   letterArray.push("_");
//   const divEl = document.createElement("div");
//   divEl.classList.add("letter-box");
//   letterContainer.append(divEl);
// }

// console.log(letterArray);
