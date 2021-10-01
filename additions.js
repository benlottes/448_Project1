let prevRow;
let prevCol;
let p1Power;
let p2Power;
let turnCount = 0;
let p1PowerDir = "";
let p2PowerDir = "";
let userShips = []

// helper function for hardShot
if(shipsPlaced){
	for(let rows = 0; rows < 9; rows++){
		for(let cols = 0; cols < 10; cols++){
			if(board3[rows][cols] != 0){
				// store location of each "ship circle" in userShips
				userShips.push([rows, cols]); 
			}
		}
	}
}

//returns true if the index is < 7
function isValid(row, col, board){
	
}

function easyShot(){
	//use hitBoard() after calculating index
}

function mediumShot(){
	//use hitBoard() after calculating index

}

/* when hardshot is called in the main game, might have to pass in some variable 
that updates(starting with 0) with each hit (everytime hardshot is called). This 
is how the function keeps track of which location in userShips to hit next */
function hardShot(hitCounter){
	hitboard(player, shipsPlaced[hitCounter][1], shipsPlaced[hitCounter][0]);
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
		p1Power = Math.floor(Math.random() * (numShips*2-1)+1);
	}while(p1Power % 2 == 0);
	do{
		p2Power = Math.floor(Math.random() * (numShips*2-1)+1);
	}while(p2Power % 2 != 0);
}