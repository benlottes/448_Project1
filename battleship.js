let canvas;
let context;
let player = 0;
let row = 9;
let col = 10;
let swapping = 0;
let turnDone = 0;
let setup = 2; //2 if both players still have to setup ships
let numShips = 0;
let numShips1 = 0; //**
let numShips2 = 0; //**
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
    board1[i][j] = 0; //**I set it to zero to indicate nothing is there **
    board3[i][j] = 0;
    board2[i][j] = 0;
    board4[i][j] = 0;
  }
}


document.write('<h1 id = "message" style = "text-align: center"; >Welcome to Battleship! Click the start button below to begin playing.</h1>');


function boards(p, r, c) { //Currently just has board creating
  let yRange = 'ABCDEFGHIJ';
  for (let i = 0; i < col; i++) { //i is y coordinate
    for (let j = 0; j < row; j++) { //j is x coordinate
      if (player == 0) {
        //board 1
        context.fillStyle = 'White';
        context.beginPath();
        context.arc(j * 40 + 60, i * 40 + 160, 20, 0, 2 * Math.PI); //***x=40 y=140
        context.fill();
        context.strokeText(yRange[i], 30, i * 40 + 160);
        context.strokeText(j + 1, j * 40 + 55, 133);
        //context.closePath();

        //board 3
        context.fillStyle = 'White';
        context.beginPath();
        context.arc(j * 40 + 60, i * 40 + 610, 20, 0, 2 * Math.PI); //***x=40 y=590
        context.fill();
        context.strokeText(yRange[i], 30, i * 40 + 610);
        context.strokeText(j + 1, j * 40 + 55, 583);
        //context.closePath();

      } else {
        //board 2
        context.fillStyle = 'White';
        context.beginPath();
        context.arc(j * 40 + 710, i * 40 + 160, 20, 0, 2 * Math.PI); //***x=690 y=590
        context.fill();
        context.strokeText(yRange[i], 680, i * 40 + 160);
        context.strokeText(j + 1, j * 40 + 705, 133);
        //context.closePath();

        //board 4
        context.fillStyle = 'White';
        context.beginPath();
        context.arc(j * 40 + 710, i * 40 + 610, 20, 0, 2 * Math.PI); //***x=690 y=590
        context.fill();
        context.strokeText(yRange[i], 680, i * 40 + 610);
        context.strokeText(j + 1, j * 40 + 705, 583);

        //context.closePath();
      }
    }
  }
}

