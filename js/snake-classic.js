const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/bg.png";

let box = 12;

let snakeClassic = [];
snakeClassic[0] = {
	x: 25 * box,
	y: 25 * box
};

let food;
newFood(snakeClassic);

document.addEventListener("keydown", direction);

let dir;
let eventHandler = true;

function direction(event) {
	if(eventHandler === false) {
		return;
	}

	if(event.keyCode === 37 && dir !== "right")
		dir = "left";
	else if(event.keyCode === 38 && dir !== "down")
		dir = "up";
	else if(event.keyCode === 39 && dir !== "left")
		dir = "right";
	else if(event.keyCode === 40 && dir !== "up")
		dir = "down";

	eventHandler = false;
}

function eatTail(head, arr) {
	for(let i = 0; i < arr.length; i++) {
		if(head.x === arr[i].x && head.y === arr[i].y)
			gameOver();
	}
}

function newFood(arr) {
	food = {
		x: (Math.floor(Math.random() * (47 - 2 + 1)) + 2) * box,
		y: (Math.floor(Math.random() * (47 - 4 + 1)) + 4) * box,
	};

	for(let i = 0; i < arr.length; i++) {
		if(food.x === arr[i].x && food.y === arr[i].y)
			newFood(arr);
	}
}

function drawGame() {
	ctx.drawImage(ground, 0, 0);

	ctx.fillStyle = "green";
	ctx.fillRect(food.x, food.y, box, box);

	ctx.fillStyle = "white";
	ctx.font = "35px Arial";
	ctx.fillText(snakeClassic.length, 20, 36);

	for(let i = 0; i < snakeClassic.length; i++) {
		if (i === 0) {
			ctx.fillStyle = "#d50000";
		} else {
			ctx.fillStyle = "#ffc107";
		}
		ctx.fillRect(snakeClassic[i].x, snakeClassic[i].y, box, box);
	}

	let snakeX = snakeClassic[0].x;
	let snakeY = snakeClassic[0].y;

	if(snakeX === food.x && snakeY === food.y) {
		newFood(snakeClassic);
	} else
		snakeClassic.pop();

	if(dir === "left") snakeX -= box;
	if(dir === "right") snakeX += box;
	if(dir === "up") snakeY -= box;
	if(dir === "down") snakeY += box;

	// if(snakeX < box * 2 || snakeX > box * 47
	// 	|| snakeY < 4 * box || snakeY > box * 47) {
	// 	gameOver();
	// }

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

	eatTail(newHead, snakeClassic);

	snakeClassic.unshift(newHead);

	eventHandler = true;
}
let game = setInterval(drawGame, 50);

function gameOver() {
	clearInterval(game);

	ctx.fillStyle = "black";
	ctx.font = "60px Arial";
	ctx.fillText("Score:" + snakeClassic.length, 100, 500);
	ctx.fillText("Score:" + snakeClassic.length, 150, 150);
	ctx.fillText("Score:" + snakeClassic.length, 250, 300);
}
