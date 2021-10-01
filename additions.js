let prevRow;
let prevCol;
let p1Power;
let p2Power;
let turnCount = 0;
let p1PowerDir = "";
let p2PowerDir = "";
let userShips = []

// helper function for hardShot
function storePlayerShips(){
	for(let r = 0; r < col; r++){
		for(let c = 0; c < row; c++){
			if(board3[r][c] != 0){
				// store location of each "ship circle" in userShips
				userShips.push([r, c]); 
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

function calculateRandomTurn(numShips){
	do{
		p1Power = Math.floor(Math.random() * (numShips*2)+1);
	}while(p1Power % 2 == 0);
	do{
		p2Power = Math.floor(Math.random() * (numShips*2)+1);
	}while(p2Power % 2 != 0);
}