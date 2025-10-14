import { wordsData } from "./data.js";

const letterInput = document.getElementById("letter-input");
const nameToGuessPara = document.getElementById("name-to-guess");
const checkBtn = document.getElementById("check-btn");

const randomNumber = generateRandomNumber();
const wordToGuess = wordsData[randomNumber];
const wordToGuessLength = wordToGuess.length;

const wordToGuessArray = [];
// lettersMissedArray

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

  wordToGuess.split("").forEach((letter, index) => {
    if (letterGuessed === letter) {
      console.log(letter, index);
      console.log((wordToGuessArray[index] = letter));
    }
  });
  renderHtml();
});

drawDashes();
renderHtml();

// ----------------------------------------------------
console.log(wordToGuess);
console.log(wordToGuessLength);
console.log(wordToGuessArray);
