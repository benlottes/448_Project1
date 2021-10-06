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

// helper function for hardShot
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

function easyShot(){
	//use hitBoard() after calculating index
	var x = Math.floor(Math.random()* (8) + 1);//col
	var y = Math.floor(Math.random()* (9) + 1);//row
	hitBoard(1 ,x, y);
}

function mediumShot(){
	//use hitBoard() after calculating index
	
	if(hits==0){
		var x = Math.floor(Math.random()* (8) + 1);//col
		var y = Math.floor(Math.random()* (9) + 1);//row
		shipNum=board3[y][x];//add board Number
		hitBoard(1 ,x, y);
		if(board3[y][x]==7)//add board Number
		{
			hits++;
			AiCol=x;
			AiRow=y;
			trow=AiRow; 
			tcol=AiCol;
		}
	}
	else
	{		
		while(true){
			if(trow-1>=0&&tcol<9&&board2[trow-1][tcol] == 0)//check up 
			{
				if (board3[trow-1][tcol]==shipNum)
				{
					trow=trow-1;
					tcol=tcol;
					hitBoard(player,tcol,trow);
				}
				else 
				{
					hitBoard(player,tcol,trow-1);

				}
				break;
			}
			else if(trow<10&&tcol+1<9&&board2[trow][tcol+1] == 0)//check right
			{
				if (board3[trow][tcol+1]==shipNum)
				{
					trow=trow;
					tcol=tcol+1;
					hitBoard(player,tcol,trow);
				}
				else 
				{
					hitBoard(player,tcol+1,trow);
				}
				break;
			}
			else if(trow+1<10&&tcol<9&&board2[trow+1][tcol] == 0)//check down
			{
				if (board3[trow+1][tcol]==shipNum)
				{
					trow=trow+1;
					tcol=tcol;
					hitBoard(player,tcol,trow);
				}
				else 
				{
					hitBoard(player,tcol,trow+1);
				}
				break;
			}
			else if(trow<10&&tcol-1<9&&board2[trow][tcol-1] == 0)//check left
			{
				if (board3[trow][tcol-1]==shipNum)
				{
					trow=trow;
					tcol=tcol-1;
					hitBoard(player,tcol,trow);
				}
				else 
				{
					hitBoard(player,tcol-1,trow);
				}
				break;
			}
			else
			{
				trow=AiRow;
				tcol=AiCol;
				continue;
			}
			let s = true;
			for(let r = 0; r < col; r++){
				for(let c = 0; c < row; c++){
					if(board3[r][c] == shipNum){
						s = false;//this is supposed to set hits to zero if the ship is sunk, but i dont think it works
					}
				}
			}
			if(!s)
				hits = 0;
		}
	}
}


/* when hardshot is called in the main game, might have to pass in some variable 
that updates(starting with 0) with each hit (everytime hardshot is called). This 
is how the function keeps track of which location in userShips to hit next */
function hardShot(hitCounter){
	let [r,c] = userShips.pop();
	hitboard(0, r, c);
}

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


/* when hardshot is called in the main game, might have to pass in some variable 
that updates(starting with 0) with each hit (everytime hardshot is called). This 
is how the function keeps track of which location in userShips to hit next */
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

function calculateRandomTurn(numShips){
	do{
		p1Power = Math.floor(Math.random() * (numShips*2)+1);
	}while(p1Power % 2 == 0);
	do{
		p2Power = Math.floor(Math.random() * (numShips*2)+1);
	}while(p2Power % 2 != 0);
}

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