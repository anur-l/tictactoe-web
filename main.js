const playerx = document.querySelector("#xplayer");
const playero = document.querySelector("#oplayer");
const cell = document.querySelectorAll(".cell");
const htitel = document.querySelector(".picking");
const restart = document.querySelector(".restart");
let player = "X";
let pause = false;
const boardgame = ["", "", "", "", "", "", "", "", ""];

const winbox = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7,8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function changeplayer() {
  player = player == "X" ? "O" : "X";
}

function draw() {
  htitel.textContent = "Draw!";
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
  htitel.textContent = `${player} Wins!`;
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
restart.addEventListener("click", function() {
  boardgame.fill('');
  
  cell.forEach(c => {
    c.textContent = '';
    c.classList.remove('x', 'o');
    c.style.backgroundColor = '';
  });
  
  pause = false;
  player = 'X';
  htitel.textContent = "Choose"; 
});

playerx.addEventListener("click", () => {
  if (!pause) {
    player = "X";
    playerx.classList.add("active");
    playero.classList.remove("active");
  }
});

playero.addEventListener("click", () => {
  if (!pause ) {
    player = "O";
    playero.classList.add("active");
    playerx.classList.remove("active");
  }
});


