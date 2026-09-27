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
    loadImages();
}


function loadImages(){
    wallImage = new Image();
    wallImage.src = "./Images/Wall.png";

    blueGhostImage = new Image();
    blueGhostImage.src = "./Images/blueghost.webp";
    pinkGhostImage = new Image();
    pinkGhostImage.src = "./Images/pink ghost.jpg";
    orangeGhostImage = new Image();
    orangeGhostImage.src = "./Images/Orange_Ghost.png";
    redGhostImage = new Image();
    redGhostImage.src = "./Images/Red_Ghost.png";

    pacmanUpImage = new Image();
    pacmanUpImage.src = "./Images/pacup.jpg";
    pacmanDownImage = new Image();
    pacmanDownImage.src = "./Images/pacleft.jpg";
    pacmanRightImage = new Image();
    pacmanRightImage.src = "./Images/pacright.jpg";
    pacmanLeftImage = new Image();
    pacmanLeftImage.src = "./Images/pacleft.jpg";
}