const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const message = document.querySelector(".message")
const messageTextElement = document.querySelector("[data-winning-message-text]");
const restartButton = document.getElementById("restartButton");
const xScoreBoard = document.querySelector(".xScore")
const circleScoreBoard = document.querySelector(".circleScore")
let xScore = 0;
let circleScore = 0;
let draw = false;
const X_CLASS = "x";
let circleTurn;
const WINNING_COMBINATIONS = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
]
const CIRCLE_CLASS = "circle";
startGame();
updateScoreBoard();
function updateScoreBoard(){
xScoreBoard.innerText = `X's wins: ${xScore}`
circleScoreBoard.innerText = `O's wins: ${circleScore}`
}
function startGame(){
	let circleTurn = false;
	cellElements.forEach(cell=>{
		cell.classList.remove(X_CLASS);
		cell.classList.remove(CIRCLE_CLASS);
		cell.removeEventListener("click",handleClick)
		cell.addEventListener("click",handleClick, {once:true})
	})
	setBoardHoverClass();
	message.classList.remove("show");
}
restartButton.addEventListener("click",startGame)
function handleClick(e){
	const cell = e.target;
	const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
	placeMark(cell,currentClass);
	if(checkWin(currentClass)){
		endGame(false);
	} else if(isDraw()){
		endGame(true);
	} else {

	swapTurn();
	setBoardHoverClass();
	}



}
function endGame(draw){
	if(draw){
		messageTextElement.innerText = "Draw";	
		message.classList.add("show");
	} else {
		messageTextElement.innerText = `${circleTurn ? "O's " : "X's "} wins`;
		circleTurn ? circleScore++ : xScore++;
		updateScoreBoard();
		message.classList.add("show");


	}
}
function isDraw(){
	return [...cellElements].every(cell=>{
		return cell.classList.contains("circle") || cell.classList.contains("x")
	})
}
function checkWin(currentClass){
	return WINNING_COMBINATIONS.some(comination=>{
		return comination.every(index=>{
			return cellElements[index].classList.contains(currentClass)
		})
	});
}
function placeMark(cell,currentClass){
	cell.classList.add(currentClass);
}

function swapTurn(){
	circleTurn = !circleTurn;
}
function setBoardHoverClass(){
	board.classList.remove(X_CLASS);
	board.classList.remove(CIRCLE_CLASS);
	circleTurn 
	? board.classList.add(CIRCLE_CLASS) 
	: board.classList.add(X_CLASS)
}