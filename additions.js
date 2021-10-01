let prevRow;
let prevCol;
let p1Power;
let p2Power;
let turnCount = 0;
let p1PowerDir = "";
let p2PowerDir = "";

//returns true if the index is < 7
function isValid(row, col, board){
	
}

function easyShot(){
	
	//use hitBoard() after calculating index
}

function mediumShot(){
	//use hitBoard() after calculating index

}

function hardShot(){
	//use hitBoard() after calculating index

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