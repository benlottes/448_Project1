let canvas;
let context;
let player = 0;
let row = 9;
let col = 10;
let swapping = 0;
let turnDone = 0;
let setup = 2; //2 if both players still have to setup ships
let numShips = 0;
let board1 = new Array(col); //top left player 1.
for (let i = 0; i < col; i++) {
  board1[i] = new Array(row);
}
let board2 = new Array(col); //top right player 2.
for (let i = 0; i < col; i++) {
  board2[i] = new Array(row);
}
let board3 = new Array(col); //bottom left player 1.
for (let i = 0; i < col; i++) {
  board3[i] = new Array(row);
}
let board4 = new Array(col); //bottom right player 2.
for (let i = 0; i < col; i++) {
  board4[i] = new Array(row);
}

for (let i = 0; i < col; i++) { //i is y coordinate
  for (let j = 0; j < row; j++) { //j is x coordinate
    board1[i][j] = '0'; //I set it to zero to indicate nothing is there
    board3[i][j] = '0';
    board2[i][j] = '0';
    board4[i][j] = '0';
  }
}


document.write('<h1 id = "message" style = "text-align: center"; >Welcome to Battleship! Click the start button below to begin playing.</h1>');



function placeShips() {
  if (numShips == 0) {
    numShips = prompt("How many ships do you want? (1-6)");
  }
  if (numShips == null) { //cancel option
    return;
  }
  numShips = parseFloat(numShips); //convert string to float
  while (!(Number.isInteger(numShips) && numShips <= 6 && numShips >= 1)) { //checks input
    numShips = window.prompt("Please enter an integer value between 1 and 6:");
    if (numShips == null) {
      return;
    }
    numShips = parseFloat(numShips);
  }

  for (let i = 0; i < numShips; i++) {
    let shipLength = i;

    let x = prompt("What is the x coordinate of the first square for you ship?");
    if (x == null) { //cancel option
      return;
    }
    x = parseFloat(x); //convert string to float
    while (!(Number.isInteger(x) && x <= 8 && x >= 0)) { //checks input
      x = window.prompt("Please enter an integer value between 0 and 8:");
      if (x == null) {
        return;
      }
      x = parseFloat(x);
    }

    let y = prompt("What is the y coordinate of the first square for you ship?");
    if (y == null) { //cancel option
      return;
    }
    y = parseFloat(y); //convert string to float
    while (!(Number.isInteger(y) && y <= 9 && y >= 0)) { //checks input
      y = window.prompt("Please enter an integer value between 0 and 9:");
      if (y == null) {
        return;
      }
      y = parseFloat(y);
    }


    let orientation = prompt("What direction do you want your ship to point?  (u, d, r ,l)");
    if (orientation == null) { //cancel option
      return;
    }
    while (orientation != 'u' && orientation != 'd' && orientation != 'r' && orientation != 'l') { //checks input
      orientation = window.prompt("Please enter a direction (u, d, r, l):");
      if (orientation == null) { //cancel option
        return;
      }
    }

    let valid = true;
    let testX = x;
    let testY = y;
    for (let j = 0; j < shipLength + 1; j++) { //making sure placement is valid
      if (testX < 0 || testY < 0 || testX > 8 || testY > 9) {
        valid = false;
        console.log('not valid');
        i -= 1;
        break;
      }
      if ((board3[y][x] != 0 && player == 0) || (board4[y][x] != 0 && player == 1)) {
        valid = false;
        console.log('not valid');
        i -= 1;
        break;
      }
      if (orientation == 'u') {
        testY--;
      } else if (orientation == 'd') {
        testY++;
      } else if (orientation == 'r') {
        testX++;
      } else if (orientation == 'l') {
        testX--;
      }
    }

    if (valid == true) {
      for (let j = 0; j < shipLength + 1; j++) { //placing ships
        if (player == 0) {
          board3[y][x] = 'Ship';
        } else {
          board4[y][x] = "Ship";
        }
        if (orientation == 'u') {
          y--;
        } else if (orientation == 'd') {
          y++;
        } else if (orientation == 'r') {
          x++;
        } else if (orientation == 'l') {
          x--;
        }
      }
      alert('Your ship has been placed.');
      updateLowerBoards();
    }
  }
  document.getElementById("message").innerHTML = "Game in progress...";
  if (document.getElementById("startBtn") != null){
    document.getElementById("startBtn").remove(); //remove start button
  }
  if (setup > 0) {
    turnDone = 1;
  }
  setup--;
}




