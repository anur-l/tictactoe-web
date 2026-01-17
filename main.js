const playerx = document.querySelector("#xplayer");
const playero = document.querySelector("#oplayer");
const htitel = document.querySelector(".picking");
const theme = document.querySelector(".mode");
const cell = document.querySelectorAll(".cell");
const restart = document.querySelector(".restart");
let modecol = false;
let player = "X";
let pause = false;
const boardgame = ["", "", "", "", "", "", "", "", ""];

const winbox = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
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
  boardgame.fill("");

  cell.forEach((c) => {
    c.textContent = "";
    c.classList.remove("x", "o");
    c.style.backgroundColor = "";
    if (modecol == false) {
      light();
    } else {
      dark();
    }
  });

  pause = false;
  player = "X";
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
  if (!pause) {
    player = "O";
    playero.classList.add("active");
    playerx.classList.remove("active");
  }
});

function dark() {
  document.body.style.background = "#1a202c";
  document.body.style.color = "white";
  document.querySelector(".box").style.background = "#2d3748";
  document.querySelector("h1").style.color = "white";
  document.querySelector(".picking").style.color = "#cbd5e0";
  document.querySelector(".board").style.background = "transparent";

   document.querySelectorAll(".cell").forEach((c) => {
    if (c.style.backgroundColor !== "gold") {
      c.style.background = "#4a5568";
    }
  });

  theme.textContent = "Light";
}

function light() {
  document.body.style.background = "#e1faf1";
  document.body.style.color = "#2d3748";
  document.querySelector(".box").style.background = "white";
  document.querySelector("h1").style.color = "#2d3748";
  document.querySelector(".picking").style.color = "#333";
  document.querySelector(".board").style.background = "#f8fafc";

  document.querySelectorAll(".cell").forEach((c) => {
    if (c.style.backgroundColor !== "gold") {
      c.style.background = "#edf2f7";
    }
  });
  

  theme.textContent = "Dark";
}

theme.addEventListener("click", () => {
  modecol = !modecol;
  if (modecol) {
    dark();
  } else {
    light();
  }
});
