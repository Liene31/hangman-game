import { wordsData } from "./data.js";

const letterInput = document.getElementById("letter-input");
const missedLettersSpan = document.getElementById("missed-letters");
const nameToGuessPara = document.getElementById("name-to-guess");
const gameStatusPara = document.getElementById("game-status");
const checkBtn = document.getElementById("check-btn");

const randomNumber = generateRandomNumber();
const wordToGuess = wordsData[randomNumber];

const wordToGuessArray = [];
const missedLetterArray = [];

let guesses = 6;

function drawDashes() {
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

checkBtn.addEventListener("click", () => {
  const letterGuessed = letterInput.value.toLowerCase();
  let isLetterInWord = false;

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
      gameStatusPara.textContent = `GAME OVER`;
      nameToGuessPara.textContent = wordToGuess;
    }
  } else {
    if (!wordToGuessArray.includes("__ ")) {
      checkBtn.disabled = true;
      gameStatusPara.textContent = `YOU WON`;
    }
    renderHtml(wordToGuessArray, nameToGuessPara);
  }

  clearInput();
});

//On game start
drawDashes();
renderHtml(wordToGuessArray, nameToGuessPara);

// ----------------------------------------------------
console.log(wordToGuess);
console.log(wordToGuess.length);
