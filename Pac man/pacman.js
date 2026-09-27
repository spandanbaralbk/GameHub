//board
let board;
const rowCount = 21;
const columnCount = 19;
const tileSize = 29;
const boardWidth = columnCount* tileSize;
const boardHeight = rowCount * tileSize;
let context;

//images
let blueGhostImage;
let orangeGhostImage;
let pinkGhostImage;
let redGhostImage;
let pacmanUpImage;
let pacmanDownImage;
let pacmanLeftImage;
let pacmanRightImage;
let wallImage;

window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board
}


function loadImages(){
    wallImage = new Image();
    wallImage.src = "";
}