function boards(p, r, c) { //Currently just has board creating
  for (let i = 0; i < col; i++) { //i is y coordinate
    for (let j = 0; j < row; j++) { //j is x coordinate

      if (player == 0) {
        //board 1
        context.fillStyle = 'White';
        context.beginPath();
        context.arc(j * 40 + 110, i * 40 + 60, 20, 0, 2 * Math.PI); //x=100 y=50
        context.fill();
        //context.closePath();

        //board 3
        context.fillStyle = 'White';
        context.beginPath();
        context.arc(j * 40 + 110, i * 40 + 510, 20, 0, 2 * Math.PI); //x=100 y=500
        context.fill();
        //context.closePath();
      } else {
        //board 2
        context.fillStyle = 'White';
        context.beginPath();
        context.arc(j * 40 + 610, i * 40 + 60, 20, 0, 2 * Math.PI); //x=600 y=50
        context.fill();
        //context.closePath();

        //board 4
        context.fillStyle = 'White';
        context.beginPath();
        context.arc(j * 40 + 610, i * 40 + 510, 20, 0, 2 * Math.PI); //x=600 y=500
        context.fill();
        //context.closePath();

      }
    }
  }
}

function updateLowerBoards() {
  if (player == 0) {
    for (let i = 0; i < col; i++) { //i is y coordinate
      for (let j = 0; j < row; j++) {
        if (board3[i][j] == '0') {
          context.fillStyle = 'White';
          context.beginPath();
          context.arc(j * 40 + 110, i * 40 + 510, 20, 0, 2 * Math.PI); //x=100 y=500
          context.fill();
          //context.closePath();
        } else if (board3[i][j] == 'Ship') {
          context.fillStyle = 'black';
          context.beginPath();
          context.arc(j * 40 + 110, i * 40 + 510, 20, 0, 2 * Math.PI); //x=100 y=500
          context.fill();
          //context.closePath();
        }
      }
    }
  } else {
    for (let i = 0; i < col; i++) { //i is y coordinate
      for (let j = 0; j < row; j++) {
        if (board4[i][j] == '0') {
          context.fillStyle = 'White';
          context.beginPath();
          context.arc(j * 40 + 610, i * 40 + 510, 20, 0, 2 * Math.PI); //x=600 y=500
          context.fill();
          //context.closePath();
        } else if (board4[i][j] == 'Ship') {
          context.fillStyle = 'black';
          context.beginPath();
          context.arc(j * 40 + 610, i * 40 + 510, 20, 0, 2 * Math.PI); //x=600 y=500
          context.fill();
          //context.closePath();
        }
      }
    }
  }
}

function printBoard3() {
  console.log(board3);
}

document.addEventListener("DOMContentLoaded", () => {
  canvas = document.querySelector("#projectCanvas");
  console.log("Got here");
  context = canvas.getContext("2d");
  //console.log(context);
  boards();
  printBoard3();
  document.querySelector("#confirmChangeBtn").style.display = "none";
  document.querySelector("#nextPlayer").style.display = "none";
})

document.addEventListener("click", e => {
  console.log("mouse location:", e.clientX, e.clientY);
  printBoard3();
  console.log(setup);
})

function changeTurn() {
  if (turnDone == 1) {
    if (player == 0) {
      player = 1;
    } else {
      player = 0;
    }
    swapping = 1;
    document.querySelector("#changeTurnBtn").style.display = "none";
    document.querySelector("#confirmChangeBtn").style.display = "initial";
    //canvas.style.display = "none";
    document.querySelector("#nextPlayer").style.display = "initial";
    document.querySelector("#nextPlayer").innerText = "Give the device to Player " + player;
    document.querySelector("#nextPlayer").innerText = "Give the device to Player " + (player + 1);
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function confirmChange() {
  swapping = 0;
  turnDone = 0;
  document.querySelector("#changeTurnBtn").style.display = "initial";
  document.querySelector("#confirmChangeBtn").style.display = "none";
  canvas.style.display = "initial";
  context.clearRect(0, 0, canvas.width, canvas.height);
  boards();
  document.querySelector("#nextPlayer").innerText = "Give the device to Player " + (player + 1);
  document.querySelector("#nextPlayer").style.display = "none";
  setTimeout(function() {
    if (setup > 0) {
      placeShips();
      console.log(setup);
    }
  }, 100)
}





