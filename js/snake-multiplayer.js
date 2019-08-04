const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/bg.png";

let box = 12;

let snake1 = [];
snake1[0] = {
	x: 42 * box,
	y: 43 * box
};

let snake2 = [];
snake2[0] = {
	x: 7 * box,
	y: 8 * box
};

let food;
newFood();

function newFood() {
	food = {
		x: (Math.floor(Math.random() * (47 - 2 + 1)) + 2) * box,
		y: (Math.floor(Math.random() * (47 - 4 + 1)) + 4) * box,
	};

	fieldCheck(snake1);
	fieldCheck(snake2);
}

function fieldCheck(arr) {
	for(let i = 0; i < arr.length; i++) {
		if(food.x === arr[i].x && food.y === arr[i].y)
			newFood(arr);
	}
}

document.addEventListener("keydown", direction);

let dir1;
let dir2;
let dir1Handler = true;
let dir2Handler = true;

function direction(event) {
	if(dir1Handler === true) {
		if(event.keyCode === 37 && dir1 !== "right")
			dir1 = "left";
		else if(event.keyCode === 38 && dir1 !== "down")
			dir1 = "up";
		else if(event.keyCode === 39 && dir1 !== "left")
			dir1 = "right";
		else if(event.keyCode === 40 && dir1 !== "up")
			dir1 = "down";
	}

	if(dir2Handler === true) {
		if(event.keyCode === 65 && dir2 !== "right")
			dir2 = "left";
		else if(event.keyCode === 87 && dir2 !== "down")
			dir2 = "up";
		else if(event.keyCode === 68 && dir2 !== "left")
			dir2 = "right";
		else if(event.keyCode === 83 && dir2 !== "up")
			dir2 = "down";
	}
}

function drawSnake(arr, headColor, tailColor) {
	for(let i = 0; i < arr.length; i++) {
		if(i === 0)
			ctx.fillStyle = headColor;
		else
			ctx.fillStyle = tailColor;

		ctx.fillRect(arr[i].x, arr[i].y, box, box);
	}
}

function addSnakeHead(arr, dir) {
	let snakeX = arr[0].x;
	let snakeY = arr[0].y;

	if(dir === "left") snakeX -= box;
	if(dir === "right") snakeX += box;
	if(dir === "up") snakeY -= box;
	if(dir === "down") snakeY += box;

	if(snakeX < box * 2)
		snakeX = box * 47;
	else if(snakeX > box * 47)
		snakeX = box * 2;
	else if(snakeY < 4 * box)
		snakeY = box * 47;
	else if(snakeY > box * 47)
		snakeY = box * 4;

	let newHead = {
		x: snakeX,
		y: snakeY
	};

	arr.unshift(newHead);
}

function snakeTailCrushStatus(arr) {
	for(let i = 1; i < arr.length; i++) {
		if(arr[0].x === arr[i].x && arr[0].y === arr[i].y)
			arr.splice(i, arr.length);
	}
}

function gameStatus() {
	let statusKickSnake1 = false;
	let statusKickSnake2 = false;

	snakeTailCrushStatus(snake1);
	snakeTailCrushStatus(snake2);

	for(let i = 0; i < snake2.length; i++) {
		if(snake1[0].x === snake2[i].x && snake1[0].y === snake2[i].y)
			statusKickSnake1 = true;
	}

	for(let i = 0; i < snake1.length; i++) {
		if(snake2[0].x === snake1[i].x && snake2[0].y === snake1[i].y)
			statusKickSnake2 = true;
	}

	if(statusKickSnake1 && statusKickSnake2)
		gameOver(3);
	else if(statusKickSnake1)
		gameOver(1);
	else if(statusKickSnake2)
		gameOver(2);
}

function eatFood(arr) {
	if(arr[0].x === food.x && arr[0].y === food.y) {
		newFood();
	} else
		arr.pop();
}

function drawGame() {
	ctx.drawImage(ground, 0, 0);

	ctx.fillStyle = "white";
	ctx.font = "35px Arial";
	ctx.fillText("1vs1", 20, 36);

	ctx.fillStyle = "red";
	ctx.fillRect(food.x, food.y, box, box);

	drawSnake(snake1, "#006600", "#33cc33");
	drawSnake(snake2, "#cc7a00", "#ffc107");

	if(dir1 != null && dir2 != null) {
		addSnakeHead(snake1, dir1);
		addSnakeHead(snake2, dir2);

		gameStatus();

		eatFood(snake1);
		eatFood(snake2);

		register();

		dir1Handler = true;
		dir2Handler = true;
	} else {
		if(dir1 === undefined) {
			readyStatus(1);
		}

		if(dir2 === undefined) {
			readyStatus(2);
		}
	}
}
let game = setInterval(drawGame, 50);

function gameOver(snakeNum) {
	clearInterval(game);
	let text;

	if(snakeNum === 3)
		text = "Draw";
	else if (snakeNum === 1)
		text = "YellowWin";
	else if (snakeNum === 2)
		text = "Green Win";

	ctx.fillStyle = "black";
	ctx.font = "60px Arial";
	ctx.fillText(text, 100, 500);
	ctx.fillText(text, 150, 150);
	ctx.fillText(text, 230, 300);
}

function register() {
	ctx.fillStyle = "#33cc33";
	ctx.font = "25px Arial";
	ctx.fillText(snake1.length, 420, 36);

	ctx.fillStyle = "#ffc107";
	ctx.font = "25px Arial";
	ctx.fillText(snake2.length, 300, 36);
}

function readyStatus(statusNum) {
	if(statusNum === 1) {
		ctx.fillStyle = "#33cc33";
		ctx.font = "25px Arial";
		ctx.fillText("ready?", 420, 36);
	}

	if(statusNum === 2) {
		ctx.fillStyle = "#ffc107";
		ctx.font = "25px Arial";
		ctx.fillText("ready?", 300, 36);
	}
}
