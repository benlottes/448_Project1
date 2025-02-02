let prevRow;
let prevCol;
let p1Power;
let p2Power;
let turnCount = 0;
let p1PowerDir = "";
let p2PowerDir = "";
let userShips = []
let aiSelect;
let difficulty; // 'easy' 'medium' or 'hard'
let AiRow=1;
let AiCol=1;
let tcol;
let trow;
let hits=0;
let shipNum;

/** 
*aiPlaceships() assist the AI set up process or placing ships on the board.
*This function takes in numShips which tracks the number of ships that require
*random placement. First, this function creates a variable to track orientation. 
*Next, iterating from 0 to numShips, the (x, y) coordinate pair of the head of the 
*ship is randomly generated as well as the orientation. The the next loop iterates 
*from 0 to the ships length in order to check for valid placement. It first ensures
*placement is within bounds of the board. Then, it checks if the placement is on an 
*empty portion of the board. If these checks are passed, the AI will place each ship 
*in a random location and orientation. The function then calls changeTurn() and 
*confirmChage() to continue on with the game.
*Much of the code was repurposed from the original team's code for players to place ships.
*@param numShips paramater to track the number of ships the user wishes to play with
*@return none 
*/ 
function aiPlaceShips(numShips){
	let oriOptions = ['u','d','l','r'];
	for (i = 0; i < numShips; i++) {
		let shipLength = i;
		x = Math.floor(Math.random() * (row)+1);
		y = Math.floor(Math.random() * (col)+1);
		orientation = oriOptions[Math.floor(Math.random() * 4)];
		
		let valid = true;
		let testX = x;
		let testY = y;
		for (let j = 0; j < shipLength + 1; j++) { //making sure placement is valid
		  if (testX < 1 || testY < 1 || testX > 9 || testY > 10) { //*** changed to 1-9 & 1-10
			valid = false;
			i -= 1;
			break;
		  }
		  if (board4[testY - 1][testX - 1] != 0) { //**** Big Change
			valid = false;
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
			board4[y - 1][x - 1] = shipLength + 1;  //***Test, indicates ship at i,j need to change to shiplength
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
		}
	}
	turnDone = 1;
	setup--;
	changeTurn();
	confirmChange();
}

/** 
*storePlayerShips() is a helper function to hardShot(). This function 
*stores every index that contains part of an enemy ship into an array, userShips. 
*This helps hardShot() hit every time becuase the AI can shoot every element in the array
*to sink every ship. After searching the players board for ship objects,
*each location is pushed into the array.
*@param none
*@return none 
*/ 
function storePlayerShips(){
	userShips.length = 0;
	for(let r = 0; r < col; r++){
		for(let c = 0; c < row; c++){
			if(board3[r][c] != 0 && board3[r][c] != 7){
				// store location of each "ship circle" in userShips
				userShips.push([c, r]); 
			}
		}
	}
}

/**
*The easyShot function helps the ai generate a random location on the board and, depending on
*the number of turns the ai is at, it either calls the hitBoard function to shoot at that single 
*location or the orthoShot function to shoot an entire row or column.
*@param none
*@return none
*/
function easyShot(){
	while(true){
		var x = Math.floor(Math.random()* (9));//col
		var y = Math.floor(Math.random()* (10));//row
		
		if(board2[y][x] == 0){
			break;
		}
	}
	if(p2Power == turnCount){
		dir = Math.floor(Math.random() * 2);
		if(dir == 1){
			p2PowerDir = 'row'
		}else{
			p2PowerDir = 'column'
		}
		orthoShot(1, x, y);
		storePlayerShips();
	}else{
		hitBoard(1, x, y);
	}
}

/** 
*mediumShot() takes in no parameters. It assists the AI in 
*playing with medium difficulty, by shooting orthogonally. 
*It hits randomly until it lands at hit on a ship, stores that shipNum,
*and increments hits to 1. After that hit is made, the AI first shoots up, then right,
*then down, then left. When it hits another index of the ship it hit initially(by checking shipNum),
*it moves in that direction, then again checks up, right, down, and left until it 
*hits that ship again. If it does not find the ship, it returns to the inital hit location and 
*continues looking there. If there are no ship indices of the same ship around the inital hit
*it changes dist to 3, and begins checking values 3 indices away, as a powershot must have cut
*the boat in half, it continues to increment dist until it finds the next part of the ship,
*then shoots there and continues normal behavior until that ship has been sunk.
*Powershot is used on the first turn the ai is shooting randomly after its turn for powershot has passed.
*@param none 
*@return none 
*/ 
function mediumShot(){
	//use hitBoard() after calculating index
	
	if(hits==0){
		while(true){
			var x = Math.floor(Math.random()* (9));//col
			var y = Math.floor(Math.random()* (10));//row
			
			if(board2[y][x] == 0){
				break;
			}
		}
		if(p2Power <= turnCount){
			dir = Math.floor(Math.random() * 2);
			if(dir == 1){
				p2PowerDir = 'row'
			}else{
				p2PowerDir = 'column'
			}
			orthoShot(1, x, y);
			storePlayerShips();
			p2Power = 1000000; //disable powershot
		}else{
			shipNum=board3[y][x];//add board Number
			hitBoard(1 ,x, y);
			if(board3[y][x]==7)//add board Number
			{
				hits++;
				AiCol=x;
				AiRow=y;
				trow=AiRow; 
				tcol=AiCol;
				let s = true;
				for(let r = 0; r < col; r++){
					for(let c = 0; c < row; c++){
						if(board3[r][c] == shipNum){
							s = false;
						}
					}
				}
				if(s){
					hits = 0;
				}
			}		
		}
	}
	else
	{		
		let count = 0;
		let dist = 1;
		while(true){
			if(trow-dist>=0 && tcol<9 && board2[trow-dist][tcol] == 0 && ((!(dist > 1) && !(board3[trow-dist][tcol] == shipNum)) || (board3[trow-dist][tcol] == shipNum)))//check up 
			{
				console.log('up');
				if (board3[trow-dist][tcol]==shipNum)
				{
					trow=trow-dist;
					tcol=tcol;
					hitBoard(player,tcol,trow);
					dist = 1;
					count = 0;
					break;
				}
				else if(dist == 1)
				{
					hitBoard(player,tcol,trow-dist);
					break;
				}
			}
			else if(trow<10 && tcol+dist<9 && board2[trow][tcol+dist] == 0 && ((!(dist > 1) && !(board3[trow][tcol+dist] == shipNum)) || (board3[trow][tcol+dist] == shipNum)))//check right
			{
				console.log('right');
				if (board3[trow][tcol+dist]==shipNum)
				{
					trow=trow;
					tcol=tcol+dist;
					hitBoard(player,tcol,trow);
					dist = 1;
					count = 0;
					break;
				}
				else if(dist == 1)
				{
					hitBoard(player,tcol+dist,trow);
					break;
				}
			}
			else if(trow+dist<10 && tcol<9 && board2[trow+dist][tcol] == 0 && ((!(dist > 1) && !(board3[trow+dist][tcol] == shipNum)) || (board3[trow+dist][tcol] == shipNum)))//check down
			{
				console.log('down');
				if (board3[trow+dist][tcol]==shipNum)
				{
					trow=trow+dist;
					tcol=tcol;
					hitBoard(player,tcol,trow);
					dist = 1;
					count = 0;
					break;
				}
				else if(dist == 1)
				{
					hitBoard(player,tcol,trow+dist);
					break;
				}
			}
			else if(trow<10 && tcol-dist>=0 && board2[trow][tcol-dist] == 0 && ((!(dist > 1) && !(board3[trow][tcol-dist] == shipNum)) || (board3[trow][tcol-dist] == shipNum)))//check left
			{
				console.log('left');
				if (board3[trow][tcol-dist]==shipNum)
				{
					trow=trow;
					tcol=tcol-dist;
					hitBoard(player,tcol,trow);
					dist = 1;
					count = 0;
					break;
				}
				else if(dist == 1)
				{
					hitBoard(player,tcol-dist,trow);
					break;
				}
			}
			else
			{
				if(count == 0){
					trow=AiRow;
					tcol=AiCol;
				}
				count++;
				if(count > 1){
					if(dist >= 2){
						dist++;
					}
					else{
						dist = 2;
					}
				}
				continue;
			}
		}
		let s = true;
		for(let r = 0; r < col; r++){
			for(let c = 0; c < row; c++){
				if(board3[r][c] == shipNum){
					s = false;
				}
			}
		}
		if(s){
			hits = 0;
		}
	}
}

/**
*The hardShot function helps the ai pick from tha userShips array the location of one of the 
*player's ships that has not been shot yet and either calls the hitBoard function to shoot at 
*that single location or the orthoShot function to shoot an entire row or column.
*@param none
*@return none
*/
function hardShot(){
	let [x,y] = userShips.pop();
	if(p2Power == turnCount){
		dir = Math.floor(Math.random() * 2);
		if(dir == 1){
			p2PowerDir = 'row'
		}else{
			p2PowerDir = 'column'
		}
		orthoShot(1, x, y);
		storePlayerShips();
	}else{
		hitBoard(1, x, y);
	}
}

/** 
*orthoShot() powers up the shot the player gets to use by hitting an entire row
*or column. This function takes in player number, column number and row number.
*First, it checks if player one is up, then determines if the player wants to 
*hit an entire row or an entire column. Once the players option is considered, 
*they are free to select any row or column. This process will be repeated for
*player 2's power shot. 
*@param player paramater to track which player is currently shooting
*@param c parameter to track which column the player wishes to hit
*@param r parameter to track which row the player wishes to hit
*@return none 
*/
function orthoShot(player, c, r){
	if(player == 0){
		if(p1PowerDir == 'row'){
			for(let i = 0; i < row; i++){
				hitBoard(player, i, r)
			}
		}else{
			for(let i = 0; i < col; i++){
				hitBoard(player, c, i)
			}
		}
	}else{
		if(p2PowerDir == 'row'){
			for(let i = 0; i < row; i++){
				hitBoard(player, i, r)
			}
		}else{
			for(let i = 0; i < col; i++){
				hitBoard(player, c, i)
			}
		}
	}
}

/** 
*calculateRandomTurn() is a helper function for orthoShot(). This 
*function ensures that the power shot is provided to the player within 
*the first few turns. This ensures that the user still gets the 
*functionality on a shorter game. This function takes in numShips to 
*determine how quickly to provide a power shot.
*@param numShips parameter to track the number of ships the user selected 
*@return none 
*/
function calculateRandomTurn(numShips){
	do{
		p1Power = Math.floor(Math.random() * (numShips*2)+1);
	}while(p1Power % 2 == 0);
	do{
		p2Power = Math.floor(Math.random() * (numShips*2)+1);
	}while(p2Power % 2 != 0);
}

/** 
*aiTurn() is called when its the AI's turn to shoot. 
*The variable difficulty is selected by the user, and aiTurn
*calls the corresponding AI function. After the shot is complete, 
*the function changes turns back to the player.
*@param none
*@return none 
*/
function aiTurn(){
	if(turnCount > 0){
		if(difficulty == 'easy'){
			easyShot();
		}else if(difficulty == 'medium'){
			mediumShot();
		}else if(difficulty == 'hard'){
			hardShot();
		}
		turnDone = 1;
		changeTurn();
		confirmChange();
	}
}