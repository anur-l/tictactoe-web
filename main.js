const playerx = document.querySelector(".xplayer");
const playero = document.querySelector(".oplayer");
const cell = document.querySelectorAll(".cell");
const title = document.querySelector("#title");

let player = "X";
let pause = false;
const boardgame = ["", "", "", "", "", "", "", "", ""];

const winbox = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7,8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 7, 8],
  [0, 4, 7],
  [2, 3, 6],
];

function changeplayer() {
  player = player == "X" ? "O" : "X";
}

function draw() {
  title.textContent = "Draw!";
  pause = true;
}

function checkwinner() {
  for (const [a, b, c] of winbox) {
    if (
      boardgame[a] == player &&
      boardgame[b] == player &&
      boardgame[c] == player
    ) {
      winneris([a, b, c]);
      return true;
    }
  }

  if (boardgame.every((cell) => cell != "")) {
    draw();
    return true;
  }
  return false;
}

function winneris(winner) {
  title.textContent = `${player} Wins!`;
  pause = true;

  winner.forEach((index) => {
    cell[index].style.backgroundColor = "gold";
  });
}

cell.forEach((element, index) => {
  element.addEventListener("click", () => {
    if (element.textContent === "" && !pause) {
      element.textContent = player;
      boardgame[index] = player;
      element.classList.add(player.toLowerCase());
      if (!checkwinner()) {
        changeplayer();
      }
    }
  });
});
