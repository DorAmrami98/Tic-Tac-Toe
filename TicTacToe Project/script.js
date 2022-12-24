// true = x
let turn = true;

let square = document.querySelectorAll(".square");

let counter = 0;

//for each square cell, when you click on it, it marks X OR O
square.forEach((s) => {
  s.addEventListener("click", Game);
});


function Game() {

  stopTimer();
  startTimer();

  //if square is not empty then continue to the next square
  if (this.textContent != " ") return;

  counter++;

  // start with X
  if (turn) this.textContent = "X";
  // if not X then O
  else this.textContent = "O";

  // after every turn, changes state (X OR O)
  turn = !turn;

  // Check If Win/Tie (calls the function)
  let gameplay = winner_conditions();

  // if win, mark the winner's path red
  if (gameplay.win) {
    stopTimer();
    let square = document.querySelectorAll(".square");
    square[gameplay.position[0]].style.color = "red";
    square[gameplay.position[1]].style.color = "red";
    square[gameplay.position[2]].style.color = "red";

    // then, write who won
    document.getElementById("massage").innerHTML =
      `${this.textContent}` + " WON !!";

    // when you click on the new game button it restarts the game
    square.forEach((s) => {
      s.removeEventListener("click", Game);
    });

    // calls to new game button and when click, restarts the game
    document.getElementById("new-game").setAttribute("onClick", "NewGame()");

    // IF DRAW
  } else if (gameplay.Tie) {
    stopTimer();

    // write DRAW and when click, restart the game
    document.getElementById("massage").innerHTML = "DRAW";
    square.forEach((s) => {
      s.removeEventListener("click", Game);
    });
    document.getElementById("new-game").setAttribute("onClick", "NewGame()");
  }

  turn != turn;

}

// new game function that resets the game board and called by the button
function NewGame() {
  let square = document.querySelectorAll(".square");
  turn = !turn;
  counter = 0;
  square.forEach((s) => {
    s.textContent = " ";
    s.style.color = "";
  });

  document.getElementById("massage").innerHTML = " ";
  square.forEach((s) => {
    s.addEventListener("click", Game);
  });
}

// All The Game Conditions
function winner_conditions() {
  let square = document.querySelectorAll(".square");
  let gameplay = { win: false, Tie: false, position: [] };

  // First Row
  if (
    square[0].textContent == square[1].textContent &&
    square[1].textContent == square[2].textContent &&
    square[2].textContent != " "
  )
    gameplay = { win: true, Tie: false, position: [0, 1, 2] };
  //  Second Row
  else if (
    square[3].textContent == square[4].textContent &&
    square[4].textContent == square[5].textContent &&
    square[5].textContent != " "
  )
    gameplay = { win: true, Tie: false, position: [3, 4, 5] };
  // Third Row
  else if (
    square[6].textContent == square[7].textContent &&
    square[7].textContent == square[8].textContent &&
    square[8].textContent != " "
  )
    gameplay = { win: true, Tie: false, position: [6, 7, 8] };
  // First Column
  else if (
    square[0].textContent == square[3].textContent &&
    square[3].textContent == square[6].textContent &&
    square[6].textContent != " "
  )
    gameplay = { win: true, Tie: false, position: [0, 3, 6] };
  // Second Column
  else if (
    square[1].textContent == square[4].textContent &&
    square[4].textContent == square[7].textContent &&
    square[7].textContent != " "
  )
    gameplay = { win: true, Tie: false, position: [1, 4, 7] };
  // Third Column
  else if (
    square[2].textContent == square[5].textContent &&
    square[5].textContent == square[8].textContent &&
    square[8].textContent != " "
  )
    gameplay = { win: true, Tie: false, position: [2, 5, 8] };
  // First Diagonal
  else if (
    square[0].textContent == square[4].textContent &&
    square[4].textContent == square[8].textContent &&
    square[8].textContent != " "
  )
    gameplay = { win: true, Tie: false, position: [0, 4, 8] };
  // Second Diagonal
  else if (
    square[2].textContent == square[4].textContent &&
    square[4].textContent == square[6].textContent &&
    square[6].textContent != " "
  )
    gameplay = { win: true, Tie: false, position: [2, 4, 6] };
  else if (counter == 9) gameplay.Tie = true;

  return gameplay;
}

// =======-TIMER-=======//
let seconds = 30;
let timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    console.log(seconds);
    seconds--;
    updateTimer();

    if (seconds === 0) {
      clearInterval(timerInterval);
      console.log("Time's up!");

      // When times up, prints lose
      let square = document.querySelectorAll(".square");
      console.log(turn);

      document.getElementById("massage").innerHTML = `${
        turn ? "X" : "O"
      } LOSES!!`;

      // locks the board
      square.forEach((s) => {
        s.removeEventListener("click", Game);
      });
      document.getElementById("new-game").setAttribute("onClick", "NewGame()");
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  seconds = 30; 
}

// When a player makes a move, stop the timer and start a new one for the next player
document.getElementById("board").addEventListener("click", () => {
  stopTimer();
  startTimer();
});

function updateTimer() {
  const timerElement = document.getElementById("timer");
  timerElement.textContent = seconds;
}

