const xButton = document.getElementById("xButton");
const oButton = document.getElementById("oButton");
const buttonContainer = document.getElementById("button-container");
const gameCells = document.querySelectorAll(".container");
const currentTurn = document.getElementById("turn");
const resetButton = document.getElementById("clear");

let isUnchosenTurn = false;
let chosenCharacter;
let unchosenCharacter;
let gameBoard = ["", "", "", "", "", "", "", "", ""];

oButton.addEventListener("click", () => {
  buttonContainer.style.display = "none";
  chosenCharacter = "O";
  unchosenCharacter = "X";
  resetButton.style.display = "block";
  currentTurn.innerText = `No winners yet turn : ${chosenCharacter}`;
  isUnchosenTurn = false;
  gameCells.forEach((cell) => {
    cell.style.pointerEvents = "auto";
  });
});

xButton.addEventListener("click", () => {
  buttonContainer.style.display = "none";
  chosenCharacter = "X";
  unchosenCharacter = "O";
  isUnchosenTurn = false;
  resetButton.style.display = "block";
  currentTurn.innerText = `No winners yet turn : ${chosenCharacter}`;
  gameCells.forEach((cell) => {
    cell.style.pointerEvents = "auto";
  });
});

gameCells.forEach(function (cell, index) {
  cell.addEventListener("click", function (event) {
    if (event.target.innerHTML !== "") {
      return;
    } else if (chosenCharacter === undefined) {
      return;
    } else if (!isUnchosenTurn) {
      gameBoard[index] = chosenCharacter;
      event.target.innerHTML = chosenCharacter;
      isUnchosenTurn = true;
      currentTurn.innerText = `No winners yet turn : ${unchosenCharacter}`;
    } else if (isUnchosenTurn) {
      gameBoard[index] = unchosenCharacter;
      event.target.innerHTML = unchosenCharacter;
      isUnchosenTurn = false;
      currentTurn.innerText = `No winners yet turn : ${chosenCharacter}`;
    }

    const winner = checkWinner(gameBoard);
    if (winner) {
      currentTurn.innerText = `Winner: ${winner}`;
      gameCells.forEach((cell) => {
        cell.style.pointerEvents = "none";
      });
    } else if (checkDraw()) {
      // Kazanan yoksa beraberlik kontrolü yap
      currentTurn.innerText = "It's a draw!";
      gameCells.forEach((cell) => {
        cell.style.pointerEvents = "none";
      });
    }

    event.target.style.pointerEvents = "none";
  });
});

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner(board) {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

resetButton.addEventListener("click", () => {
  gameCells.forEach((cell) => {
    cell.innerHTML = "";
    cell.style.pointerEvents = "none";
  });
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentTurn.innerHTML = "Please Choose Character";
  resetButton.style.display = "none";
  buttonContainer.style.display = "flex";
});

function checkDraw() {
  for (let box of gameCells) {
    if (box.innerHTML === "") {
      return false;
    }
  }
  return true;
}
