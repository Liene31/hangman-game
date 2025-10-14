import { wordsData } from "./data.js";

const letterInput = document.getElementById("letter-input");
const missedLettersPara = document.getElementById("missed-letters");
const nameToGuessPara = document.getElementById("name-to-guess");
const checkBtn = document.getElementById("check-btn");

const randomNumber = generateRandomNumber();
const wordToGuess = wordsData[randomNumber];
const wordToGuessLength = wordToGuess.length;

const wordToGuessArray = [];
const missedLetterArray = [];

function drawDashes() {
  for (let i = 0; i < wordToGuessLength; i++) {
    wordToGuessArray.push("__ ");
  }
}

function renderHtml() {
  nameToGuessPara.textContent = "";
  wordToGuessArray.forEach((item) => {
    nameToGuessPara.textContent += item;
  });
}

function generateRandomNumber() {
  return Math.floor(Math.random() * wordsData.length);
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

  if (!isLetterInWord) {
    missedLetterArray.push(letterGuessed);
    missedLettersPara.textContent += letterGuessed;
  }

  renderHtml();
});

drawDashes();
renderHtml();

// ----------------------------------------------------
console.log(wordToGuess);
console.log(wordToGuessLength);
console.log(missedLetterArray);
