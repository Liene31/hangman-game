import { wordsData } from "./data.js";

const letterInput = document.getElementById("letter-input");
const missedLettersSpan = document.getElementById("missed-letters");
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

const letterContainer = document.getElementById("letter-container");

function drawDashes(wordToGuess) {
  let divEl;
  wordToGuessArray = [];

  for (let i = 0; i < wordToGuess.length; i++) {
    divEl = document.createElement("div");
    divEl.textContent = "_";
    divEl.classList.add("letter-box");
    letterContainer.append(divEl);
    wordToGuessArray.push(divEl);
  }
}

function renderMissedLetters(array, para) {
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
        wordToGuessArray[index].textContent = letter;
      }
    });

    if (!isLetterInWord && !missedLetterArray.includes(letterGuessed)) {
      missedLetterArray.push(letterGuessed);
      guesses--;
      gameStatusPara.textContent = `Guesses left: ${guesses}`;
      renderMissedLetters(missedLetterArray, missedLettersSpan);
      if (guesses === 0) {
        checkBtn.disabled = true;
        nextRoundBtn.disabled = false;
        letterInput.disabled = true;
        lostScore++;
        lostScoreSpan.textContent = lostScore;
        gameStatusPara.textContent = `GAME OVER`;

        //maybe make a function, it repeats second time
        wordToGuess.split("").forEach((letter, index) => {
          wordToGuessArray[index].textContent = letter;
        });
      }
    } else {
      if (
        wordToGuessArray.every((item) => {
          return !item.textContent.includes("_");
        })
      ) {
        checkBtn.disabled = true;
        nextRoundBtn.disabled = false;
        letterInput.disabled = true;
        wonScore++;
        wonScoreSpan.textContent = wonScore;
        gameStatusPara.textContent = `YOU WON`;
      }
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
  letterContainer.textContent = "";
  missedLetterArray = [];
  wordToGuess = wordsData[randomNumber];
  checkBtn.disabled = false;
  nextRoundBtn.disabled = true;
  letterInput.disabled = false;
  drawDashes(wordToGuess);

  // ----------------------------------------------
  console.log(wordToGuess);
  console.log(wordToGuess.length);
}

startGame();