/**
* Allows users to place ships at start of game
*Pre - none, Post - None
*/
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
  if(setup == 2){
	  let numPlayers;
	  while(numPlayers != '1' && numPlayers != '2'){
		  numPlayers = window.prompt("How many players, '1' or '2'?");
	  }
	  if(numPlayers == '1'){
		  while(difficulty != 'easy' && difficulty != 'medium' && difficulty != 'hard'){
			difficulty = window.prompt("What difficulty, 'easy' 'medium' or 'hard'?");
		  }
		  aiSelect = true;
	  }else {
		  aiSelect = false;
	  }
  }
  
  calculateRandomTurn(numShips);
  
  numShips1 = numShips; //**
  numShips2 = numShips; //**

  for (let i = 0; i < numShips; i++) {
    let shipLength = i;

    let x = prompt("What is the x coordinate of the first square for you ship?");
    if (x == null) { //cancel option
      return;
    }
    x = parseFloat(x); //convert string to float
    while (!(Number.isInteger(x) && x <= 9 && x >= 1)) { //*** 1-9, checks input
      x = window.prompt("Please enter an integer value between 1 and 9:"); //***
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
    while (!(Number.isInteger(y) && y <= 10 && y >= 1)) { //*** 1-10, checks input
      y = window.prompt("Please enter an integer value between 1 and 10:"); //***
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
      if (testX < 1 || testY < 1 || testX > 9 || testY > 10) { //*** changed to 1-9 & 1-10
        valid = false;
        console.log('not valid');
        i -= 1;
        break;
      }
      if ((board3[testY - 1][testX - 1] != 0 && player == 0) || (board4[testY - 1][testX - 1] != 0 && player == 1)) { //**** Big Change
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
      for (let j = 0; j < shipLength + 1; j++) {
        if (player == 0) {
          board3[y - 1][x - 1] = shipLength + 1;  //***shipLength, indicates ship at i,j need to change to shiplength
        } else {
          board4[y - 1][x - 1] = shipLength + 1;  //***Test, indicates ship at i,j need to change to shiplength
        }
        console.log(x - 1, y - 1) // actual array position
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
      sunkShips();
    }
  }
  document.getElementById("message").innerHTML = "Game in progress...";
  
  if (document.getElementById("startBtn") != null) {
    document.getElementById("startBtn").remove(); //remove start button
  }
  if (setup > 0) {
    turnDone = 1;
  }
  setup--;
  storePlayerShips();
  //changeTurn();
}

/**
* Updates boards 3 and 4
* Pre - none, Post - none
*/
function updateLowerBoards() {
  if (player == 0) {
    for (let i = 0; i < col; i++) { //i is y coordinate
      for (let j = 0; j < row; j++) {
        if (board3[i][j] == 0) { //*checks if # 0
          context.fillStyle = 'White';
          context.beginPath();
          context.arc(j * 40 + 60, i * 40 + 610, 20, 0, 2 * Math.PI); //***x=40 y=590
          context.fill();
          //context.closePath();  
        }
        if (board3[i][j] != 0 && board3[i][j] != 7) { //**changed to check if number other than 0 **
          context.fillStyle = 'black';
          context.beginPath();
          context.arc(j * 40 + 60, i * 40 + 610, 20, 0, 2 * Math.PI); //***x=40 y=590
          context.fill();
          //context.closePath();
        }
        if (board3[i][j] == 7) { //leaves the past hits on the board after switching event
          context.fillStyle = 'red';
          context.beginPath();
          context.arc(j * 40 + 60, i * 40 + 610, 20, 0, 2 * Math.PI); //***x=40 y=590
          context.fill();
          //context.closePath();
        }
        if (board1[i][j] == 1) { //leaves the marked areas that were previously missed
          context.fillStyle = 'Grey';
          context.beginPath();
          context.arc(j * 40 + 60, i * 40 + 160, 20, 0, 2 * Math.PI); //***x=40 y=140
          context.fill();
        }
        if (board1[i][j] == 2) { //leaves the past hits on the board after switching event
          context.fillStyle = 'red';
          context.beginPath();
          context.arc(j * 40 + 60, i * 40 + 160, 20, 0, 2 * Math.PI); //***x=40 y=140
          context.fill();
        }
      }
    }
  }
  if (player == 1) {
    for (let i = 0; i < col; i++) { //i is y coordinate
      for (let j = 0; j < row; j++) {
        if (board4[i][j] == 0) { //*checks if # 0
          context.fillStyle = 'White';
          context.beginPath();
          context.arc(j * 40 + 710, i * 40 + 610, 20, 0, 2 * Math.PI); //***x=690 y=590
          context.fill();
          //context.closePath();
        }
        if (board4[i][j] != 0 && board4[i][j] != 7) { //**changed to check if number other than 0 or 7
          context.fillStyle = 'black';
          context.beginPath();
          context.arc(j * 40 + 710, i * 40 + 610, 20, 0, 2 * Math.PI); //***x=690 y=590
          context.fill();
          //context.closePath();
        }
        if (board4[i][j] == 7) { //leaves the past hits on the board after switching event
          context.fillStyle = 'red';
          context.beginPath();
          context.arc(j * 40 + 710, i * 40 + 610, 20, 0, 2 * Math.PI); //***x=690 y=590
          context.fill();
          //context.closePath();
        }
        if (board2[i][j] == 1) { //leaves the marked areas that were previously missed
          context.fillStyle = 'Grey';
          context.beginPath();
          context.arc(j * 40 + 710, i * 40 + 160, 20, 0, 2 * Math.PI); //***x=690 y=140
          context.fill();
        }
        if (board2[i][j] == 2) {//leaves the past hits on the board after switching event
          context.fillStyle = 'Red';
          context.beginPath();
          context.arc(j * 40 + 710, i * 40 + 160, 20, 0, 2 * Math.PI); //***x=690 y=140
          context.fill();
        }
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  canvas = document.querySelector("#projectCanvas");
  console.log("Got here");
  context = canvas.getContext("2d");
  //console.log(context);
  boards();
  document.querySelector("#confirmChangeBtn").style.display = "none";
  document.querySelector("#nextPlayer").style.display = "none";
})


function rounded1(x) { return (Math.ceil((x) / 40) - 1) }

document.addEventListener("click", e => {
  if (player == 0) {
    const [i, j] = [e.x - 40, e.y - 140].map(rounded1);
    if (i < 0 || i > 8) return; //**9
    if (j < 0 || j > 9) return; //**8
    console.log(i, j);
    console.log("mouse location:", e.clientX, e.clientY);
	if(p1Power != turnCount){
		hitBoard(0, i, j);
	}else{
		orthoShot(0, i, j);
	}
  }

  if (player == 1) {
    const [i, j] = [e.x - 690, e.y - 140].map(rounded1);
    if (i < 0 || i > 8) return;//**9
    if (j < 0 || j > 9) return;//**8
    console.log(i, j);
    console.log("mouse location:", e.clientX, e.clientY);
	if(p2Power != turnCount){
		hitBoard(1, i, j);
	}else{
		orthoShot(1, i, j);
	}
  }
  turnDone = 1;
  console.log(setup);
})

/**
*
*Switches to the screen where players will swap the device
*Pre - none, Post - None
*/
function changeTurn() {
  if (turnDone == 1) {
    if (player == 0) {
      player = 1;
    } else {
      player = 0;
    }
    console.log(player);
    swapping = 1;
    document.querySelector("#changeTurnBtn").style.display = "none";
    document.querySelector("#confirmChangeBtn").style.display = "initial";
    //canvas.style.display = "none";
    document.querySelector("#nextPlayer").style.display = "initial";
    document.querySelector("#nextPlayer").innerText = "Give the device to Player " + player;
    document.querySelector("#nextPlayer").innerText = "Give the device to Player " + (player + 1);
    context.clearRect(0, 0, canvas.width, canvas.height);
    //confirmChange();
	
  }
}

/**
*
*Finishes the turn change, redisplaying the board for the other player
*Pre - none, Post - None
*/
function confirmChange() {
  swapping = 0;
  turnDone = 0;
  document.querySelector("#changeTurnBtn").style.display = "initial";
  document.querySelector("#confirmChangeBtn").style.display = "none";
  canvas.style.display = "initial";
  context.clearRect(0, 0, canvas.width, canvas.height);
  boards();
  updateLowerBoards();
  document.querySelector("#nextPlayer").innerText = "Give the device to Player " + (player + 1);
  document.querySelector("#nextPlayer").style.display = "none";

  if(setup == 0){
	  turnCount++
	  if(aiSelect == true && turnCount % 2 == 0){
	    aiTurn();
	  }

	  if(player == 0 && turnCount == p1Power){
		  	  console.log(p1PowerDir);
		  while(p1PowerDir != "row" && p1PowerDir != "column"){
			  p1PowerDir = window.prompt("You got your power shot! Please input either 'row' or 'column' for your shot.", "");
			  console.log(p1PowerDir);
		  }
	  } else if (player == 1 && turnCount == p2Power && aiSelect == false){
		  while(p2PowerDir != 'row' && p2PowerDir != 'column'){
			  p2PowerDir = prompt("You got your power shot! Please input either 'row' or 'column' for your shot. Then select a cell.", "");
		  }
	  }
	}
  if(aiSelect == false){
	if (setup > 0) {
	  placeShips();
	}
  }else if(setup == 1){
	  aiPlaceShips(numShips);
  }
}

//hit or miss 
function hitBoard(player, x, y) {
  sunkShips();
  let click = 0;
  let count = 0;
  if (player == 0 && turnDone == 0) {
    if (board4[y][x] != 0) { //player2 board4 change color
      context.fillStyle = 'Red';
      context.beginPath();
      context.arc(x * 40 + 710, y * 40 + 610, 20, 0, 2 * Math.PI); //**x=850 y=600
      context.fill();

      let shipL = board4[y][x];
      board1[y][x] = 2;
      board4[y][x] = 7;


      context.fillStyle = 'Red'; //player1 board1 change color
      context.beginPath();
      context.arc(x * 40 + 60, y * 40 + 160, 20, 0, 2 * Math.PI); //***x=200 y=150
      context.fill();

      for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
          if (board4[i][j] == shipL) { 
			count++; //counts number of remaining indices of a specific size ship, if there are none, it is sunk
			}	
        }
      }
      if (count == 0) {
        numShips2--;
        if (numShips2 == 0) {
          window.alert("Game over: Player1 is the winner!");
          location.reload();
        }
        sunkShips();
      }
    }
    else { //if miss board1 is grey
      board1[y][x] = 1;
      context.fillStyle = 'Grey';
      context.beginPath();
      context.arc(x * 40 + 60, y * 40 + 160, 20, 0, 2 * Math.PI); //***x=200 y=150
      context.fill();
    }
  }
  if (player == 1 && turnDone == 0) {
    if (board3[y][x] != 0 && board3[y][x] != 7) { //player1 board3 change color
      context.fillStyle = 'Red';
      context.beginPath();
      context.arc(x * 40 + 60, y * 40 + 610, 20, 0, 2 * Math.PI); //***x=200 y=600
      context.fill();

      let shipL = board3[y][x];
      board2[y][x] = 2;
      board3[y][x] = 7;

      context.fillStyle = 'Red'; //player2 board2 change color
      context.beginPath();
      context.arc(x * 40 + 710, y * 40 + 160, 20, 0, 2 * Math.PI); //***x=850 y=150
      context.fill();

      for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
          if (board3[i][j] == shipL) { count++; }
        }
      }
      if (count == 0) {
        numShips1--; 
        if (numShips1 == 0) {
          window.alert("Game over: Player2 is the winner!");
          location.reload();
        }
        sunkShips();
      }
    }
    else { //if miss board2 is grey
      board2[y][x] = 1;
      context.fillStyle = 'Grey';
      context.beginPath();
      context.arc(x * 40 + 710, y * 40 + 160, 20, 0, 2 * Math.PI); //***x=850 y=150
      context.fill();
    }
  }
  sunkShips();
  console.log(player);
  if (click > 0) {
	console.log("IT DID SOMETHING");
	currentTurn++;
    changeTurn();
    return;
  }
}

//redraws the the area that displays the total number of ships and ships left per player
function sunkShips() {
  context.fillStyle = 'White';
  context.fillRect(50, 10, 250, 80);
  context.strokeText("Total number of ships: ", 60, 30);
  context.strokeText("Number of ships left: ", 60, 70);
  context.fillRect(700, 10, 250, 80);
  context.strokeText("Total number of ships: ", 710, 30);
  context.strokeText("Number of ships left: ", 710, 70);
  context.strokeText(numShips, 175, 30);
  context.strokeText(numShips, 825, 30);
  context.strokeText(numShips1, 170, 70);
  context.strokeText(numShips2, 820, 70);
}




